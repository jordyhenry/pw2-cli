/*
  TODO : 
    - Upload to github
    - fill npm info
      - package.json
      - LICENSE
      - README
    - deploy
*/

'use strict'

const { createIO } = require('./io')
const { createParseArguments } = require('./parseArguments')
const { createImageResizer } = require('./imageResizer')

const main = async () => {
  const io = createIO()
  const parseArguments = createParseArguments(io)
  const imageResizer = createImageResizer(io)

  const { filter, mode, input } = parseArguments.parse()
  const filesToResize = imageResizer.getFilesToResize(input, filter)
  const resizedFilesFolder = await imageResizer.resizeFiles(filesToResize, mode)

  console.log(`New files create at ${resizedFilesFolder}`)
}

module.exports.pw2_cli = main
