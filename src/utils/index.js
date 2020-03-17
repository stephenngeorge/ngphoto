// remove white space from text and prepare it for further manipulation
const strip = text => text.trim().toLowerCase()
// remove underscores and replace with spaces
const prettify = text => strip(text).replace(/_/g, " ")
// replace underscores with hyphens
const slugify = text => strip(text).replace(/_/g, "-")
// replace spaces and hyphens with underscores, undoes the work of the previous functions
const uglify = text => strip(text).replace(/\s/g, "_").replace(/-/g, "_")

export {
  prettify,
  slugify,
  uglify
}