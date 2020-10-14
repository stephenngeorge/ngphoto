import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseDb } from '../../utils';

import {
  Card,
  CardBlock,
  IconsList,
  RichText,
  TextSection,
} from '../../library';

import { ContactForm } from '../../components';

import {
  CLOCK_ICON,
  MAPPIN_ICON
} from '../../assets';

import data from './data';

const ContactPage = () => {
  const [cardsData, setCardsData] = useState([]);
  const [eventsVal, dbRef] = useFirebaseDb("Events");

  useEffect(() => window.scrollTo(0, 0), []);
  useEffect(() => {
    const events = []
    Object.entries(eventsVal).forEach(([key, event]) => {
      events.push(event)
    });
    setCardsData(events.sort((a,b) => a.weight - b.weight));

    return () => {
      if (dbRef !== null) dbRef.off()
    }
  }, [eventsVal, dbRef]);

  return (
    <div className="page site-page contact-page">
      <TextSection { ...data.textSection }>
        <RichText>
          <p>
            Contact Neil if you are interested in <Link to="/buy">buying a photo</Link>, or if you 
            have any questions about his work. Neil also offers workshops so please get in touch if 
            you would like to find out more. Workshops that are available are: <strong>“An Introduction to 
            Photography and Your Camera”</strong>, <strong>“Post-Processing in Lightroom”</strong> and <strong>“Nature Walks with a 
            Camera”</strong> (in this final one, Neil will meet with you at an agreed location and walk with 
            you: this will be a mixture of photography and general nature watching). Workshops are priced 
            at £30/hour for groups of 3 or fewer and £50/hour for groups of more than 3 (this is the total 
            cost, not the cost per individual). You can also find Neil at any of the events listed below 
            (click on the post code to open Google maps and get directions to the location). <span className="color--main"><strong>Contact Neil by 
            filling in the form or clicking on one of the icons below:</strong></span>
          </p>
        </RichText>
      </TextSection>

      <IconsList additionalClasses={['text-container--very-narrow']} { ...data.iconsList } />

      <ContactForm />

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
  );
}

export default ContactPage;