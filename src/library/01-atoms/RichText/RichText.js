/**
 * ----------
 * RICH TEXT
 * ----------
 * 
 * Rich Text components are simply a wrapper for
 * other DOM elements. This allows rendering of
 * any other markup (anchor tags for example) with
 * consistent/controlled styling
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"

const RichText = ({
  additionalClasses,
  children,
  scopedStyles
}) => {
  useEffect(() => {
    const animateText = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-from-bottom__fade-in--medium')
        }
      })
    }

    const options = { threshold: .5 }
    const observer = new IntersectionObserver(animateText, options)
    const textBlocks = Array.from(document.querySelectorAll('.rich-text'))
    if (textBlocks.length > 0) textBlocks.forEach(block => observer.observe(block))

    return () => observer.disconnect()
  }, [])

  const styles = { ...scopedStyles }
  const classes = ["rich-text", ...additionalClasses]
  return (
    <div style={ styles } className={`${classes.join(" ")}`}>
      {children}
    </div>
  )
}

RichText.propTypes = {
  additionalClasses: PropTypes.array,
  scopedStyles: PropTypes.object
}

RichText.defaultProps = {
  additionalClasses: [],
  scopedStyles: {}
}

export default RichText
