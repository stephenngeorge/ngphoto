import { NGPHOTO_LOGO_MARK_BW } from '../../assets'

const data = {
  textSection: {
    additionalClasses: [
      'text-container--very-narrow',
      'buy-page--text'
    ],
    titleLevel: 1,
    titleText: "Buy photos",
    underlineColor: "main"
  },
  buttonRow: {
    rowColor: "main",
    rowWidth: "very-narrow",
    buttons: [
      {
        buttonLink: "/contact",
        buttonLinkVariation: "internal",
        buttonOutline: false,
        buttonText: "Get in touch"
      }
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