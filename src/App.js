import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'

import { Page } from 'loris-ui.portfolio'
import {
  FACEBOOK_LOGO,
  NGPHOTO_LOGO_MARK,
  SENT_MAIL_ICON,
  TWITTER_LOGO
} from './assets'

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
        <Page
          accreditationLink={{ url: "https://github.com/stephenngeorge", text: "Stephen Pal-George" }}
          accreditationText="Designed and built by "
          iconsListData={{
            direction: "row",
            icons: [
              { name: 'facebook', size: 'sm', src: FACEBOOK_LOGO, url: 'https://www.facebook.com' },
              { name: 'twitter', size: 'sm', src: TWITTER_LOGO, url: 'https://twitter.com' },
              { name: 'email', size: 'sm', src: SENT_MAIL_ICON, url: 'https://google.co.uk' }
            ] 
          }}
          menuLinks={[
            { path: "/galleries", label: "galleries" },
            { path: "/buy", label: "buy" },
            { path: "/contact", label: "contact" }
          ]}
          siteMapLinks={[
            { path: "/", label: "Home" },
            { path: "/buy", label: "Buy" },
            { path: "/galleries", label: "Galleries" },
            { path: "/contact", label: "Contact" }
          ]}
          siteLogo={ NGPHOTO_LOGO_MARK }
          siteTitle="Neil George Photography"
        >

        </Page>
      </div>
    </Router>
  )
}

export default App