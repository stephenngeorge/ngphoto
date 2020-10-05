/**
 * ----------
 * IMAGESCROLLER
 * ----------
 * 
 * Image Scroller components are used to display a scrollable
 * area full of a gallery of images. Image Scrollers are consumed
 * by the GalleryFull component.
 * 
 * @see './GalleryFull.js'
 * 
 * Image Scroller components accept an array of images, in which
 * each object should be of shape:
 * 
 * {
 * ..imageAlt: string,
 * ..imageId: string,
 * ..imageName: string,
 * ..imageSrc: string (filepath)
 * }
 * 
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"

import { ImageLoader } from '../../01-atoms'

import { ThemeContext } from '../../00-protons/Themer/Themer'

const ImageScroller = ({
  additionalClasses,
  autoScroll,
  bgColor,
  images,
  scopedStyles,
  setFocusImage
}) => {
  // consume theme and set styles
  const { colors } = useContext(ThemeContext)
  const scrollerStyles = {
    backgroundColor: colors[bgColor],
    color: colors.dark,
    ...scopedStyles
  }

  const classes = ["image-scroller", ...additionalClasses]
  return (
    <div style={ scrollerStyles } className={`${classes.join(" ")}`}>
      {
        images.length > 0 &&
        images.map((image, i) => (
          <div onClick={e => {
            autoScroll(e)
            setFocusImage(i)
          }} className="image-scroller__image" key={ image.imageId }>
            <ImageLoader { ...image } />
            <p className="image-scroller__image--name">
              { image.imageName }
            </p>
          </div>
        ))
      }
    </div>
  )
}

ImageScroller.propTypes = {
  additionalClasses: PropTypes.array,
  autoScroll: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  images: PropTypes.array.isRequired,
  scopedStyles: PropTypes.object,
  setFocusImage: PropTypes.func.isRequired
}

ImageScroller.defaultProps = {
  additionalClasses: [],
  scopedStyles: {}
}

export default ImageScroller
