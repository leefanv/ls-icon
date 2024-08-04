import { lazy, useState, useEffect } from "react";

function check(data, type) {
  return Object.prototype.toString.call(data) === `[object ${type}]`;
}

function isFunction(data) {
  return check(data, "Function");
}

function isUndefined(data) {
  return check(data, "Undefined");
}

function isString(data) {
  return check(data, "String");
}

function getGlobal() {
  // @ts-ignore
  if (window.frames && window.frames[0].$$AGENT) {
    return window.frames[0];
  }

  return window;
}

function loadModule(scope, module) {
  return async () => {
    const window = getGlobal();

    // @ts-ignore
    await __webpack_init_sharing__("default");
    // @ts-ignore
    if (isUndefined(window[scope]) || !isFunction(window[scope].init)) {
      throw new Error(`module ${scope}.${module} not found`);
    }
    // @ts-ignore
    await window[scope].init(__webpack_share_scopes__.default);
    // @ts-ignore
    if (!isFunction(window[scope].get)) {
      throw new Error(`module ${scope}.${module} not found`);
    }
    // @ts-ignore
    const Module = await window[scope].get(module);

    if (isUndefined(Module)) {
      throw new Error(`module ${scope}.${module} not found`);
    }
    return Module();
  };
}

// 加载脚本资源
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const document = getGlobal().document;

    const script = document.createElement("script");

    script.src = url;
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      resolve();
      document.head.removeChild(script);
    };

    script.onerror = () => {
      reject();
      document.head.removeChild(script);
    };

    document.head.appendChild(script);
  });
}

function isScopeLoaded(scope) {
  const window = getGlobal();

  return (
    window[scope] &&
    // @ts-ignore
    isFunction(window[scope].init) &&
    // @ts-ignore
    isFunction(window[scope].get)
  );
}

// 加载应用远程入口地址
async function loadScopeScript(scope) {
  if (isScopeLoaded(scope)) return;

  let scopeRemoteUrl = process.env.NEXT_PUBLIC_WIS;
  if (!isString(scopeRemoteUrl) || !scopeRemoteUrl) {
    throw new Error(`application ${scope} not register`);
  }

  if (scopeRemoteUrl.endsWith("/")) {
    scopeRemoteUrl += "remote.js";
  } else {
    scopeRemoteUrl += "/" + "remote.js";
  }

  await loadScript(scopeRemoteUrl);
}

async function loadScopeComponent(scope, module, name) {
  await loadScopeScript(scope);
  const ComponentLoader = loadModule(scope, module);
  return lazy(() => {
    return ComponentLoader().then((mod) => {
      return { default: mod[name] };
    });
  });
}

function resolveRemote(remote) {
  const [_, ...modules] = remote.replace("remote:", "").split("/");
  return "./" + modules.join("/");
}

export default function Remote({ is, exportName = "default", ...props }) {
  const [Component, setComponent] = useState(() => null);

  async function load() {
    const remote = resolveRemote(is);
    const Com = await loadScopeComponent("wis", remote, exportName);
    setComponent(Com);
  }

  useEffect(() => {
    load();
  }, []);

  return Component ? <Component {...props}></Component> : <div></div>;
}
