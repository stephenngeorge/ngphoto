import React, { useEffect, useState } from 'react'
import { useFirebaseDb } from '../../utils'

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
  const [productsVal, dbRef] = useFirebaseDb("Products")
  
  useEffect(() => window.scrollTo(0, 0), [])
  useEffect(() => {
    const products = []
    Object.entries(productsVal).forEach(([key, product]) => {
      products.push(product)
    })
    const sortedCards = products.sort((a, b) => a.weight - b.weight)
    setCardsData(sortedCards)
    setFilteredCardsData(sortedCards.filter(product => product.hasOwnProperty('priceLtdEdPrint')))
    return () => {
      if (dbRef !== null) dbRef.off()
    }
  }, [productsVal, dbRef])

  return (
    <div className="page site-page buy-page">
      <TextSection { ...data.textSection }>
        <RichText>
          <p>
            If you would like to buy any of the pictures you have seen, then please 
            contact Neil with the names of the picture(s) you are interested in and 
            the size(s) you would like them (from the list below). Please note that 
            images with “Limited Edition” in the title are limited to a print run of 50 
            and come with a Certificate of Authenticity. If you would 
            like something bespoke/customised, please get in touch and Neil will be happy 
            to talk things through with you. There may be a small charge for postage and 
            packaging (to be agreed at time of order).
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
                    <p className="card-details"><span className="color--main">Mounted:</span> £{ card.priceMounted }</p>
                    <p className="card-details"><span className="color--main">Framed:</span> £{ card.priceFramed }</p>
                    {
                      card.pricePrint &&
                      <p className="card-details"><span className="color--main">Print (unmounted):</span> £{ card.pricePrint }</p>
                    }
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
              borderColor: "main"
            }

            return (
              <Card key={ i } { ...cardData }>
                {
                  <div>
                    <p className="card-details"><span className="color--main">Mounted:</span> £{ card.priceLtdEdMounted }</p>
                    <p className="card-details"><span className="color--main">Framed:</span> £{ card.priceLtdEdFramed }</p>
                    {
                      card.priceLtdEdPrint &&
                      <p className="card-details"><span className="color--main">Print (unmounted):</span> £{ card.priceLtdEdPrint }</p>
                    }
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