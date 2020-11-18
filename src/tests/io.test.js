const path = require('path')
const { createIO } = require('../io')
const io = createIO()

const directoryPath = process.cwd()
const packageJsonPath = path.resolve(directoryPath, 'package.json')
const errFilePath = path.resolve(directoryPath, 'package.err')
const newFilePath = path.resolve(directoryPath, 'newfile.txt')
const filesInDirectory = [
  path.resolve(directoryPath, '.gitignore'),
  path.resolve(directoryPath, 'package.json'),
  path.resolve(directoryPath, 'package-lock.json'),
]

test('Test readFile scenarios', () => {
  expect(io.File.readFile(packageJsonPath)).not.toBe(null)
  
  expect(() => { io.File.readFile(directoryPath) }).toThrow(io.errorMessages.pathIsNotFile)
  expect(() => { io.File.readFile(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.readFile() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.readFile(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.readFile({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test isFile method', () => {
  expect(io.File.isFile(packageJsonPath)).toBe(true)
  expect(io.File.isFile(directoryPath)).toBe(false)
  
  expect(() => { io.File.isFile(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.isFile() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.isFile(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.isFile({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test isDirectory method', () => {
  expect(io.Directory.isDirectory(packageJsonPath)).toBe(false)
  expect(io.Directory.isDirectory(directoryPath)).toBe(true)
  
  expect(() => { io.Directory.isDirectory(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.Directory.isDirectory() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.Directory.isDirectory(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.Directory.isDirectory({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test getFilesFromDirectory method', () => {
  // Sorting arrays because 'toEqual' takes the items order in consideration
  expect(io.File.getFilesFromDirectory(directoryPath).sort()).toEqual(filesInDirectory.sort())

  expect(() => { io.File.getFilesFromDirectory(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.getFilesFromDirectory() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.getFilesFromDirectory(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.File.getFilesFromDirectory({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test createFileMethod', () => {
  expect(() => { io.File.createFile(newFilePath, null) }).toThrow(io.errorMessages.invalidBuffer)
  expect(() => { io.File.createFile(newFilePath, 5) }).toThrow(io.errorMessages.invalidBuffer)
  expect(() => { io.File.createFile(newFilePath, 'buffer') }).toThrow(io.errorMessages.invalidBuffer)
})