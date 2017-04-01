const path = require('path')
const fs = require('fs')
fs.writeFileSync(path.join(__dirname, 'dist/CNAME'), fs.readFileSync(path.join(__dirname, 'CNAME')))
const ghpages = require('gh-pages')
const pushOptions = {
  logger (message) {
    console.log(message)
  },
}
ghpages.publish(path.join(__dirname, 'dist'), pushOptions, () => {
  console.log(`${new Date()} dist publish success`)
})
