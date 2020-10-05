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

import { FACEBOOK_LOGO, TWITTER_LOGO } from '../../../demo/assets'

const data = {
  // add props here that your component will expect in the format:
  // PropName: prop value
  direction: "column",
  icons: [
    {
      name: 'facebook',
      size: 'md',
      src: FACEBOOK_LOGO,
      url: 'https://www.facebook.com'
    },
    {
      name: 'twitter',
      size: 'md',
      src: TWITTER_LOGO,
      url: 'https://twitter.com'
    }
  ]
}

export {
  data
}