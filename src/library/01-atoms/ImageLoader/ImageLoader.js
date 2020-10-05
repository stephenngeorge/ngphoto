/**
 * ----------
 * IMAGELOADER
 * ----------
 * 
 * Image Loader components are wrappers for rendering
 * large image files that might be slow to load. They
 * render a placeholder image and update to the target
 * image once it has fully loaded.
 * 
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const ImageLoader = ({
  additionalClasses,
  imageAlt,
  imageId,
  imageSrc,
  placeholderImageSrc
}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const componentImage = document.querySelector(`#${imageId}`)
    if (componentImage !== null && componentImage !== undefined) {
      const targetImage = new Image()
      targetImage.onload = () => {
        setIsLoading(false)
        componentImage.src = targetImage.src
      }
      targetImage.src = imageSrc
    }
  }, [imageSrc, imageId])

  const classes = [
    "image-loader",
    isLoading ? "image-loader--loading" : "",
    ...additionalClasses
  ]
  return (
    <div className={`${classes.join(" ")}`}>
      <img alt={ imageAlt } id={ imageId } src={ placeholderImageSrc } />
    </div>
  )
}

ImageLoader.propTypes = {
  additionalClasses: PropTypes.array,
  imageAlt: PropTypes.string,
  imageId: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  placeholderImageSrc: PropTypes.string.isRequired
}

ImageLoader.defaultProps = {
  additionalClasses: [],
  imageAlt: "Loris UI - Portfolio image-loader image"
}

export default ImageLoader
