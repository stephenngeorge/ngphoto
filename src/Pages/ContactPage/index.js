import React from 'react'
import { Link } from 'react-router-dom'
import {
  IconsList,
  RichText,
  TextSection
} from 'loris-ui.portfolio'

import data from './data'

const ContactPage = () => {
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
    </div>
  )
}

export default ContactPage