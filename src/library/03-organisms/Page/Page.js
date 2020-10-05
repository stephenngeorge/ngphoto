/**
 * ----------
 * PAGE
 * ----------
 * 
 * Page components are wrappers for the app content.
 * They display a header (which includes the nav bar)
 * and a footer, with the page contents rendered therein.
 * 
 * The footer is forced to the bottom and the Page itself
 * is set to always be at least 100vh tall.
 * 
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"

import { Footer, MainNav } from '../../02-molecules'

const Page = ({
  accreditationLink,
  accreditationText,
  additionalClasses,
  children,
  iconsListData,
  menuLinks,
  siteLogo,
  siteMapLinks,
  siteTitle
}) => {
  useEffect(() => {
    const positionFooter = () => {
      const page = document.querySelector('.page')
      const footer = document.querySelector('footer')
      if (footer !== null && footer !== undefined) {
        page.style.paddingBottom = `${footer.clientHeight}px`
      }
    }

    positionFooter()
    window.addEventListener('resize', positionFooter)

    return () => window.removeEventListener('resize', positionFooter)
  }, [])

  const classes = ["page", ...additionalClasses]
  return (
    <div className={`${classes.join(" ")}`}>
      <header>
        <MainNav menuLinks={ menuLinks } siteTitle={ siteTitle } siteLogo={ siteLogo } />
      </header>

      <main>
        { children }
      </main>

      <Footer
        accreditationLink={ accreditationLink }
        accreditationText={ accreditationText }
        iconsListData={ iconsListData }
        siteMapLinks={ siteMapLinks }
      />
    </div>
  )
}

Page.propTypes = {
  accreditationLink: PropTypes.object,
  accreditationText: PropTypes.string,
  additionalClasses: PropTypes.array,
  iconsListData: PropTypes.object,
  menuLinks: PropTypes.array.isRequired,
  siteLogo: PropTypes.string,
  siteMapLinks: PropTypes.array,
  siteTitle: PropTypes.string.isRequired
}

Page.defaultProps = {
  additionalClasses: []
}

export default Page
