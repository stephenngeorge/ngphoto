import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import { slugify } from '../../utils';

import {
  ButtonRow,
  HeroGallery,
  Quote,
  StaticGallery,
  TextSection
} from '../../library';

import data from './data';
import { NGPHOTO_LOGO_MARK_BW } from '../../assets';

const HomePage = () => {
  const [staticGalleryImages, setStaticGalleryImages] = useState([]);
  const [staticGallerySideNav, setStaticGallerySideNav] = useState([]);
  const staticGalleryData = {
    titleLevel: 2,
    titleText: "Latest Work",
    underlineColor: "main",
    images: []
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // get data
    // each image should have imageAlt, imageId,
    // imageSrc and imagePlaceholderSrc (which is the same for every image)
    const db = firebase.database();
    const dbRef = db.ref("Photos");
    // fetches images and sidenav data for the
    // static gallery component
    const getStaticGallery = () => {
      dbRef.on('value', snapshot => {
        if (snapshot !== null) {
          // get gallery data and construct array of objects
          const galleryNames = snapshot.val()
          const sideNavData = []
          Object.entries(galleryNames).forEach(([gallery, galleryData]) => {
            // home page gallery is only for the hero gallery component,
            // so here we make sure that it isn't pushed into the sidenav data
            if (gallery !== "Home_Page") {
              sideNavData.push({
                path: `/galleries/${slugify(gallery)}`,
                label: galleryData.galleryName,
                // weight is used to order the list of galleries
                // see `sort` function in `setStaticGallerySideNav` below
                weight: galleryData.weight
              });
            }
          });

          // fetch images from new work gallery - to be rendered in the
          // static gallery component
          const staticGalleryImages = snapshot.val().New_Work.images;
          const imagesData = [];
          // pass along all image values with the additional
          // placeholderImageSrc property
          Object.entries(staticGalleryImages).forEach(([key, image]) => {
            imagesData.push({
              placeholderImageSrc: NGPHOTO_LOGO_MARK_BW,
              ...image
            });
          });
          setStaticGalleryImages(imagesData.reverse());
          setStaticGallerySideNav(sideNavData.sort((a, b) => a.weight - b.weight));
        }
      });
    }
    
    getStaticGallery();

    return () => dbRef.off();
  }, []);

  return (
    <div className='page home-page'>
      <HeroGallery images={ data.gallery } />
      <TextSection { ...data.textSection }>
        <Quote {...data.quote} />
        <p>
          Neil has been taking photographs for over 40 years, switching from film to 
          digital in 2009. In 2017, he took early retirement from a career in the IT 
          industry in order to focus on his image making. Neil’s photography follows two 
          distinct paths. Firstly, he has a very keen interest in the natural world and 
          spends a lot of time outside searching for wildlife or scenery that can be 
          photographed. In these images, Neil avoids use of Photoshop or other image 
          alterations: he looks for ways to capture atmosphere and mood rather than simply 
          recording the scene, but does not set up photographs or use post-processing 
          software to add or remove things. All image are post-processed in Lightroom, 
          but this does not make changes to the underlying image in Neil’s nature photography. 
          Neil’s other passion is for more abstract photography and here he makes use of his 
          camera’s multiple exposure facility and other creative techniques such as Intentional 
          Camera Movement (ICM) and he also uses Photoshop to blend images to create the effect 
          he has envisaged. You can find Neil on <a href="https://www.facebook.com/NeilGeorgePhotography/">Facebook 
          (@NeilGeorgePhotography)</a> and <a href="https://twitter.com/NeilG199">Twitter (@NeilG199)</a>, 
          although the Twitter feed also includes Neil’s other main interest: books. Please browse 
          through Neil’s image galleries: he hopes you enjoy the pictures.
        </p>
      </TextSection>
      <ButtonRow { ...data.buttonRow } />
      <StaticGallery { ...staticGalleryData } images={ staticGalleryImages } sideNavMenuItems={ staticGallerySideNav } />
    </div>
  );
}

export default HomePage;