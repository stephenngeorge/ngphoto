/**
 * ----------
 * ICONSLIST
 * ----------
 * 
 * Icons List components show up icons (.svg files)
 * that are wrapped as in links.
 * Each icon in the props.icons should be an object of shape:
 * {
 * ..name: String,
 * ..size: String,
 * ..src: String (file path to svg),
 * ..url: String (url)
 * }
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"

import { Icon } from '../../01-atoms'

import * as errorTypes from '../../errorTypes'

const IconsList = ({
  additionalClasses,
  direction,
  icons
}) => {
  useEffect(() => {
    const animateIconsList = entries => {
      entries.forEach(entry =>  {
        if (entry.isIntersecting) {
          // get icons
          const icons = Array.from(entry.target.querySelectorAll('.icon'))
          icons.forEach((icon, i) => {
            // stagger icon animations
            icon.style.animationDelay = `.${i * 2}s`
            icon.classList.add('slide-from-right__fade-in--medium')
          })
        }
      })
    }
    const lists = Array.from(document.querySelectorAll('.icons-list'))
    const options = { threshold: .6 }
    const observer = new IntersectionObserver(animateIconsList, options)
    lists.forEach(list => observer.observe(list))

    return () => observer.disconnect()
  }, [])
  
  const validateList = (direction) => {
    let errors = []
    // check the direction prop is one of the allowed values
    if (["column", "row", "column-reverse", "row-reverse"].indexOf(direction) < 0) {
      errors.push({
        type: errorTypes.VALUE_OUT_OF_RANGE,
        source: "IconsList > props.direction",
        message: "Direction corresponds to flex direction, and should be one of 'column' | 'row' | 'column-reverse' | 'row-reverse'"
      })
    }
    
    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }
    
    return errors
  }
  
  const classes = [
    "icons-list",
    `icons-list--${direction}`,
    ...additionalClasses
  ]
  return validateList(direction).length > 0 ? null : (
    <ul className={`${classes.join(" ")}`}>
      {
        icons.map(icon => (
          <li key={ icon.name }>
            <Icon { ...icon } />
          </li>
        ))
      }
    </ul>
  )
}

IconsList.propTypes = {
  additionalClasses: PropTypes.array,
  direction: PropTypes.string,
  icons: PropTypes.array.isRequired,
  size: PropTypes.string
}

IconsList.defaultProps = {
  additionalClasses: [],
  direction: "column",
  size: "sm"
}

export default IconsList
