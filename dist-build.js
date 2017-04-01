const ghpages = require('gh-pages')
const path = require('path')
const pushOptions = {
    logger(message) {
        console.log(message)
    },
}
ghpages.publish(path.join(__dirname, 'dist'), pushOptions, function() {
    console.log(`${new Date()} dist publish success`)
})
