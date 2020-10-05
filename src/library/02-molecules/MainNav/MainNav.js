/**
 * ----------
 * MAINNAV
 * ----------
 * 
 * Main Nav components are the top level navigation of the
 * site, intended to be used on every page. There is a 'light'
 * and 'dark' mode for use in differnet contexts. Main Nav
 * components take a menuLinks props, which is an array of
 * objects, in which each object should be of shape:
 * 
 * {
 * ..path: string,
 * ..label: string
 * }
 * 
 */

import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import PropTypes from "prop-types"

import { ThemeContext } from '../../00-protons/Themer/Themer'

const MainNav = ({
  additionalClasses,
  menuLinks,
  scopedStyles,
  siteLogo,
  siteTitle
}) => {
  const [colorTheme, setColorTheme] = useState("dark")
  const location = useLocation()

  // animate nav
  useEffect(() => {
    if (window.innerWidth >= 992) {
      const animateNav = entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // get DOM nodes
            const menuLinks = Array.from(mainNav.querySelectorAll('a'))
            const title = document.querySelector('.site-title')
            title.classList.add('slide-from-left__fade-in--medium')
            menuLinks.forEach((link, i) => {
              link.style.animationDelay = `.${i * 2}s`
              link.classList.add('slide-from-top__fade-in--medium')
            })
          }
        })
      }
      const mainNav = document.querySelector('.main-nav__menu')
      const options = { threshold: 1 }
      const observer = new IntersectionObserver(animateNav, options)
      observer.observe(mainNav)

      return () => observer.disconnect()
    }
  }, [])

  // handle color theme
  useEffect(() => {
    const selectColorTheme = () => {
      switch (location.pathname) {
        case "/":
          if (window.innerWidth >= 992 && window.scrollY < window.innerHeight / 3) {
            setColorTheme("light")
          }
          else setColorTheme("dark")
          break
        default:
          setColorTheme("dark")
      }
    }
    selectColorTheme()

    const menuScrollBehaviours = () => {
      if (window.innerWidth >= 992 && location.pathname === "/") {
        if (window.scrollY > window.innerHeight / 3) setColorTheme("dark")
        else setColorTheme("light")
      }
    }
    
    window.addEventListener("resize", selectColorTheme)
    window.addEventListener("scroll", menuScrollBehaviours)

    return () => {
      window.removeEventListener("resize", selectColorTheme)
      window.removeEventListener("scroll", menuScrollBehaviours)
    }
      
  }, [location.pathname])

  // consume theme and set styles
  const { fontFamilies, fontSizes } = useContext(ThemeContext)
  const menuStyles = {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.default,
    ...scopedStyles
  }
  const linkStyles = {
    fontFamily: fontFamilies.sans_serif
  }

  // menu behaviours
  const controlMenu = (func) => {
    window.scrollTo(0, 0)
    const menu = document.querySelector(".main-nav__menu")
    const icon = document.querySelector(".main-nav__menu-icon")

    if (menu !== null && menu !== undefined) {
      menu.classList[func]('onscreen')
      icon.classList[func]('icon-arrow')
    }
  }


  const classes = [
    "main-nav",
    `main-nav--${colorTheme}`,
    window.innerWidth >= 992 ? 'main-nav--wide' : 'main-nav--narrow',
    ...additionalClasses
  ]
  return (
    <div style={ menuStyles } className={`${classes.join(" ")}`}>
      <div className="main-nav__controls">
        <Link className="site-title" onClick={ () => controlMenu('remove') } to="/">
          {
            siteLogo &&
            <img src={ siteLogo } alt="Neil George Photography Logo" className="site-logo" />
          }
          <p>{ siteTitle }</p>
        </Link>
        <button onClick={ () => controlMenu('toggle') } className="main-nav__menu-icon">
          <div className="main-nav__menu-icon--top"></div>
          <div className="main-nav__menu-icon--middle"></div>
          <div className="main-nav__menu-icon--bottom"></div>
        </button>
      </div>
      <nav style={ linkStyles } className="main-nav__menu">
        { menuLinks.map(link => (
          <Link onClick={ () => controlMenu('remove') } key={ link.label } to={ link.path }>{ link.label }</Link>) 
        ) }
      </nav>
    </div>
  )
}

MainNav.propTypes = {
  additionalClasses: PropTypes.array,
  menuLinks: PropTypes.array.isRequired,
  scopedStyles: PropTypes.object,
  siteLogo: PropTypes.string,
  siteTitle: PropTypes.string.isRequired
}

MainNav.defaultProps = {
  additionalClasses: [],
  scopedStyles: {}
}

export default MainNav
