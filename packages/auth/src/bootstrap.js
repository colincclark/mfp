import React from "react"
import ReactDOM from "react-dom"

import { createBrowserHistory, createMemoryHistory } from 'history'

import App from "./App"

const mount = (el, { defaultHistory, onAuthChange, onNavigate }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    // communicate up to the container
    history.listen(onNavigate)
  }

  ReactDOM.render(
    <App history={history} onAuthChange={onAuthChange} />,
    el
  )

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location
      // communication down from container
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector(".dev-auth-route")

  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() })
  }
}

export { mount }
