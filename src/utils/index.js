const strip = text => text.trim().toLowerCase()

const prettify = text => strip(text).replace(/_/g, " ")

const slugify = text => strip(text).replace(/_/g, "-")

export {
  prettify,
  slugify
}