/**
 * ----------
 * SPINNER
 * ----------
 * 
 * Spinner components are loading indicators.
 * Intended to be used with images, rather than text,
 * the children of this component will rotate continuously.
 */

import React from "react"
import PropTypes from "prop-types"

import * as errorTypes from '../../errorTypes'

const Spinner = ({
  additionalClasses,
  imageAlt,
  imageUrl,
  speed
}) => {
  const validateSpinner = speed => {
    const errors = []
    // check speed prop is one of the allowed values
    if (['slow', 'normal', 'fast'].indexOf(speed) < 0) {
      errors.push({
        type: errorTypes.VALUE_OUT_OF_RANGE,
        source: "Spinner > props.speed",
        message: "The 'speed' prop must be one of 'slow', 'normal' or 'fast'"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }
    return errors
  }

  const classes = [
    "spinner",
    `spinner--${speed}`,
    ...additionalClasses
  ]
  return validateSpinner(speed).length > 0 ? null : (
    <div className={`${classes.join(" ")}`}>
      <img src={ imageUrl } alt={ imageAlt } />
    </div>
  )
}

Spinner.propTypes = {
  additionalClasses: PropTypes.array,
  imageAlt: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  speed: PropTypes.string
}

Spinner.defaultProps = {
  additionalClasses: [],
  imageAlt: "loading indicator",
  speed: "normal"
}

export default Spinner
