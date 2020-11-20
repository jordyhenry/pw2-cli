# PW² CLI

<p align="center">
  <img src="./demo.png" width="500"/>
</p>

<p align="center">A command line interface that easily allows you to re-scale your images to the right power of two dimensions.</p>

## Install

```bash
npm i -g pw2-cli 
```

## Usage
```bash
# will resize all .png images inside the path using the previous-pw2 resizing mode
./pw2-cli -f png -i ./my-images-path -m prev

# will resize the image.jpg file using the next-pw2 resizing mode
./pw2-cli -i ./my-folder/image.jpg -m next  

# will resize all .jpg, .jpeg and .png files inside the current directory using the nearest-pw2 resizing mode
./pw2-cli
```

## Supported Commands and Arguments
```bash
Commands:
    help     Display help
    version  Display version

  Options:
    -f, --filter [value]  File extensions to filter (defaults to "png,jpg,jpeg")
    -h, --help            Output usage information
    -i, --input [value]   Input file or directory with files to resize, if the path is a directory it will filter all files using the filter option (defaults to process.cwd())
    -m, --mode [value]    Resizing mode to be used (near, prev, next) (defaults to "near")
    -v, --version         Output the version number
```

## But Why ?

Games and real-time applications, in general, tend to prefer images and textures with power-of-two dimensions, because they make it easier to generate mipmaps, consume less GPU memory, and increase the overall performance for shader operations.

However, finding the right power-of-two values for each dimension of each texture of each model in your application sounds time-consuming, and it is. [⚡PW²](https://www.npmjs.com/package/pw2) born from the necessity to make this a no-brainer, quick and easy process.

This application was developed for the cs50 Final Project assignment and as a use case of [⚡PW²](https://www.npmjs.com/package/pw2) library.

## License

[MIT](https://github.com/jordyhenry/pw2-cli/blob/master/LICENSE)

## TODO
- Update the project to use typescript
- Fix any English misspells (sorry guys, it's not my first language  🤷‍♂️)