/**
 * ----------
 * CARD
 * ----------
 * 
 * Comment block, describe your component here
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"

import { Heading, RichText } from '../../01-atoms'

import { ThemeContext } from '../../00-protons/Themer/Themer'

const Card = ({
  additionalClasses,
  backgroundColor,
  borderColor,
  cardHeading,
  cardSubHeading,
  children,
  scopedStyles
}) => {
  // consume theme and set styles
  const {
    borderWidth,
    borderRadius,
    colors,
    fontFamilies,
    fontWeights
  } = useContext(ThemeContext)

  const styles = {
    backgroundColor: colors[backgroundColor],
    border: `${borderWidth.thin} solid ${colors[borderColor]}`,
    borderRadius: borderRadius.default,
    ...scopedStyles
  }

  const classes = [
    "card",
    ...additionalClasses
  ]
  return (
    <div style={ styles } className={`${classes.join(" ")}`}>
      {
        !!cardHeading &&
        <Heading headingLevel={ 3 } headingText={ cardHeading } />
      }
      {
        !!cardSubHeading &&
        <Heading
          headingLevel={ 4 }
          headingText={ cardSubHeading }
          scopedStyles={{
            fontFamily: fontFamilies.sans_serif,
            fontWeight: fontWeights.normal
          }}
        />
      }
      <RichText>
        { children }
      </RichText>
    </div>
  )
}

Card.propTypes = {
  additionalClasses: PropTypes.array,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  cardHeading: PropTypes.string,
  cardSubHeading: PropTypes.string,
  scopedStyles: PropTypes.object
}

Card.defaultProps = {
  additionalClasses: [],
  backgroundColor: "light",
  borderColor: "secondary",
  scopedStyles: {}
}

export default Card
