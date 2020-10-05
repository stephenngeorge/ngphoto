/**
 * ----------
 * IMAGEFOCUS
 * ----------
 * 
 * Image Focus components are used to display a single, large image
 * as selected from the ImageScroller component.
 * 
 * @see './GalleryFull.js'
 * 
 * Image Focus components accept an array of images, in which
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

import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { ThemeContext } from '../../00-protons/Themer/Themer'

import chevron from './down-chevron.svg'

const ImageFocus = ({
  additionalClasses,
  focusImage,
  images,
  scrollImage
}) => {
  const [orientation, setOrientation] = useState("portrait")
  useEffect(() => {
    setTimeout(() => {
      const imageFocus = document.querySelector('.image-focus')
      imageFocus.style.opacity = 1
    }, 200)
    const calculateOrientation = () => {
      const { innerWidth: width, innerHeight: height } = window
      if (height > width) setOrientation("portrait")
      else setOrientation("landscape")
    }
    calculateOrientation()
    window.addEventListener('resize', calculateOrientation)
  }, [])

  // consume theme context and set styles
  const { fontFamilies, fontSizes } = useContext(ThemeContext)
  const imageNameStyles = {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes.lead,
    paddingTop: "1rem"
  }

  const classes = [
    "image-focus",
    `image-focus--${orientation}`,
    ...additionalClasses
  ]
  // override the image id and append --focus,
  // this ensures the image Id is different to the
  // thumbnail image id in the image scroller.
  const imageProps = {
    ...images[focusImage],
    imageId: images.length > 0 && focusImage < images.length ? `${images[focusImage].imageId}--focus` : 'image--focus'
  }

  return (
    <div className={`${classes.join(" ")}`}>
      <img  onClick={() => scrollImage("left")}
            alt="left arrow" src={ chevron }
            className="image-control"
            id="scroll-left"
      />
      <img  className="image-focus--image"
            id={ imageProps.imageId }
            alt={ imageProps.imageAlt }
            src={ imageProps.imageSrc }
      />
      <img  onClick={() => scrollImage("right")}
            alt="right arrow"
            src={ chevron }
            className="image-control"
            id="scroll-right"
      />
      <p className="image-name" style={ imageNameStyles }>{ imageProps.imageName }</p>
    </div>
  )
}

ImageFocus.propTypes = {
  additionalClasses: PropTypes.array,
  focusImage: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  scrollImage: PropTypes.func.isRequired
}

ImageFocus.defaultProps = {
  additionalClasses: [],
  focusImage: 0
}

export default ImageFocus
