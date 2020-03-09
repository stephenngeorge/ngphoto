import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Page } from 'loris-ui.portfolio'
import pageData from './Pages/pageData'

import {
  BuyPage,
  HomePage
} from './Pages'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Page { ...pageData }>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/buy" component={BuyPage} />
          </Switch>
        </Page>
      </div>
    </Router>
  )
}

export default App