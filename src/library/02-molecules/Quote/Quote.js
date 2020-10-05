/**
 * ----------
 * QUOTE
 * ----------
 * 
 * Comment block, describe your component here
 */

import React from "react"
import PropTypes from "prop-types"

const Quote = ({
  additionalClasses,
  citation,
  quoteText,
  textSize
}) => {
  const classes = ["quote", ...additionalClasses]
  return (
    <section className={`${classes.join(" ")}`}>
      <blockquote className={`quote__text--${textSize}`}>
        {quoteText}
        <cite>- {citation}</cite>
      </blockquote>
    </section>
  )
}

Quote.propTypes = {
  additionalClasses: PropTypes.array,
  citation: PropTypes.string,
  quoteText: PropTypes.string.isRequired,
  textSize: PropTypes.string
}

Quote.defaultProps = {
  additionalClasses: [],
  textSize: 'medium'
}

export default Quote
