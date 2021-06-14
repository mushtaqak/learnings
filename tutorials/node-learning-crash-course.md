# Node Learning

## Topics

### hello world app

    - app.js => console.log('Hello World!')
    - node app
  
### module export & import

    - module.exports = { events }
    - const events = require('./events)

### events module (event emitter & events)

Useful when working with events & event listeners.

    - const EventEmitter = require('events')
    - eventEmitter = new EventEmitter()
    - eventEmitter.on('test', (data) => console.log('Test event fired', data))
    - eventEmitter.emit('test', data)

### readline module

Useful for user input manipulation.

    - const readline = require('readline')
    - r = readline.createInterface({ input: process.stdin, output: process.stdout}  )
    - r.question('Please provide your name?', (userInput)=> console.log('Your entered data: ', userInput))
    - r.close()
    - r.setAttempt('Please provide your name again?')
    - r.attempt()
    - events
      - `close`: when closing the readline.
      - `line`: when user enters data.

### filesystem module

Useful when working with files, directories & streams.

### working with files

    - const fs = requires('fs')
    - fs.writeFile('test.txt', 'hello world', (error) => error ? console.log(error) : console.log('File created'))
    - fs.readFile('test.txt', 'utf8' , (error, file) => error? console.log(error) : console.log(file))
    - fs.rename('test.txt', 'test2.txt', (error) => error ? console.log(error) : console.log('File renamed'))
    - fs.appendFile('test.txt', 'New data to be appended',  (error) => error ? console.log(error) : console.log('Data appended'))
    - fs.unlink('test.txt', (error) => error ? console.log(error) : console.log('File deleted'))

#### working with folders

    - const fs = requires('fs')
    - fs.mkdir('test', (error) => error ? console.log(error) : console.log('Folder created'))
    - fs.rmdir('test', (error) => error ? console.log(error) : console.log('Folder deleted'))
    - fs.readdir('test', (error, files) => error ? console.log(error) : console.log(files))

#### working with streams

Useful when dealing with large file
`readFile` uses Buffer - which has a fixed size. However streams do not have this limitation.
We read data in chunks using stream as opposed to readFile which loads entire file into a buffer and then reads it.
  
    - const fs = require('fs')
    - const readStream = fs.createReadStream('./test.txt', 'utf8')
    - readStream.on('data', (chunk) => console.log(chunk))
    - const writeStream = fs.createStreamStream('test2.txt')
    - writeStream.write(chunk)

#### working with pipes & pipe chaining

Helps in writing data from sourse stream to destination stream.

    - readStream.pipe(writeStream)
    - // a module used for compression
    - const zlib = require('zlib')
    - // a transform stream
    - const gzip = zlib.createGzip()
    - // updated write stream - write a compressed file
    - const writeStream = fs.createStreamStream('test2.txt.gz')
    - // take chunk data from readStream to gzip stream and then to writeStream - a chained piping 
    - readStream.pipe(gzip).pipe(writeStream)
    - // a transform stream - unzip
    - const unGzip = zlib.createGunzip()
    - // updated read & write streams
    - const readStream = fs.createReadStream('./comressed-file.txt.gz', 'utf8')
    - const writeStream = fs.createStreamStream('uncompressed.txt')
    - // read uncompress file, then un-zip it and then send to destination stream
    - readStream.pipe(gzip).pipe(writeStream) 

## Course Reference

Referenced from [Learn Node.js - Full Tutorial for Beginners](https://www.youtube.com/watch?v=RLtyhwFtXQA)

Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Learn all about Node.js in the full course for beginners.

🔗Install Node.js: https://nodejs.org/en/
🔗Install Visual Studio Code: https://code.visualstudio.com/

⭐️Course Contents ⭐️
⌨️ (0:00:00) Installing Nodejs
⌨️ (0:05:22) Working With Modules
⌨️ (0:14:40) The Events Module and EventEmitter Class
⌨️ (0:22:32) Working With The ReadLine Module.
⌨️ (0:34:36) Working With File System Module (Creating,Reading,Deleting,Renaming) Files
⌨️ (0:45:04) Working With File System Module. Creating and Deleting Folders
⌨️ (0:57:36) Working with Readable and Writable Streams
⌨️ (1:02:40) Why you should use Streams
⌨️ (1:05:41) Pipes and Pipe Chaining. (Readable,Writable and Transform Streams)
⌨️ (1:12:36) Creating a Http Server using the Http Module
⌨️ (1:17:52) Serving Static Files with Http and File System Module (html,json,image)
⌨️ (1:24:30) Create our Package.json using Npm Init
⌨️ (1:27:18) Installing Packages using Npm (Node Package Manager)
⌨️ (1:32:23) Semantic Versioning
⌨️ (1:36:42) Getting started with Express Web Framework
⌨️ (1:40:48) Working with Express Http Get Request, Route Params and Query Strings
⌨️ (1:49:52) Serving Static Files with Express
⌨️ (1:54:36) Http Post Request with Express and Body Parser Module
⌨️ (2:00:17) Working with JSON Data with Express and the Body Parser Module
⌨️ (2:07:40) User Input Validation With Express And JOI
⌨️ (2:15:24) User Input Validation with JOI Validating Nested Object and Arrays
⌨️ (2:22:34) Getting Started With EJS Templates With Express
⌨️ (2:35:22) How does MiddleWare Work and Creating Custom Middleware
⌨️ (2:42:49) Working With The Express Router
