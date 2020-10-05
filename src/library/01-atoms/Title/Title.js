/**
 * ----------
 * TITLE
 * ----------
 * 
 * Title components render a heading of any specified
 * level. They are rendered with an optional, coloured
 * highlight that covers half the height of the text
 */

import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"

import * as errorTypes from '../../errorTypes'

import { ThemeContext } from '../../00-protons/Themer/Themer'

const Title = ({
  additionalClasses,
  scopedStyles,
  titleLevel,
  titleText,
  underlineColor
}) => {
  useEffect(() => {
    const animateUnderline = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const underline = entry.target.querySelector('.underline')
          titleText.length < 20 ?
          underline.classList.add('title-underline-half--medium') :
          underline.classList.add('title-underline-full--medium')
        }
      })
    }
    
    const options = { threshold: .9 }
    const observer = new IntersectionObserver(animateUnderline, options)
    const titles = Array.from(document.querySelectorAll('.title'))
    if (titles.length > 0) titles.forEach(title => observer.observe(title))

    return () => observer.disconnect()
  }, [titleText])
  
  //consume context and set styles
  const { colors } = useContext(ThemeContext)
  const underlineStyles = {
    backgroundColor: colors[underlineColor],
    width: "0"
  }
  const styles = { ...scopedStyles }
  // validate title, checks titleLevel is within range and that titleText is not
  // an empty string.
  const isValidTitle = (titleLevel, titleText) => {
    let errors = []
    if (titleLevel < 1 || titleLevel > 6) {
      errors.push({
        type: errorTypes.VALUE_OUT_OF_RANGE,
        source: "Title > props.headingLevel",
        message: "headingLevel is out of range, you must pass a number between 1 - 6 to this prop"
      })
    }
    if (titleText.length <= 0) {
      errors.push({
        type: errorTypes.VALUE_EMPTY_OR_NULL,
        source: "Title > props.headingText",
        message: "headingText is empty, you must a string of length >= 1"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }

    return errors
  }

  const classes = [
    "title",
    `underline-color--${underlineColor}`,
    ...additionalClasses
  ]

  const HTMLTag = `h${titleLevel}`
  return isValidTitle(titleLevel, titleText).length > 0 ? null : (
    <HTMLTag style={ styles } className={`${classes.join(" ")}`}>
      { titleText }
      <div style={ underlineStyles } className="underline"></div>
    </HTMLTag>
  )
}

Title.propTypes = {
  additionalClasses: PropTypes.array,
  scopedStyles: PropTypes.object,
  titleLevel: PropTypes.number,
  titleText: PropTypes.string.isRequired,
  underlineColor: PropTypes.string
}

Title.defaultProps = {
  additionalClasses: [],
  scopedStyles: {},
  titleLevel: 1,
  underlineColor: "main"
}

export default Title
