import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Page } from 'loris-ui.portfolio'
import pageData from './Pages/pageData'

import {
  BuyPage,
  ContactPage,
  GalleriesPage,
  HomePage
} from './Pages'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Page { ...pageData }>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/galleries/:galleryName" component={GalleriesPage} />
            <Route path="/buy" component={BuyPage} />
            <Route path="/contact" component={ContactPage} />
          </Switch>
        </Page>
      </div>
    </Router>
  )
}

export default App