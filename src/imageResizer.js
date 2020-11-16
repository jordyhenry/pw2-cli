const { createPw2 } = require('pw2')
const pw2 = createPw2()

const createImageResizer = (io) => {
  const resizeFiles = async (fileList, resizingMode) => {
    const baseDir = io.getDirName(fileList[0])
    const newFolderPath = io.createNewFolder(baseDir)

    fileList.forEach(async (file, fileIndex) => {
      const fileBuffer = io.readFile(file)
      const resizedFileBuffer = await pw2.resizeAndGetBuffer(fileBuffer, resizingMode)
      
      const filename = io.getFileName(file)
      const newFilePath = io.resolvePath(newFolderPath, filename)
      
      io.createFile(newFilePath, resizedFileBuffer)
      logProgress(fileList.length - 1, fileIndex)
    })

    return newFolderPath
  }

  const getFilesToResize = (input, extensionsToFilter) => {
    const files = []
    
    if (io.isFile(input)) 
      files.push(input)
    else if (io.isDirectory(input))
      files.push(...io.getFilesFromDirectory(input)) 

    return files.filter(file => {
      const fileExtension = io.getFileExtension(file)
      return extensionsToFilter.includes(fileExtension)
    })
  }

  const logProgress = (target, current) => {
    const percentage = Math.round((current * 100) / target)

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`resizing: ${percentage}%`);
  }

  return {
    getFilesToResize,
    resizeFiles,
  }
}

module.exports.createImageResizer = createImageResizer
