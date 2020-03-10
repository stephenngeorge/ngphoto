import {
  FACEBOOK_LOGO,
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
  }
}

export default data