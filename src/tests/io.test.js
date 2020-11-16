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
  expect(io.readFile(packageJsonPath)).not.toBe(null)
  
  expect(() => { io.readFile(directoryPath) }).toThrow(io.errorMessages.pathIsNotFile)
  expect(() => { io.readFile(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.readFile() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.readFile(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.readFile({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test isFile method', () => {
  expect(io.isFile(packageJsonPath)).toBe(true)
  expect(io.isFile(directoryPath)).toBe(false)
  
  expect(() => { io.isFile(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.isFile() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.isFile(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.isFile({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test isDirectory method', () => {
  expect(io.isDirectory(packageJsonPath)).toBe(false)
  expect(io.isDirectory(directoryPath)).toBe(true)
  
  expect(() => { io.isDirectory(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.isDirectory() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.isDirectory(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.isDirectory({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test getFilesFromDirectory method', () => {
  // Sorting arrays because 'toEqual' takes the items order in consideration
  expect(io.getFilesFromDirectory(directoryPath).sort()).toEqual(filesInDirectory.sort())

  expect(() => { io.getFilesFromDirectory(errFilePath) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.getFilesFromDirectory() }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.getFilesFromDirectory(5) }).toThrow(io.errorMessages.invalidPath)
  expect(() => { io.getFilesFromDirectory({}) }).toThrow(io.errorMessages.invalidPath)
})

test('Test createFileMethod', () => {
  expect(() => { io.createFile(newFilePath, null) }).toThrow(io.errorMessages.invalidBuffer)
  expect(() => { io.createFile(newFilePath, 5) }).toThrow(io.errorMessages.invalidBuffer)
  expect(() => { io.createFile(newFilePath, 'buffer') }).toThrow(io.errorMessages.invalidBuffer)
})