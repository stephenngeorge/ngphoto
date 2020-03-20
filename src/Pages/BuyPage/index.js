import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

import {
  ButtonRow,
  Card,
  CardBlock,
  RichText,
  TextSection
} from 'loris-ui.portfolio'

import data from './data'

const BuyPage = () => {
  const [cardsData, setCardsData] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    const db = firebase.database()
    const dbRef = db.ref()
    dbRef.on('value', snapshot => {
      const products = []
      if (snapshot !== null) {
        Object.entries(snapshot.val().Products).forEach(([key, product]) => {
          products.push(product)
        })
        setCardsData(products.sort((a, b) => a.weight - b.weight))
      }
    })

    return () => dbRef.off()
  }, [])

  return (
    <div className="page site-page buy-page">
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
          cardsData.map((card, i) => {
            console.log(card)
            const cardData = {
              additionalClasses: [
                'buy-page--card',
                card.printSize === "Greetings Cards" ? "greetings-cards" : ""
              ],
              cardHeading: card.printSize === "Greetings Cards" ? "Greetings Cards" : `${card.printSize} print`,
              cardSubHeading: card.hasOwnProperty("mountSize") ? `${card.mountSize} mount` : null,
              borderColor: "secondary"
            }
            return (
              <Card key={ i } { ...cardData }>
                {
                  card.printSize !== "Greetings Cards" &&
                  <div>
                    <p className="card-details">Mounted: £{ card.priceMounted }</p>
                    <p className="card-details">Framed: £{ card.priceFramed }</p>
                  </div>
                }
                {
                  card.printSize === "Greetings Cards" &&
                  <div>
                    <p className="card-details">{ card.largePack }</p>
                    <p className="card-details">{ card.smallPack }</p>
                  </div>
                }
              </Card>
            )
          })
        }
      </CardBlock>
    </div>
  )
}

export default BuyPage