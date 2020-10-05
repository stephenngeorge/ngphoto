// this is a basic data file for housing all the props data
// that you will pass into this component. By default, loris has
// setup a "data" object for you. You should import it in the file 
// where you consume this component and then pass it to the relevant 
// component like this: {...data}
//
// you can also add and export as many other objects from this file
// as you like, this is a pattern we encourage. So if you had an instance
// of this component on the homepage, setup and export a "homepage" object
// and then an "aboutpage" object etc (or use whatever naming convention
// you like!)

import { NGPHOTO_LOGO_MARK_BW, NGPHOTO_TEST_1, NGPHOTO_TEST_2, NGPHOTO_TEST_3 } from '../../../demo/assets'

const data = {
  // add props here that your component will expect in the format:
  // PropName: prop value
  images: [
    {
      imageAlt: "ngphoto test 1",
      imageId: "ngphoto-test-1",
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: NGPHOTO_TEST_1
    },
    {
      imageAlt: "ngphoto test 2",
      imageId: "ngphoto-test-2",
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: NGPHOTO_TEST_2
    },
    {
      imageAlt: "ngphoto test 3",
      imageId: "ngphoto-test-3",
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: NGPHOTO_TEST_3
    }
  ]
}

export {
  data
}