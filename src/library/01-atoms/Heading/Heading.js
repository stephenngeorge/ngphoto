/**
 * ----------
 * HEADING
 * ----------
 * 
 * Headings are simple containers for rendering
 * headings for different UI items. Cannot render any
 * "h" tag with text content.
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import * as errorTypes from "../../errorTypes"

import { ThemeContext } from '../../00-protons/Themer/Themer'

const Heading = ({
  additionalClasses,
  color,
  headingLevel,
  headingText,
  scopedStyles
}) => {
  // consume theme and set styles
  const { colors, fontFamilies, fontWeights } = useContext(ThemeContext)
  const headingStyles = {
    color: colors[color],
    fontFamily: fontFamilies.serif,
    fontWeight: fontWeights.heavy,
    ...scopedStyles
  }

  // validate props, checks for a headingLevel between
  // 1 - 6 and that headingText is not an empty string.
  const validateHeading = (headingLevel, headingText) => {
    const errors = []

    if (headingLevel < 1 || headingLevel > 6) {
      errors.push({
        type: errorTypes.VALUE_OUT_OF_RANGE,
        source: "Heading > props.headingLevel",
        message: "The 'headingLevel' prop must be a number between 1 - 6"
      })
    }
    
    if (headingText.length < 1) {
      errors.push({
        type: errorTypes.VALUE_EMPTY_OR_NULL,
        source: "Heading > props.headingText",
        message: "The 'headingText' prop cannot be an empty string"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }
    return errors
  }

  const classes = [
    "heading",
    ...additionalClasses
  ]
  // set HTML tag for heading
  const Markup = `h${headingLevel}`
  // render heading if there are no errors
  return validateHeading(headingLevel, headingText).length > 0 ? null : (
    <div style={headingStyles} className={`${classes.join(" ")}`}>
      <Markup>{ headingText }</Markup>
    </div>
  )
}

Heading.propTypes = {
  additionalClasses: PropTypes.array,
  color: PropTypes.string,
  headingLevel: PropTypes.number, // <-- between 1 - 6
  headingText: PropTypes.string.isRequired,
  scopedStyles: PropTypes.object
}

Heading.defaultProps = {
  additionalClasses: [],
  color: 'dark',
  scopedStyles: {}
}

export default Heading
