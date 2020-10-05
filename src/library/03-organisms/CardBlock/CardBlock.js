/**
 * ----------
 * CARDBLOCK
 * ----------
 * 
 * Card Block components are a flex containier
 * for Card atoms. There is no limit to the number
 * of cards that can be rendered. On consumptoin,
 * component can either be set to wrap row and flow 
 * down the page, or wrap on column whence the overflow
 * on the x-axis becomes scrollable.
 * 
 */

import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"

import { ThemeContext } from '../../00-protons/Themer/Themer'

const CardBlock = ({
  additionalClasses,
  backgroundColor,
  children,
  loadingImage,
  rowContains
}) => {
  // animate cards
  useEffect(() => {
    const cardBlock = document.querySelector('.card-block')
    const animateCardBlock = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // get cards
          const cards = Array.from(cardBlock.querySelectorAll('.card'))
          cards.forEach((card, i) => {
            // stagger animations for cards
            card.style.animationDelay = `${i * 100}ms`
            card.classList.add('slide-from-right__fade-in--medium')
          })
        }
      })
    }
    const options = { threshold: 0 }
    const observer = new IntersectionObserver(animateCardBlock, options)
    observer.observe(cardBlock)

    return () => observer.disconnect()
  }, [children])

  // consume theme and set styles
  const { colors } = useContext(ThemeContext)
  const blockStyles = {
    backgroundColor: colors[backgroundColor]
  }

  const classes = [
    "card-block",
    !!rowContains ? `card-block--row-${rowContains}` : '',
    ...additionalClasses
  ]
  return (
    <section style={ blockStyles } className={`${classes.join(" ")}`}>
      <div className="card-block__card-wrapper">
        {
          ((children.length <= 0 || children === undefined) && loadingImage) &&
          <img src={ loadingImage } alt="card data is loading" className="loading-image" />
        }
        { children }
      </div>
    </section>
  )
}

CardBlock.propTypes = {
  additionalClasses: PropTypes.array,
  backgroundColor: PropTypes.string,
  columnContains: PropTypes.number,
  loadingImage: PropTypes.string,
  rowContains: PropTypes.number,
}

CardBlock.defaultProps = {
  additionalClasses: [],
  backgroundColor: "mid",
}

export default CardBlock
