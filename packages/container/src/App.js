import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles"

import { CircularProgress } from "@material-ui/core"

import Header from "./components/Header";

const AuthLazy = lazy(() => import('./components/AuthApp'))
const MarketingLazy = lazy(() => import('./components/MarketingApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: "co"
})

export default () => {
  const [isAuthenticated, setIsAuthenticed] = useState(false)

  console.log('isAuthenticated: ', isAuthenticated)
  return <>
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isAuthenticated={isAuthenticated} onSignOut={setIsAuthenticed} />
          <Suspense fallback={<CircularProgress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onAuthChange={(isAuthed) => setIsAuthenticed(isAuthed)} />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  </>;
}
