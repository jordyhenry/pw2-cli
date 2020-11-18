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

  const Directory = {
    getNewFolderName () {
      const d = new Date()
      return `pw2_${d.toLocaleString().split(':').join('').split('-').join('').split(' ').join('_')}`
    },
  
    createNewFolder (baseDir) {
      const newFolder = Path.resolvePath(baseDir, this.getNewFolderName())
      fs.mkdirSync(newFolder)
  
      return newFolder
    },

    isDirectory (filePath) { 
      if (!fs.existsSync(filePath)) throw new Error(errorMessages.invalidPath)
      return fs.lstatSync(filePath).isDirectory() 
    },

    getDirName (_path) { 
      return path.dirname(_path) 
    },

    getWorkingDirectory () {
      return process.cwd()
    }
  }

  const File = {
    getFilesFromDirectory (dirPath) {
      if (!fs.existsSync(dirPath)) throw new Error(errorMessages.invalidPath)
  
      return fs.readdirSync(dirPath)
                .map(filePath => Path.resolvePath(dirPath, filePath))
                .filter(fullFilePath => this.isFile(fullFilePath))
    },
  
    readFile (filePath) {
      if (!fs.existsSync(filePath)) throw new Error(errorMessages.invalidPath)
      if (!this.isFile(filePath)) throw new Error(errorMessages.pathIsNotFile)
  
      try {
        return fs.readFileSync(filePath)
      } catch (err) {
        throw new Error(errorMessages.genericError)
      }
    },
  
    createFile (filePath, fileBuffer) {
      if (!Buffer.isBuffer(fileBuffer)) throw new Error(errorMessages.invalidBuffer)
      if (fileBuffer === null) throw new Error(errorMessages.invalidBuffer)
  
      fs.writeFileSync(filePath, fileBuffer)
    },
  
    isFile (filePath) { 
      if (!fs.existsSync(filePath)) throw new Error(errorMessages.invalidPath)
      return fs.lstatSync(filePath).isFile() 
    },
    
    getFileExtension (filePath) {
      if (!this.isFile(filePath)) return null
  
      return path.extname(filePath).slice(1)
    },
  
    getFileName (_path) {
      return path.basename(_path)
    },
  }

  const Path = {
    getAbosultePath (_path) {
      if (path.isAbsolute(_path)) return _path
      return this.resolvePath(Directory.getWorkingDirectory(), _path)
    },
  
    resolvePath (...paths) {
      return path.resolve(...paths)
    } 
  }

  return {
    errorMessages,
    Directory,
    File,
    Path
  }
}

module.exports.createIO = createIO
