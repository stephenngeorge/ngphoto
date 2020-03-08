import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Page } from 'loris-ui.portfolio'
import pageData from './Pages/pageData'

import { HomePage } from './Pages'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Page { ...pageData }>
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </Page>
      </div>
    </Router>
  )
}

export default App