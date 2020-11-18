const { createPw2 } = require('pw2')
const pw2 = createPw2()

const createImageResizer = (io) => {
  const resizeFiles = async (fileList, resizingMode) => {
    if (fileList.length <= 0) return undefined

    const baseDir = io.Directory.getDirName(fileList[0])
    const newFolderPath = io.Directory.createNewFolder(baseDir)

    fileList.forEach(async (file, fileIndex) => {
      const fileBuffer = io.File.readFile(file)
      const resizedFileBuffer = await pw2.resizeAndGetBuffer(fileBuffer, resizingMode)
      
      const filename = io.File.getFileName(file)
      const newFilePath = io.Path.resolvePath(newFolderPath, filename)
      
      io.File.createFile(newFilePath, resizedFileBuffer)
      logProgress(fileList.length - 1, fileIndex)
    })

    return newFolderPath
  }

  const getFilesToResize = (input, extensionsToFilter) => {
    const files = []
    
    if (io.File.isFile(input)) 
      files.push(input)
    else if (io.Directory.isDirectory(input))
      files.push(...io.File.getFilesFromDirectory(input)) 

    return files.filter(file => {
      const fileExtension = io.File.getFileExtension(file)
      return extensionsToFilter.includes(fileExtension)
    })
  }

  const logProgress = (target, current) => {
    let percentage = Math.round((current * 100) / target)
    if (target <= 0) 
      percentage = 100

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
