/**
 * ----------
 * FOOTER
 * ----------
 * 
 * The Footer component will be rendered within the
 * Page component, a wrapper for all site pages.
 * Footers comprise a Site Map, a set of social media
 * links and a site accreditation.
 * 
 * Footer components accept an array of siteMapLinks, in
 * which each link should be an object of shape:
 * {
 * ..path: string, (url)
 * ..label: string
 * }
 * 
 * Footer components accept an object of iconsListData. This
 * should be structured to match the IconsList props object.
 * @see '../IconsList/IconsList.js'
 * 
 * The accreditationLink prop should be an object with properties
 * "url" and "text"
 * 
 */

import React, { useContext } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import IconsList from '../IconsList/IconsList'

import { ThemeContext } from '../../00-protons/Themer/Themer'

const Footers = ({
  accreditationLink,
  accreditationText,
  additionalClasses,
  iconsListData,
  siteMapLinks
}) => {
  // consume theme and set styles
  const { colors, fontFamilies, fontSizes, layout } = useContext(ThemeContext)
  const footerStyles = {
    backgroundColor: colors.dark,
    padding: layout.spacing_md
  }
  const siteMapStyles = {
    color: colors.light,
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.sans_serif
  }
  const accreditationStyles = {
    color: colors.light,
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.serif
  }

  const classes = ["footer", ...additionalClasses]
  return (
    <footer style={ footerStyles } className={`${classes.join(" ")}`}>
      <div style={ siteMapStyles } className="footer__site-map">
        <p className="footer__site-map--title">Site Map</p>
        <ul className="footer__site-map--links">
          {
            siteMapLinks.map(link => (
              <li key={ link.path }>
                <Link to={ link.path }>{ link.label }</Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="footer__social-links">
        <IconsList {...iconsListData} />
      </div>
      <div style={ accreditationStyles } className="footer__accreditation">
        <p>
          { accreditationText }
        </p>
        <a href={ accreditationLink.url }>
          { accreditationLink.text }
        </a>
      </div>
    </footer>
  )
}

Footers.propTypes = {
  accreditationLink: PropTypes.object,
  accreditationText: PropTypes.string,
  additionalClasses: PropTypes.array,
  iconsListData: PropTypes.object.isRequired,
  siteMapLinks: PropTypes.array.isRequired
}

Footers.defaultProps = {
  additionalClasses: []
}

export default Footers
