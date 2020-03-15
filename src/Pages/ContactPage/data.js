import {
  FACEBOOK_LOGO,
  NGPHOTO_LOGO_MARK_BW,
  SENT_MAIL_ICON,
  TWITTER_LOGO
} from '../../assets'

const data = {
  textSection: {
    additionalClasses: [
      'text-container--very-narrow',
      'contact-page--text'
    ],
    titleLevel: 1,
    titleText: "Get in touch",
    underlineColor: "main"
  },
  iconsList: {
    direction: "row",
    icons: [
      { name: 'facebook', size: 'md', src: FACEBOOK_LOGO, url: 'https://www.facebook.com' },
      { name: 'twitter', size: 'md', src: TWITTER_LOGO, url: 'https://twitter.com' },
      { name: 'email', size: 'md', src: SENT_MAIL_ICON, url: 'https://google.co.uk' }
    ]
  },
  cardBlock: {
    backgroundColor: "grey",
    loadingImage: NGPHOTO_LOGO_MARK_BW,
    rowContains: 3,
    wrapOn: "row"
  }
}

export default data