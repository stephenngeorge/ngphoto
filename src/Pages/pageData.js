import {
  FACEBOOK_LOGO,
  NGPHOTO_LOGO_MARK,
  SENT_MAIL_ICON,
  TWITTER_LOGO
} from '../assets'

const pageData = {
  accreditationLink:{ url: "https://github.com/stephenngeorge", text: "Stephen Pal-George" },
  accreditationText:"Designed and built by ",
  iconsListData:{
    direction: "row",
    icons: [
      { name: 'facebook', size: 'sm', src: FACEBOOK_LOGO, url: 'https://www.facebook.com/NeilGeorgePhotography/' },
      { name: 'twitter', size: 'sm', src: TWITTER_LOGO, url: 'https://twitter.com/NeilG199' },
      { name: 'email', size: 'sm', src: SENT_MAIL_ICON, url: 'mailto:neil.george@icloud.com' }
    ] 
  },
  menuLinks: [
    { path: "/galleries/new-work", label: "galleries" },
    { path: "/buy", label: "buy" },
    { path: "/contact", label: "contact" }
  ],
  siteMapLinks: [
    { path: "/", label: "Home" },
    { path: "/buy", label: "Buy" },
    { path: "/galleries/new-work", label: "Galleries" },
    { path: "/contact", label: "Contact" }
  ],
  siteLogo: NGPHOTO_LOGO_MARK,
  siteTitle: "Neil George Photography"
}

export default pageData