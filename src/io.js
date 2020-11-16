const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')

const createIO = () => {
  const errorMessages = {
    genericError: `something went wrong!`,
    invalidPath: `provided path don't exists!`,
    pathIsNotFile: `provided path is not a file!`,
    invalidBuffer: `Buffer is null!`
  }

  const getFilesFromDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) throw new Error(errorMessages.invalidPath)

    return fs.readdirSync(dirPath)
              .map(filePath => path.resolve(dirPath, filePath))
              .filter(fullFilePath => fs.lstatSync(fullFilePath).isFile())
  }

  const getNewFolderName = () => {
    const d = new Date()
    return `pw2_${d.toLocaleString().split(':').join('').split('-').join('').split(' ').join('_')}`
  }

  const createNewFolder = (baseDir) => {
    const newFolder = path.resolve(baseDir, getNewFolderName())
    fs.mkdirSync(newFolder)

    return newFolder
  }

  const readFile = (filePath) => {
    if (!fs.existsSync(filePath)) throw new Error(errorMessages.invalidPath)
    if (!isFile(filePath)) throw new Error(errorMessages.pathIsNotFile)

    try {
      return fs.readFileSync(filePath)
    } catch (err) {
      throw new Error(errorMessages.genericError)
    }
  }

  const createFile = (filePath, fileBuffer) => {
    //if (typeof fileBuffer !== Buffer) throw new Error(errorMessages.invalidBuffer)
    if (fileBuffer === null) throw new Error(errorMessages.invalidBuffer)

    fs.writeFileSync(filePath, fileBuffer)
  }

  const isFile = (filePath) => { 
    if (!fs.existsSync(filePath)) throw new Error(errorMessages.invalidPath)
    return fs.lstatSync(filePath).isFile() 
  }
  
  const isDirectory = (filePath) => { 
    if (!fs.existsSync(filePath)) throw new Error(errorMessages.invalidPath)
    return fs.lstatSync(filePath).isDirectory() 
  }

  const getAbosultePath = (_path) => {
    if (path.isAbsolute(_path)) return _path
    return path.resolve(getWorkingDirectory(), _path)
  }

  const getFileExtension = (filePath) => {
    if (!isFile(filePath)) return null

    return path.extname(filePath).slice(1)
  }

  const getDirName = (_path) => {
    return path.dirname(_path)
  }

  const getFileName = (_path) => {
    return path.basename(_path)
  }

  const getWorkingDirectory = () => process.cwd()

  const resolvePath = (...paths) => path.resolve(...paths)

  return {
    errorMessages,
    getFilesFromDirectory,
    readFile,
    createFile,
    isFile,
    isDirectory,
    getWorkingDirectory,
    getAbosultePath,
    createNewFolder,
    getFileExtension,
    getDirName,
    resolvePath,
    getFileName,
  }
}

module.exports.createIO = createIO