import React, { useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createBrowserHistory } from 'history'

import { mount } from "marketing/MarketingApp"

export default () => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      defaultHistory: createBrowserHistory(),
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location
        // communication up from microfrontend
        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      }
    })

    // communication down to microfrontend
    history.listen(onParentNavigate)
  }, [])


  return <div ref={ref} />
}

