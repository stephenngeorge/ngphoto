/**
 * ----------
 * GALLERYFULL
 * ----------
 * 
 * Gallery Full components represent a gallery of images
 * that occupy a large section of the page, and often
 * are the entire page in their own right.
 * 
 * Gallery Full consumes the ImageScroller and ImageFocus
 * components as well as exposing a flexible content area
 * where the children are rendered.
 * 
 * @requires './ImageScroller.js'
 * @requires './ImageFocus.js'
 */

import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"

import ImageScroller from './ImageScroller'
import ImageFocus from './ImageFocus'

const GalleryFull = ({
  additionalClasses,
  children,
  galleryColor,
  images
}) => {
  const [focusImage, setFocusImage] = useState();
  const scrollImage = useCallback(dir => {
    if (dir === "left") {
      if (focusImage > 0) setFocusImage(focusImage - 1)
      else setFocusImage(images.length - 1)
    }

    if (dir === "right") {
      if (focusImage < images.length - 1) setFocusImage(focusImage + 1)
      else setFocusImage(0)
    }
  }, [focusImage, images.length])
  // control the focus image with left and right arrow keys
  useEffect(() => {
    const handleKeyUp = e => {
      e.preventDefault()
      if (e.keyCode === 37) scrollImage("left")
      if (e.keyCode === 39) scrollImage("right")
    }
    document.addEventListener('keyup', handleKeyUp)

    return () => document.removeEventListener('keyup', handleKeyUp)
  }, [focusImage, scrollImage])
  // everytime images changes (new gallery is loaded), reset the
  // focus image valeu to 0
  useEffect(() => {
    setFocusImage(0)
  }, [images])

  const autoScroll = e => {
    e.preventDefault()
    const imageFocusSection = document.querySelector('.image-focus')
    window.scrollTo(0, imageFocusSection.offsetTop - 64)
  }

  const classes = ["gallery-full", ...additionalClasses]
  return (
    <section className={`${classes.join(" ")}`}>
      <ImageScroller
        images={ images }
        bgColor={ galleryColor }
        setFocusImage={ setFocusImage }
        autoScroll={ autoScroll }
      />
      { children }
      <ImageFocus
        images={ images }
        focusImage={ focusImage }
        scrollImage={ scrollImage }
      />
    </section>
  )
}

GalleryFull.propTypes = {
  additionalClasses: PropTypes.array,
  galleryColor: PropTypes.string,
  images: PropTypes.array.isRequired
}

GalleryFull.defaultProps = {
  additionalClasses: [],
  galleryColor: "secondary_light"
}

export default GalleryFull
