const fs = require('fs')
const path = require('path')
const walkSync = require('walk-sync')
const cheerio = require('cheerio')

const redirectCode = fs.readFileSync(
  path.join(__dirname, 'redirect.js')
)

const injectRedirect = page => {
  console.log(`Injecting redirect in ${page}`)
  const original = fs.readFileSync(page)
  const $ = cheerio.load(original)
  $('body').append(`<script>${redirectCode}</script>`)
  fs.writeFileSync(page, $.html())
}

const main = () => {
  const vidarDir = path.join(__dirname, '..', 'vidar-site', 'public')
  walkSync(vidarDir)
    .filter(page => page.endsWith('.html'))
    .forEach(page => injectRedirect(path.join(vidarDir, page)))
}

main()
