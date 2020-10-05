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

import { FACEBOOK_LOGO, NGPHOTO_LOGO_MARK, TWITTER_LOGO, SENT_MAIL_ICON } from '../../../demo/assets'

const data = {
  // add props here that your component will expect in the format:
  // PropName: prop value
  accreditationLink: { url: "https://github.com/stephenngeorge", text: "Stephen Pal-George" },
  accreditationText: "Designed and built by ",
  iconsListData: {
    direction: "row",
    icons: [
      { name: 'facebook', size: 'sm', src: FACEBOOK_LOGO, url: 'https://www.facebook.com' },
      { name: 'twitter', size: 'sm', src: TWITTER_LOGO, url: 'https://twitter.com' },
      { name: 'email', size: 'sm', src: SENT_MAIL_ICON, url: 'https://google.co.uk' }
    ] 
  },
  menuLinks: [
    { path: "/galleries", label: "galleries" },
    { path: "/buy", label: "buy" },
    { path: "/contact", label: "contact" }
  ],
  siteMapLinks: [
    { path: "/", label: "Home" },
    { path: "/buy", label: "Buy" },
    { path: "/galleries", label: "Galleries" },
    { path: "/contact", label: "Contact" }
  ],
  siteLogo: NGPHOTO_LOGO_MARK,
  siteTitle: "Neil George Photography"
}

export {
  data
}