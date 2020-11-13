const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const path = require('path')
const { createPw2, RESIZING_MODES } = require('pw2')
const { config } = require('./utils/config')

const pw2 = createPw2()

// arguments, parseFiles, parseFilter, parseResizingMode
const getParameters = () => {
  if (argv['v']) {
    console.log('version')
    process.exit()
  }

  if (argv['h']) {
    console.log('help message')
    process.exit()
  }

  const inputParam = argv['i'] || ''
  const filterParam = argv['f'] || 'png,jpg,jpeg'
  const modeParam = argv['m'] || 'near'
  
  return {
    files: getFileListToResize(inputParam),
    extensionsToFilter: getFilterExtensions(filterParam),
    mode: getResizingMode(modeParam),
  }
}

// resizingmode parameter
const getResizingMode = (methodParam) => {
  if (methodParam === 'near') return RESIZING_MODES.NEAREST_PW2
  if (methodParam === 'prev') return RESIZING_MODES.PREVIOW_PW2
  if (methodParam === 'next') return RESIZING_MODES.NEXT_PW2
  
  return RESIZING_MODES.NEAREST_PW2
}

// filter parameter, supported extensions
const getFilterExtensions = (filterParam) => {
  const filtersFromParams = filterParam.split(',')
  const filteredFilters = filtersFromParams.filter(filter => config.supported_extensions.includes(filter))

  if (filteredFilters.length <= 0) return config.supported_extensions
  return filteredFilters
}

// input parameter, working path, getfilesFromDirectory
const getFileListToResize = (inputParam) => {
  const inputPath = path.resolve(process.cwd(), inputParam)
  if (!fs.existsSync(inputPath)) return []

  const inputPathStats = fs.lstatSync(inputPath)

  if (inputPathStats.isFile()) return [inputPath]
  if (!inputPathStats.isDirectory()) return []

  return getFilesFromDirectory(inputPath)
}

// directory path
const getFilesFromDirectory = (dirPath) => {
  return fs.readdirSync(dirPath)
            .map(filePath => path.resolve(dirPath, filePath))
            .filter(fullFilePath => fs.lstatSync(fullFilePath).isFile())
}

const getNewFolderName = () => {
  const d = new Date()
  return `pw2_${d.toLocaleString().split(':').join('').split('-').join('').split(' ').join('_')}`
}

// baseDir, getfoldername
const createNewFolder = (baseDir) => {
  const newFolder = path.resolve(baseDir, getNewFolderName())
  fs.mkdirSync(newFolder)

  return newFolder
}

// files to resize list, resizing mode, readfile, createfile
const resizeFiles = async (fileList, resizingMode) => {
  const baseDir = path.dirname(fileList[0])
  const newFolderPath = createNewFolder(baseDir)
  
  fileList.forEach(async (file) => {
    // readfile
    const fileBuffer = fs.readFileSync(file)
    const resizedFileBuffer = await pw2.resizeAndGetBuffer(fileBuffer, resizingMode)
    
    const filename = path.basename(file)
    const newFilePath = path.resolve(newFolderPath, filename)
    // create file
    fs.writeFileSync(newFilePath, resizedFileBuffer)
  })
  
  return newFolderPath
}

// filelist, extensions to filter
const getFilesToResize = (files, extensionsToFilter) => {
  return files.filter(file => {
    const fileExtension = path.extname(file).slice(1)
    return extensionsToFilter.includes(fileExtension)
  })
}

const main = async () => {
  const { files, mode, extensionsToFilter } = getParameters()
  const filesToResize = getFilesToResize(files, extensionsToFilter)

  if (filesToResize.length <= 0) {
    console.log('None files to resize!')
    return
  }
  
  const resizedFilesFolder = await resizeFiles(filesToResize, mode)
  console.log(`New files create at :${resizedFilesFolder}`)
}

main ()

