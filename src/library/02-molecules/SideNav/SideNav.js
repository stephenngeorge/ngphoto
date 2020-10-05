/**
 * ----------
 * SIDENAV
 * ----------
 * 
 * Side Nav components are to display a list of links. This is 
 * secondary navigation and should not be used for the main site nav,
 * display these links next to some other content.
 * Each item in the menuItems array should be of shape:
 * {
 * ..label: String,
 * ..path: String (valid path to an App route),
 * }
 */

import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

import { ThemeContext } from '../../00-protons/Themer/Themer'

const SideNav = ({
  additionalClasses,
  direction,
  linkColor,
  menuItems,
  scopedStyles
}) => {
  // animate side nav
  useEffect(() => {
    const sideNav = document.querySelector('.side-nav')
    const animateSideNav = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sideNavLinks = Array.from(sideNav.querySelectorAll('a'))
          sideNavLinks.forEach((link, i) => {
            // stagger animations for nav items
            link.style.animationDelay = `${i * 120}ms`
            link.classList.add('slide-from-right__fade-in--slow')
          })
        }
      })
    }
    const options = { threshold: .5 }
    const observer = new IntersectionObserver(animateSideNav, options)
    observer.observe(sideNav)

    return () => observer.disconnect()
  }, [menuItems])

  // consume theme and set styles
  const { colors, fontFamilies, fontSizes } = useContext(ThemeContext)
  const navStyles = {
    color: colors[linkColor],
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.lead,
    ...scopedStyles
  }

  const validateMenu = direction => {
    let errors = []

    if (["column", "row", "column-reverse", "row-reverse"].indexOf(direction) < 0) {
      errors.push({
        type: "VALUE OUT OF RANGE",
        source: "SideNav > props.direction",
        message: "direction must be one of 'column' | 'row' | 'column-reverse' | 'row-reverse', these correspond to flex-direction values"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }

    return errors
  }

  const classes = ["side-nav", ...additionalClasses]
  const navClasses = [`side-nav__nav--${direction}`]
  return validateMenu(direction).length > 0 ? null : (
    <aside className={`${classes.join(" ")}`}>
      <nav style={ navStyles } className={`${navClasses.join(" ")}`}>
        {
          menuItems.map(item => (
            <Link key={ item.label } to={ item.path }>
              { item.label }
            </Link>
          ))
        }
      </nav>
    </aside>
  )
}

SideNav.propTypes = {
  additionalClasses: PropTypes.array,
  direction: PropTypes.string,
  linkColor: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
  scopedStyles: PropTypes.object
}

SideNav.defaultProps = {
  additionalClasses: [],
  direction: "column",
  linkColor: "main",
  scopedStyles: {}
}

export default SideNav
