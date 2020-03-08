import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

import { Title } from 'loris-ui.portfolio'

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
    <div className="app">
      <Title titleLevel={1} titleText="Heading" />
    </div>
  )
}

export default App