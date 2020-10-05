/**
 * ----------
 * THEMER
 * ----------
 * 
 * Comment block, describe your component here
 */

import React, { createContext } from "react"
import PropTypes from "prop-types"

import defaultTheme from './defaultTheme'

export const ThemeContext = createContext()

const Themer = ({
  children,
  theme
}) => {
  const setTheme = {
    borderRadius: {
      ...defaultTheme.borderRadius,
      ...theme.borderRadius
    },
    borderWidth: {
      ...defaultTheme.borderWidth,
      ...theme.borderWidth
    },
    colors: {
      ...defaultTheme.colors,
      ...theme.colors
    },
    fontFamilies: {
      ...defaultTheme.fontFamilies,
      ...theme.fontFamilies
    },
    fontSizes: {
      ...defaultTheme.fontSizes,
      ...theme.fontSizes
    },
    fontWeights: {
      ...defaultTheme.fontWeights,
      ...theme.fontWeights
    },
    iconSizes: {
      ...defaultTheme.iconSizes,
      ...theme.iconSizes
    },
    layout: {
      ...defaultTheme.layout,
      ...theme.layout
    }
  }
  
  return (
    <ThemeContext.Provider value={ setTheme }>
      { children }
    </ThemeContext.Provider>
  )
}

Themer.propTypes = {
  theme: PropTypes.object.isRequired
}

Themer.defaultProps = {
  theme: {}
}

export default Themer
