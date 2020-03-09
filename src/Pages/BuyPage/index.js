import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

import {
  ButtonRow,
  CardBlock,
  RichText,
  TextSection
} from 'loris-ui.portfolio'

import data from './data'

const BuyPage = () => {
  const [cardsData, setCardsData] = useState([])
  useEffect(() => {
    const db = firebase.database()
    const dbRef = db.ref()
    dbRef.on('value', snapshot => {
      const products = []
      if (snapshot !== null) {
        Object.entries(snapshot.val().Products).forEach(([key, product]) => {
          products.push(product)
        })
        setCardsData(products)
      }
    })
  }, [])

  return (
    <div className="page site-page">
      <TextSection { ...data.textSection }>
        <RichText>
          <p>
            If you’d like to buy any of the pictures you’ve seen, then 
            contact Neil with the name of the picture(s) you’re interested 
            in and the size(s) you would like them (from the list below). 
            If you’d like something bespoke/customised, please get in touch 
            and Neil will be happy to talk things through with you.
          </p>
        </RichText>
      </TextSection>
      <ButtonRow { ...data.buttonRow } />
      <CardBlock { ...data.cardBlock }>
        {
          cardsData.length > 0 &&
          cardsData.map(card => {

          })
        }
      </CardBlock>
    </div>
  )
}

export default BuyPage