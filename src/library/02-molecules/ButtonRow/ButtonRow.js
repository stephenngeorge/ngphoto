/**
 * ----------
 * BUTTON ROW
 * ----------
 * 
 * Button Row components render up to two buttons
 * on a line, each with their own props.
 * ButtonRow accepts an array of buttons, each button
 * object in the array should contain any props that
 * are accepted by the button atom.
 */

import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"

import { LinkButton } from '../../01-atoms'

import { ThemeContext } from '../../00-protons/Themer/Themer'
import * as errorTypes from '../../errorTypes'

const ButtonRow = ({
  additionalClasses,
  buttons,
  rowColor,
  rowWidth,
  scopedStyles
}) => {
  useEffect(() => {
    const buttonRow = document.querySelector('.button-row')
    const underline = buttonRow.querySelector('.underline')
    const animateButtonRow = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // get buttons
          const buttons = Array.from(buttonRow.querySelectorAll('.link-button'))
          buttons.forEach((btn, i) => {
            // stagger buttons animations
            btn.style.animationDelay = `.${i * 2}s`
            btn.classList.add('slide-from-bottom__fade-in--medium')
          })
          // animate underline
          underline.classList.add('scale-in-underline')
        }
      })
    }
    const options = { threshold: .4 }
    const observer = new IntersectionObserver(animateButtonRow, options)
    observer.observe(buttonRow)

    return () => observer.disconnect()
  })

  // consume theme and set styles
  const { colors } = useContext(ThemeContext)
  const underlineStyles = {
    borderBottom: `2px solid ${colors[rowColor]}`
  }
  const styles = { ...scopedStyles }

  const validateRow = rowWidth => {
    const errors = []
    // check the rowWidth prop is one of the allowed values
    if (["narrow", "very-narrow"].indexOf(rowWidth) < 0) {
      errors.push({
        type: errorTypes.VALUE_OUT_OF_RANGE,
        source: "ButtonRow > props.rowWidth",
        message: "The 'rowWidth' prop must be one of 'narrow' | 'very-narrow'. You should not pass an empty string. If you want the button container to be full wiidth, simply don't set the prop at all"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }
    return errors
  }

  const classes = ["button-row", ...additionalClasses]
  const widthClass = rowWidth ? `text-container--${rowWidth}` : ""
  return validateRow(rowWidth).length > 0 ? null : (
    <div style={ styles } className={`${classes.join(" ")}`}>
      <ul className={`button-row--list ${ widthClass }`}>
        {
          buttons.map((button, i) => {
            return (
              <li key={ i }>
                <LinkButton buttonBgColor={ rowColor }
                            buttonBorderColor={ rowColor }
                            { ...button }
                />
              </li>
            )
          })
        }
      </ul>

      <div style={ underlineStyles } className="underline"></div>
    </div>
  )
}

ButtonRow.propTypes = {
  additionalClasses: PropTypes.array,
  buttons: PropTypes.array.isRequired,
  rowColor: PropTypes.string,
  rowWidth: PropTypes.string, // <-- one of ["narrow", "very-narrow"]
  scopedStyles: PropTypes.object
}

ButtonRow.defaultProps = {
  additionalClasses: [],
  rowColor: 'main',
  rowWidth: 'narrow',
  scopedStyles: {}
}

export default ButtonRow
