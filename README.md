
# pw2-cli

> An easy cli to re-scale your images to the right power of two dimensions.

## Install

```bash
npm i -g pw2-cli 
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

## Motivation
Games and real-time applications, in general, tend to prefer images and textures with power-of-two dimensions, they make it easier to generate eventual mipmaps, consume less GPU memory, and increase the overall performance.

But it's time-consuming to find the right power-of-two dimensions for that 1200x612 texture and resize it yourself, that's where pw² comes in handy.

pw2-cli uses [pw²](https://github.com/jordyhenry/pw2) to rescale your textures to the right power-of-two dimensions automatically.

This project was done for the cs50  Final Project assignment.

## License

[MIT](https://github.com/jordyhenry/pw2-cli/blob/master/LICENSE)