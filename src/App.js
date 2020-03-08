import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'

import { Page } from 'loris-ui.portfolio'
import pageData from './Pages/pageData'

const App = () => {
  useEffect(() => {
    const getData = () => {
      const db = firebase.database()
      const dbRef = db.ref()
      dbRef.on('value', snapshot => {
        if (snapshot !== null) {
          console.log(snapshot.val())
        }
      })
    }
    getData()
  }, [])

  return (
    <Router>
      <div className="app">
        <Page { ...pageData }>

        </Page>
      </div>
    </Router>
  )
}

export default App