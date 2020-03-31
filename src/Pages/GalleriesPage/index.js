import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebaseDb } from '../../utils'

import { uglify, slugify, prettify } from '../../utils'
import { NGPHOTO_LOGO_MARK_BW } from '../../assets'

import { ButtonRow, GalleryFull, PageNav, Title } from 'loris-ui.portfolio'
import data from './data'

const GalleriesPage = () => {
  const { galleryName } = useParams()
  const [galleryImages, setGalleryImages] = useState([])
  const [pageNavData, setPageNavData] = useState([])
  const [galleriesVal, dbRef] = useFirebaseDb("Photos")

  useEffect(() => window.scrollTo(0, 0), [])
  useEffect(() => {
    setGalleryImages([])
    const images = []
    const pageNavLinks = []
    Object.keys(galleriesVal).forEach(key => {
      if (key.toLowerCase() === uglify(galleryName)) {
        Object.entries(galleriesVal[key].images).forEach(([name, image]) => {
          images.push({
            ...image,
            placeholderImageSrc: NGPHOTO_LOGO_MARK_BW
          })
        })
      }
    })

    Object.keys(galleriesVal).forEach(key => {
      if (key !== "Home_Page") {
        pageNavLinks.push({
          label: prettify(key).charAt(0).toUpperCase() + prettify(key).substring(1),
          url: `/galleries/${slugify(key)}`,
          weight: galleriesVal[key].weight
        })
      }
    })

    setGalleryImages(images.reverse())
    setPageNavData(pageNavLinks.sort((a, b) => a.weight - b.weight))

    return () => {
      if (dbRef !== null) dbRef.off()
    }
  }, [galleryName, galleriesVal, dbRef])

  return (
    <div className="page site-page galleries-page">
      <PageNav links={ pageNavData } />
      <Title titleText={ prettify(galleryName) } titleLevel={ 1 } underlineColor="secondary" />
      <GalleryFull images={ galleryImages }>
        <ButtonRow { ...data.buttonRow } />
      </GalleryFull>
    </div>
  )
}

export default GalleriesPage