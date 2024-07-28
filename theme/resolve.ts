const defaultGroupTitle = "$$default";

function getFirstLeafRoute(page) {
  let nextPage = page;
  while (nextPage.children?.length) {
    nextPage = nextPage.children[0];
  }

  return nextPage.route;
}

function resolveFolderFirstRoute(pages) {
  return pages.map((page) => {
    if (page.kind === "Folder") {
      page.route = getFirstLeafRoute(page);
    }
    page.children = resolveFolderFirstRoute(page.children);
    return page;
  });
}

interface Meta {
  order?: number;
  group?: string | number;
  showMeta?: boolean;
  showSubMenu?: boolean;
  fullScreen?: boolean;
  [prop: string]: any;
}

export function resolvePages(pageMap = [], locale) {
  const meta = pageMap.find((item) => item.kind === "Meta" && item.locale === locale) || {};
  const pages = pageMap.reduce((result, { ...item }) => {
    if (item.locale && item.locale !== locale) {
      return result;
    }

    if (!["Folder", "MdxPage"].includes(item.kind)) {
      return result;
    }

    if (item.kind === "Folder" && !item.children?.length) {
      return result;
    }

    item.meta =
      typeof meta?.data?.[item.name] === "string"
        ? { title: meta?.data?.[item.name] }
        : { ...meta?.data?.[item.name] };
    if (typeof item.meta.order !== "number") {
      item.meta.order = Number.MAX_SAFE_INTEGER;
    }
    if (!item.meta.group) {
      item.meta.group = defaultGroupTitle;
    }

    item.children = resolvePages(item.children, locale);
    item.path = item.route;
    item.title = item.meta?.title || item.name;
    
    result.push(item);

    return result;
  }, []);

  return resolveFolderFirstRoute(pages);
}

export interface Menu {
  name: string;
  meta: Meta;
  route: string;
  title: string;
  path: string;
  children: Group[];
}

export interface Group {
  title: string;
  meta: Meta;
  children: Menu[];
}

export function isDefaultGroup(group) {
  return group.title === defaultGroupTitle;
}

export function groupPages(pages = []) {
  return pages
    .reduce((result, { ...item }) => {
      item.children = groupPages(item.children);

      let currentGroup = result.find(
        (group) => group.title === item.meta.group
      );
      if (!currentGroup) {
        currentGroup = {
          title: item.meta.group,
          children: [],
          meta: {
            order: item.meta.group === defaultGroupTitle ? -1 : item.meta.order,
          },
        };
        currentGroup.children.push(item);
        result.push(currentGroup);
      } else {
        currentGroup.meta.order = Math.min(currentGroup.meta.order, item.meta.order);
        currentGroup.children.push(item);
      }

      return result;
    }, [])
    .map(group => {
      group.children.sort((a, b) => a.meta.order - b.meta.order)
      return group
    })
    .sort((a, b) => a.meta.order - b.meta.order);
}

export function getActivePage(pages = [], route) {
  if (route === '/') {
    return pages.find((page) => page.path === route);
  }

  let activePage;
  let nextPages = pages.filter(page => page.path !== '/');
  while (nextPages.length) {
    activePage = nextPages.find((page) => route.startsWith(page.path))
    if (activePage) {
      nextPages = activePage.children;
      continue;
    }
    nextPages = [];
  }

  return activePage;
}

export function getPageBreadcrumbs(pages = [], route) {
  let breadcrumbs = [];

  const homeBreadcrumb = pages.find((page) => page.path === '/');
  breadcrumbs.push(homeBreadcrumb);

  let nextPages = pages.filter(page => page.path !== '/');
  while (nextPages.length) {
    const page = nextPages.find((page) => route.startsWith(page.path));
    if (page) {
      breadcrumbs.push(page);
      nextPages = page.children;
      continue;
    }

    nextPages = [];
  }

  return breadcrumbs;
}

export function getMenusByPageGroup(pageGroup) {
  if (!pageGroup?.children?.length) {
    return [];
  }

  return pageGroup.children
    .map((page) => {
      return {
        ...page,
        children: page.children
          .reduce((result, group) => {
            return result.concat(getMenusByPageGroup(group));
          }, [])
          .sort((a, b) => a.meta.order - b.meta.order),
      };
    })
    .sort((a, b) => a.meta.order - b.meta.order);
}
