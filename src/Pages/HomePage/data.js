import {
  HOME_GALLERY_1,
  HOME_GALLERY_2,
  HOME_GALLERY_3,
  HOME_GALLERY_4,
  HOME_GALLERY_5,
  HOME_GALLERY_6,
  NGPHOTO_LOGO_MARK_BW,
} from '../../assets';

const data = {
  textSection: {
    additionalClasses: [
      'text-container--very-narrow'
    ],
    titleLevel: 2,
    titleText: "Capturing the changing moods of British wildlife and nature",
    underlineColor: "main"
  },
  buttonRow: {
    rowColor: "main",
    rowWidth: "very-narrow",
    buttons: [
      {
        buttonLink: "/buy",
        buttonLinkVariation: "internal",
        buttonOutline: false,
        buttonText: "Buy images"
      },
      {
        buttonLink: "/contact",
        buttonLinkVariation: "internal",
        buttonOutline: true,
        buttonText: "Get in touch"
      }
    ]
  },
  gallery: [
    {
      imageAlt: 'Croggan Reflection, Mull',
      imageId: 'CrogganHP',
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: HOME_GALLERY_1,
    },
    {
      imageAlt: 'Short-eared owl in flight, Hawling',
      imageId: 'WinterOwl',
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: HOME_GALLERY_2,
    },
    {
      imageAlt: 'Hebridean Impressions, Jura',
      imageId: 'HIIX',
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: HOME_GALLERY_3,
    },
    {
      imageAlt: 'Theatreland, London',
      imageId: 'TheatrelandII',
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: HOME_GALLERY_4,
    },
    {
      imageAlt: 'Roebuck, Sunset',
      imageId: 'Roebuck',
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: HOME_GALLERY_5,
    },
    {
      imageAlt: 'Bluebells & Beech Trees',
      imageId: 'BlueBeech',
      imagePlaceholderSrc: NGPHOTO_LOGO_MARK_BW,
      imageSrc: HOME_GALLERY_6,
    },
  ],
  quote: {
    citation: 'David Alan Harvey',
    quoteText: 'Don’t shoot what it looks like. Shoot what it feels like.'
  }
}

export default data;