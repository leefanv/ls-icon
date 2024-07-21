import { lazy, useState, useEffect, Suspense } from 'react'

function remote(factory) {
  let Component = () => null

  if (process.browser) {
    Component = lazy(() => factory());
  }

  return function (props) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      setVisible(true)
    }, [])
  
    return visible ? <Component {...props}></Component> : null
  }
}

export const Button = remote(() => import('wis/Button'))