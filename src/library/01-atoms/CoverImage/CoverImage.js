/**
 * ----------
 * COVERIMAGE
 * ----------
 * 
 * Cover Image components display an img inside of a
 * container. These components use object-fit: cover to
 * ensure the container div is always filled.
 * @requires object-fit-polyfill
 * 
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import * as errorTypes from '../../errorTypes'

const CoverImage = ({
  additionalClasses,
  coverImageId,
  imageAlt,
  imageId,
  imagePlaceholderSrc,
  imagePos,
  imageSize,
  imageSrc,
  objectFit,
  scopedStyles
}) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const componentImage = document.querySelector(`#${imageId}`)
    if (componentImage !== null && componentImage !== undefined) {
      componentImage.classList.remove('image-in')
      const targetImage = new Image()
      targetImage.onload = () => {
        setIsLoading(false)
        componentImage.classList.add('image-in')
        componentImage.src = targetImage.src
      }
      targetImage.src = imageSrc
    }
  }, [imageSrc, imageId])

  // set theme styles
  const styles = {
    width: imageSize.width,
    height: imageSize.height,
    ...scopedStyles
  }
  const imageStyles = {
    objectPosition: `${imagePos.x} ${imagePos.y}`
  }

  const validateImage = (imagePos, imageSize) => {
    let errors = []
    // check that the imagePos prop has the correct properties
    let imagePosKeys = Object.keys(imagePos)
    if (imagePosKeys.indexOf("x") < 0 || imagePosKeys.indexOf("y") < 0) {
      errors.push({
        type: errorTypes.OBJECT_MALFORMED,
        source: "CoverImage > props.imagePos",
        message: "imagePos prop must be an object containing keys 'x' and 'y'"
      })
    }
    // check that the imageSize prop has the correct properties
    let imageSizeKeys = Object.keys(imageSize)
    if (imageSizeKeys.indexOf("width") < 0 || imageSizeKeys.indexOf("height") < 0) {
      errors.push({
        type: errorTypes.OBJECT_MALFORMED,
        source: "CoverImage > props.imageSize",
        message: "imageSize props must be an object containing 'width' and 'height'"
      })
    }

    for (const error of errors) {
      console.warn(`${error.type}: ${error.source}\n${error.message}`)
    }
    return errors
  }

  const classes = [
    "cover-image",
    isLoading ? "image-loading" : "",
    `image--${objectFit}`,
    ...additionalClasses
  ]
  return validateImage(imagePos, imageSize).length > 0 ? null : (
    <div style={ styles } className={`${classes.join(" ")}`} id={ coverImageId }>
      <img  data-object-fit={ objectFit }
            alt={ imageAlt }
            id={ imageId }
            src={ imagePlaceholderSrc ? imagePlaceholderSrc : imageSrc }
            style={ imageStyles }
      />
    </div>
  )
}

CoverImage.propTypes = {
  additionalClasses: PropTypes.array,
  coverImageId: PropTypes.string,
  imageAlt: PropTypes.string,
  imageId: PropTypes.string.isRequired,
  imagePlaceholderSrc: PropTypes.string,
  imagePos: PropTypes.object, // <-- object with keys "x" and "y"
  imageSize: PropTypes.object, // <-- object with keys "width" and "height"
  imageSrc: PropTypes.string, // <-- file path to a .jpg, .png, .svg...
  objectFit: PropTypes.string,
  scopedStyles: PropTypes.object
}

CoverImage.defaultProps = {
  additionalClasses: [],
  imageAlt: "loris-ui.portfolio image",
  imagePos: { x: "50%", y: "50%" },
  imageSize: { width: "24rem", height: "16rem" },
  objectFit: "cover",
  scopedStyles: {}
}

export default CoverImage
