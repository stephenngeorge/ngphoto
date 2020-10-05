/**
 * ----------
 * PAGENAV
 * ----------
 * 
 * Page Nav components are lists of links that act
 * as navigation within a page, i.e. the urls may change,
 * but the links in a Page Nav should not take you away 
 * from the page you are on.
 * 
 */

import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

import { ThemeContext } from '../../00-protons/Themer/Themer'

const PageNav = ({
  additionalClasses,
  linkHighlight,
  links,
  scopedStyles
}) => {
  // animate page nav
  useEffect(() => {
    const animatePageNav = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const links = Array.from(document.querySelectorAll('.page-nav__link'))
          links.forEach((link, i) => {
            // stagger animation for nav items
            link.style.animationDelay = `${i * 200}ms`
            link.classList.add('slide-from-top__fade-in--medium')
          })
        }
      })
    }

    const options = { threshold: .6 }
    const observer = new IntersectionObserver(animatePageNav, options)
    const pageNav = document.querySelector('.page-nav')
    observer.observe(pageNav)

    return () => observer.disconnect()
  }, [links])

  // consume theme and set styles
  const { colors, fontFamilies, fontWeights, layout } = useContext(ThemeContext)
  const navStyles = {
    color: colors.dark,
    fontFamily: fontFamilies.serif,
    fontWeight: fontWeights.heavy,
    padding: layout.spacing_md,
    ...scopedStyles
  }

  const underlineStyles = {
    backgroundColor: colors[linkHighlight]
  }

  const classes = [
    "page-nav",
    "text-container--narrow",
    ...additionalClasses
  ]
  return (
    <nav style={ navStyles } className={`${classes.join(" ")}`}>
      {
        links.map(link => (
          <Link className={`page-nav__link page-nav__link--${linkHighlight}`} key={ link.label } to={ link.url }>
            { link.label }
            <div style={ underlineStyles } className="underline"></div>
          </Link>
        ))
      }
    </nav>
  )
}

PageNav.propTypes = {
  additionalClasses: PropTypes.array,
  linkHighlight: PropTypes.string,
  links: PropTypes.array.isRequired,
  scopedStyles: PropTypes.object
}

PageNav.defaultProps = {
  additionalClasses: [],
  linkHighlight: "main",
  scopedStyles: {}
}

export default PageNav
