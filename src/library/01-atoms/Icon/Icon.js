/**
 * ----------
 * ICON
 * ----------
 * 
 * Icon components render an .svg file to the screen at
 * a sepcified size.
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"

import * as errorTypes from "../../errorTypes"

import { ThemeContext } from '../../00-protons/Themer/Themer'

const Icon = ({
  additionalClasses,
  name,
  scopedStyles,
  size,
  src,
  url
}) => {
  // consume theme and set styles
  const { iconSizes } = useContext(ThemeContext)
  const imageStyles = {
    width: iconSizes[size],
    height: iconSizes[size],
    ...scopedStyles
  }

  // validate icon, checks size is one of the allowed values
  const validateIcon = size => {
    let errors = []

    if (["xs", "sm", "md", "lg", "xl"].indexOf(size) < 0) {
      errors.push({
        type: errorTypes.VALUE_OUT_OF_RANGE,
        source: "Icon > props.size",
        message: "Size must be one of 'xs' | 'sm' | 'md' | 'lg' | 'xl'"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }

    return errors
  }

  const classes = [
    "icon",
    `icon--${size}`,
    url.length > 0 ? "icon--link" : "",
    ...additionalClasses
  ]
  return validateIcon(size).length > 0 ? null : url.length === 0 ? (
    <div className={`${classes.join(" ")}`}>
      <img style={ imageStyles } src={ src } alt={ name } />
    </div>
  ) : (
    <a href={ url } target="_blank" rel="noopener noreferrer" className={`${classes.join(" ")}`}>
      <img style={ imageStyles } src={ src } alt={ name } />
    </a>
  )
}

Icon.propTypes = {
  additionalClasses: PropTypes.array,
  name: PropTypes.string.isRequired,
  scopedStyles: PropTypes.object,
  size: PropTypes.string,
  src: PropTypes.string.isRequired,
  url: PropTypes.string
}

Icon.defaultProps = {
  additionalClasses: [],
  scopedStyles: {},
  size: "sm",
  url: ""
}

export default Icon
