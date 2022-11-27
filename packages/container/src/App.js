import React, { lazy, Suspense, useEffect, useState } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history'
import { CircularProgress } from "@material-ui/core"
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles"

import Header from "./components/Header";

const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))
const MarketingLazy = lazy(() => import('./components/MarketingApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: "co"
})

const history = createBrowserHistory()

export default () => {
  const [isAuthenticated, setIsAuthenticed] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard')
    }
  }, [isAuthenticated])

  return <>
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isAuthenticated={isAuthenticated} onSignOut={setIsAuthenticed} />
          <Suspense fallback={<CircularProgress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onAuthChange={(isAuthed) => setIsAuthenticed(isAuthed)} />
              </Route>
              <Route path="/dashboard">
                {!isAuthenticated && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  </>;
}
