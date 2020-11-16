const args = require('args')
const { RESIZING_MODES } = require('pw2')
const { config } = require('./utils/config')

const createParseArguments = (io) => {
  const parseModeParameter = (methodParam) => {
    if (methodParam === config.supported_modes.near) return RESIZING_MODES.NEAREST_PW2
    if (methodParam === config.supported_modes.prev) return RESIZING_MODES.PREVIOW_PW2
    if (methodParam === config.supported_modes.next) return RESIZING_MODES.NEXT_PW2
    
    return RESIZING_MODES.NEAREST_PW2
  }

  const parseFilterParameter = (filterParam) => {
    if (!filterParam) return config.supported_extensions

    const filtersFromParams = filterParam.split(',')
    const filteredFilters = filtersFromParams.filter(filter => config.supported_extensions.includes(filter))

    if (filteredFilters.length <= 0) return config.supported_extensions
    return filteredFilters
  }

  const parseInputParameter = (inputParam) => {
    if (!inputParam) return io.getWorkingDirectory()
    const absolutePath = io.getAbosultePath(inputParam)
    
    if (io.isFile(absolutePath) || io.isDirectory(absolutePath)) return absolutePath
    return io.getWorkingDirectory()
  }

  const parse = (argv = process.argv) => {
    args.options([
      {
        name: 'mode',
        description: 'Resizing mode to be used (near, prev, next)',
        defaultValue: config.supported_modes.near,
        init: (modeParam) => parseModeParameter(modeParam),
      },
      {
        name: 'filter',
        description: 'File extensions to filter',
        defaultValue: config.supported_extensions.join(','),
        init: (filterParam) => parseFilterParameter(filterParam),
      },
      {
        name: 'input',
        description: 'Input file or directory with files to resize, if the path is a directory it will filter all files using the filter option',
        defaultValue: io.getWorkingDirectory(),
        init: (inputParam) => parseInputParameter(inputParam),
      },
    ])
  
    const parsedArguments = args.parse(argv)
    return {
      filter: parsedArguments.filter,
      input: parsedArguments.input,
      mode: parsedArguments.mode,
    }
  }

  return {
    parseFilterParameter,
    parseModeParameter,
    parseInputParameter,
    parse,
  }
}

module.exports.createParseArguments = createParseArguments
