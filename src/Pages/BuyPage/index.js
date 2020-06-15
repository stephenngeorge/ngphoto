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
  const [filteredCardsData, setFilteredCardsData] = useState([])
  const [productType, setProductType] = useState('standard')

  useEffect(() => {
    window.scrollTo(0, 0)
    const db = firebase.database()
    const dbRef = db.ref()
    dbRef.on('value', snapshot => {
      const products = []
      if (snapshot !== null) {
        Object.entries(snapshot.val().Products).forEach(([_, product]) => {
          products.push(product)
        })
        setCardsData(products)
        setFilteredCardsData(products.filter(product => product.hasOwnProperty('priceLtdEdPrint')))
      }
    })
  }, [])

  console.log(filteredCardsData);

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
      <div className="product-type__controls">
        <button onClick={() => setProductType('standard')}>Standard</button>
        <button onClick={() => setProductType('limited-edition')}>Limited Edition</button>
      </div>
      <CardBlock { ...data.cardBlock }>
        {
          productType === 'standard' &&
          cardsData.length > 0 &&
          cardsData.map((card, i) => {
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
        {
          productType === 'limited-edition' &&
          filteredCardsData.length > 0 &&
          filteredCardsData.map((card, i) => {
            const cardData = {
              additionalClasses: [
                'buy-page--card'
              ],
              cardHeading: `${card.printSize} print`,
              cardSubHeading: card.hasOwnProperty("mountSize") ? `${card.mountSize} mount` : null,
              borderColor: "primary"
            }

            return (
              <Card key={ i } { ...cardData }>
                {
                  <div>
                    <p className="card-details">Print: £{ card.priceLtdEdPrint }</p>
                    <p className="card-details">Mounted: £{ card.priceLtdEdMounted }</p>
                    <p className="card-details">Framed: £{ card.priceLtdEdFramed }</p>
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