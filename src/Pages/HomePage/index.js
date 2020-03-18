import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

import { prettify, slugify } from '../../utils'

import {
  ButtonRow,
  HeroGallery,
  RichText,
  StaticGallery,
  TextSection
} from 'loris-ui.portfolio'
import data from './data'
import { NGPHOTO_LOGO_MARK_BW } from '../../assets'

const HomePage = () => {
  const [images, setImages] = useState([])
  const [staticGalleryImages, setStaticGalleryImages] = useState([])
  const [staticGallerySideNav, setStaticGallerySideNav] = useState([])
  const staticGalleryData = {
    titleLevel: 2,
    titleText: "Latest Work",
    underlineColor: "main",
    images: []
  }

  useEffect(() => {
    // get data
    // each image should have imageAlt, imageId,
    // imageSrc and imagePlaceholderSrc (which is the same for every image)
    const db = firebase.database()
    const dbRef = db.ref()
    // fetches images for the hero gallery component
    const getHomePageImages = () => {
      const homepageImages = []
      dbRef.on('value', snapshot => {
        if (snapshot !== null) {
          const imageData = snapshot.val().Photos.Home_Page.images
          // pass all values of image along with the additional
          // image placeholder property
          Object.entries(imageData).forEach(([key, image]) => {
            homepageImages.push({
              imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
              ...image
            })
          })
          setImages(homepageImages)
        }
      })
    }
    // fetches images and sidenav data for the
    // static gallery component
    const getStaticGallery = () => {
      dbRef.on('value', snapshot => {
        if (snapshot !== null) {
          // get gallery data and construct array of objects
          const galleryNames = snapshot.val().Photos
          const sideNavData = []
          Object.entries(galleryNames).forEach(([gallery, galleryData]) => {
            // home page gallery is only for the hero gallery component,
            // so here we make sure that it isn't pushed into the sidenav data
            if (gallery !== "Home_Page") {
              sideNavData.push({
                path: `/galleries/${slugify(gallery)}`,
                label: prettify(gallery).charAt(0).toUpperCase() + prettify(gallery).substring(1),
                // weight is used to order the list of galleries
                // see `sort` function in `setStaticGallerySideNav` below
                weight: galleryData.weight
              })
            }
          })

          // fetch images from new work gallery - to be rendered in the
          // static gallery component
          const staticGalleryImages = snapshot.val().Photos.New_Work.images
          const imagesData = []
          // pass along all image values with the additional
          // placeholderImageSrc property
          Object.entries(staticGalleryImages).forEach(([key, image]) => {
            imagesData.push({
              placeholderImageSrc: NGPHOTO_LOGO_MARK_BW,
              ...image
            })
          })
          setStaticGalleryImages(imagesData.reverse())
          setStaticGallerySideNav(sideNavData.sort((a, b) => a.weight - b.weight))
        }
      })
    }
    
    getHomePageImages()
    getStaticGallery()
  }, [])

  return (
    <div className='page home-page'>
      <HeroGallery images={ images } />
      <TextSection { ...data.textSection }>
        <RichText>
          <p>
            Having taken early retirement in 2017, I now concentrate on photography 
            (alongside my other main interest: reading) with a particular interest in 
            UK wildlife and nature. My ambition is always to create pictures with an 
            element of the “artistic” but captured without any staging. None of my 
            pictures are set up or taken in a studio: they are all images captured 
            whilst outside exploring the British countryside. I look for ways to make 
            these pictures more than simple record shots and ideally I want to create 
            images that people would be keen to hang on their walls. I use a Canon 7D 
            MkII with Sigma 150-600mm S, Sigma 70-200mm and Canon 17-55mm lenses. 
            Images are post-processed in Lightroom. You can also find me on <a href="https://www.facebook.com/NeilGeorgePhotography/">Facebook 
            (@NeilGeorgePhotography)</a> and <a href="https://twitter.com/NeilG199">Twitter (@NeilG199)</a>, 
            although my Twitter feed mixes both photography and book reviews.
          </p>
        </RichText>
      </TextSection>
      <ButtonRow { ...data.buttonRow } />
      <StaticGallery { ...staticGalleryData } images={ staticGalleryImages } sideNavMenuItems={ staticGallerySideNav } />
    </div>
  )
}

export default HomePage