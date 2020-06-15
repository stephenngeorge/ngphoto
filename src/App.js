import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { Page } from 'loris-ui.portfolio'
import pageData from './Pages/pageData'

import {
  BuyPage,
  ContactPage,
  GalleriesPage,
  HomePage,
  Page404
} from './Pages'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Page { ...pageData }>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/galleries">
              <Redirect to="/galleries/new-work" />
            </Route>
            <Route path="/galleries/:galleryName" component={GalleriesPage} />
            <Route path="/buy" component={BuyPage} />
            <Route path="/contact" component={ContactPage} />
            <Route component={Page404} />
          </Switch>
        </Page>
      </div>
    </Router>
  )
}

export default App