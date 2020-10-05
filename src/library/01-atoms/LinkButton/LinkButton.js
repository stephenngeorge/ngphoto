/**
 * ----------
 * BUTTON
 * ----------
 * 
 * Buttons components render a button as either a
 * button or anchor tag. If the button is a link,
 * then the buttonLinkVariation determines if the
 * button will be rendered as an <a> or a <Link>
 */

import React, { useContext } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import * as errorTypes from '../../errorTypes'

import { ThemeContext } from "../../00-protons/Themer/Themer"

const LinkButton = ({
  additionalClasses,
  buttonBlock,
  buttonBorderColor,
  buttonBgColor,
  buttonColor,
  buttonLarge,
  buttonLink,
  buttonLinkVariation,
  buttonOutline,
  buttonText,
  scopedStyles
}) => {
  // consume theme and set styles
  const { borderRadius, colors, fontFamilies, fontSizes } = useContext(ThemeContext)
  const buttonStyles = {
    backgroundColor: buttonOutline ? "#fff" : colors[buttonBgColor],
    border: `.125rem solid ${colors[buttonBorderColor]}`,
    borderRadius: borderRadius.default,
    color: buttonOutline ? colors[buttonBgColor] : colors[buttonColor],
    fontFamily: fontFamilies.serif,
    fontSize: buttonLarge ? fontSizes.lead : fontSizes.default,
    transition: "background-color .3s ease, color .3s ease, filter .3s ease",
    ...scopedStyles
  }
  // programtically handle hover styles
  const hoverStyles = e => {
    switch (e.type) {
      case "mouseleave":
        if (buttonOutline) {
          e.target.style.backgroundColor = "#ffffff"
          e.target.style.color = colors[buttonBgColor]
        }
        else e.target.style.filter = "saturate(100%)"
        break
      case "mouseenter":
      default:
        if (buttonOutline) {
          e.target.style.backgroundColor = colors[buttonBgColor]
          e.target.style.color = colors[buttonColor]
        }
        else e.target.style.filter = "saturate(60%)"
    }
    
  }

  // validate buttonText (check it's not empty)
  const isValidButton = buttonText => {
    let errors = []

    if (buttonText.length <= 0) {
      errors.push({
        type: errorTypes.VALUE_EMPTY_OR_NULL,
        source: "Button > props.buttonText",
        message: "buttonText is empty, you must a string of length >= 1"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }
    
    return errors
  }
  
  // set classes
  const classes = [
    "link-button",
    buttonLarge ? 'button--large' : '',
    buttonBlock ? 'button--block' : '',
    ...additionalClasses
  ]
  // render button if there are no errors
  return isValidButton(buttonText).length > 0 ? null :
    buttonLinkVariation === "internal" ? (
    <Link onMouseEnter={hoverStyles}
          onMouseLeave={hoverStyles}
          to={ buttonLink }
          style={ buttonStyles }
          className={`${classes.join(" ")}`}
    >
      { buttonText }
    </Link>
  ) : (
    <a  onMouseEnter={hoverStyles}
        onMouseLeave={hoverStyles}
        href={ buttonLink }
        target="_blank"
        rel="noopener noreferrer"
        style={ buttonStyles }
        className={`${classes.join(" ")}`}
    >
      { buttonText }
    </a>
  )
}

LinkButton.propTypes = {
  additionalClasses: PropTypes.array,
  buttonBlock: PropTypes.bool,
  buttonBorderColor: PropTypes.string,
  buttonBgColor: PropTypes.string,
  buttonLarge: PropTypes.bool,
  buttonLink: PropTypes.string,
  buttonLinkVariation: PropTypes.string,
  buttonOutline: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  scopedStyles: PropTypes.object
}

LinkButton.defaultProps = {
  additionalClasses: [],
  buttonBlock: false,
  buttonBorderColor: 'main',
  buttonBgColor: 'main',
  buttonColor: 'light',
  buttonLarge: false,
  buttonLink: "https://google.co.uk",
  buttonLinkVariation: 'internal',
  buttonOutline: false,
  buttonText: 'Click here',
  buttonType: 'button',
  scopedStyles: {}
}

export default LinkButton
