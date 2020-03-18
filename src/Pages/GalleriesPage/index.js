import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'

import { uglify, slugify, prettify } from '../../utils'
import { NGPHOTO_LOGO_MARK_BW } from '../../assets'

import { GalleryFull, PageNav } from 'loris-ui.portfolio'

const GalleriesPage = () => {
  const { galleryName } = useParams()
  const [galleryImages, setGalleryImages] = useState([])
  const [pageNavData, setPageNavData] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setGalleryImages([])
    const db = firebase.database()
    const dbRef = db.ref()
    dbRef.on('value', snapshot => {
      if (snapshot !== null) {
        const images = []
        const pageNavLinks = []
        const photosData = snapshot.val().Photos
        Object.keys(photosData).forEach(key => {
          if (key.toLowerCase() === uglify(galleryName)) {
            Object.entries(photosData[key].images).forEach(([name, image]) => {
              images.push({
                ...image,
                placeholderImageSrc: NGPHOTO_LOGO_MARK_BW
              })
            })
          }
        })

        Object.keys(photosData).forEach(key => {
          if (key !== "Home_Page") {
            pageNavLinks.push({
              label: prettify(key).charAt(0).toUpperCase() + prettify(key).substring(1),
              path: `/galleries/${slugify(key)}`,
              weight: photosData[key].weight
            })
          }
        })

        setGalleryImages(images.reverse())
        setPageNavData(pageNavLinks.sort((a, b) => a.weight - b.weight))
      }
    })
  }, [galleryName])

  return (
    <div className="page site-page galleries-page">
      <PageNav links={ pageNavData } />
      <GalleryFull images={ galleryImages } />
    </div>
  )
}

export default GalleriesPage