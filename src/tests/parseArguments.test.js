const { createIO } = require('../io')
const { createParseArguments } = require('../parseArguments')
const { config } = require('../utils/config')
const { RESIZING_MODES } = require('pw2')
const { parse } = require('args')

const io = createIO()
const parseArguments = createParseArguments(io)

test('Test parseFilterParameter', () => {
  const supportedExtensionsParam = config.supported_extensions.join(',')
  
  expect(parseArguments.parseFilterParameter(supportedExtensionsParam).sort()).toEqual(config.supported_extensions.sort())
  expect(parseArguments.parseFilterParameter('').sort()).toEqual(config.supported_extensions.sort())
  expect(parseArguments.parseFilterParameter().sort()).toEqual(config.supported_extensions.sort())
  expect(parseArguments.parseFilterParameter('png,jpeg,jpg').sort()).toEqual(config.supported_extensions.sort())
  expect(parseArguments.parseFilterParameter('png,jpg').sort()).toEqual(['png', 'jpg'].sort())
  expect(parseArguments.parseFilterParameter('jpeg,jpg').sort()).toEqual(['jpg', 'jpeg'].sort())
})

test('Test parseModeParameter', () => {
  expect(parseArguments.parseModeParameter('near')).toBe(RESIZING_MODES.NEAREST_PW2)
  expect(parseArguments.parseModeParameter('prev')).toBe(RESIZING_MODES.PREVIOW_PW2)
  expect(parseArguments.parseModeParameter('next')).toBe(RESIZING_MODES.NEXT_PW2)
  
  expect(parseArguments.parseModeParameter('')).toBe(RESIZING_MODES.NEAREST_PW2)
  expect(parseArguments.parseModeParameter()).toBe(RESIZING_MODES.NEAREST_PW2)
})

test('Test parseInputParameter', () => {
  const relativePath = './package.json'
  const absolutePath = io.getAbosultePath(relativePath)

  expect(parseArguments.parseInputParameter()).toBe(io.getWorkingDirectory())
  expect(parseArguments.parseInputParameter('')).toBe(io.getWorkingDirectory())
  expect(parseArguments.parseInputParameter(relativePath)).toBe(io.getAbosultePath(relativePath))
  expect(parseArguments.parseInputParameter(absolutePath)).toBe(absolutePath)
})

test('Test parse function', () => {
  // We need two empty string at the begging as they simulate the paths from process.argv
  let argv = ['', '', '-f', 'jpg', '-i', 'package.json', '-m',  'prev']
  expect(parseArguments.parse(argv)).toHaveProperty('filter', ['jpg'])
  expect(parseArguments.parse(argv)).toHaveProperty('mode', RESIZING_MODES.PREVIOW_PW2)
  expect(parseArguments.parse(argv)).toHaveProperty('input', io.getAbosultePath('package.json'))
  
  argv = ['', '']
  expect(parseArguments.parse(argv)).toHaveProperty('filter', config.supported_extensions)
  expect(parseArguments.parse(argv)).toHaveProperty('mode', RESIZING_MODES.NEAREST_PW2)
  expect(parseArguments.parse(argv)).toHaveProperty('input', io.getWorkingDirectory())
  
  argv = ['', '', '-f', 'jpg,png', '-i', 'src', '-m',  'next']
  expect(parseArguments.parse(argv)).toHaveProperty('filter', ['jpg', 'png'])
  expect(parseArguments.parse(argv)).toHaveProperty('mode', RESIZING_MODES.NEXT_PW2)
  expect(parseArguments.parse(argv)).toHaveProperty('input', io.getAbosultePath('src'))
  
  argv = ['', '', '-f', 'jpeg,mp4', '-i', io.getWorkingDirectory(), '-m',  'near']
  expect(parseArguments.parse(argv)).toHaveProperty('filter', ['jpeg'])
  expect(parseArguments.parse(argv)).toHaveProperty('mode', RESIZING_MODES.NEAREST_PW2)
  expect(parseArguments.parse(argv)).toHaveProperty('input', io.getWorkingDirectory())
})