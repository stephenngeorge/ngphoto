import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import {
  Card,
  CardBlock,
  IconsList,
  RichText,
  TextSection
} from 'loris-ui.portfolio'
import {
  CLOCK_ICON,
  MAPPIN_ICON
} from '../../assets'

import data from './data'

const ContactPage = () => {
  const [cardsData, setCardsData] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    const db = firebase.database()
    const dbRef = db.ref()
    dbRef.on('value', snapshot => {
      const events = []
      if (snapshot !== null) {
        Object.entries(snapshot.val().Events).forEach(([key, event]) => {
          events.push(event)
        })
        setCardsData(events.sort((a,b) => a.weight - b.weight))
      }
    })

    return () => dbRef.off()
  }, [])

  return (
    <div className="page site-page contact-page">
      <TextSection { ...data.textSection }>
        <RichText>
          <p>
            Contact Neil if you’re interested in <Link to="/buy">buying a photo</Link>, or if you 
            have any questions about his work. Neil also offers workshops 
            in Adobe Lightroom so please get in touch if you’d like to find 
            out more. You can also find Neil at any of the events listed 
            below, he’d love to see you there.
          </p>
        </RichText>
      </TextSection>
      <IconsList additionalClasses={['text-container--very-narrow']} { ...data.iconsList } />
      <CardBlock { ...data.cardBlock }>
        {
          cardsData.length > 0 &&
          cardsData.map((card, i) => {
            const cardData = {
              cardHeading: card.name,
              cardSubHeading: card.location
            }
            return (
              <Card additionalClasses={['event-card']} key={ i } { ...cardData }>
                <div className="event__date">
                  <p className="event__date--start-date">{ card.startDate }</p>
                  {
                    !!card.endDate &&
                    <p className="event__date--end-date">{ card.endDate }</p>
                  }
                </div>
                <p className="event__time">
                  <img src={ CLOCK_ICON } alt="clock icon" />
                  { card.time }
                </p>
                {
                  !!card.postCode &&
                  <p className="event__postcode">
                    <img src={ MAPPIN_ICON } alt="map pin icon" />
                    <a href={`https://www.google.co.uk/maps/search/${card.postCode.trim().replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer">
                      { card.postCode }
                    </a>
                  </p>
                }
                {
                  !!card.url &&
                  <a className="more-details" href={ card.url } target="_blank" rel="noopener noreferrer">
                    More details
                  </a>
                }
              </Card>
            )
          })
        }
      </CardBlock>
    </div>
  )
}

export default ContactPage