const path = require('path')
const fs = require('fs')
const http = require('http')


let server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    let contentType = getContentType(filePath) || 'text/html'
    let emptyPage = path.join(__dirname, 'public', '404.html')
    fs.readFile(filePath, 'utf8', (err, content) => {
        if(err) {
            if(err.code === 'ENOENT'){
                fs.readFile(emptyPage, 'utf8', (err, content) => {
                    res.writeHead(200, {'Content-Type' : contentType})
                    res.end(content)
                })

            } else {
                res.writeHead(500)
                res.end('a server has error has occured')
            }
        }
        if(!err){
            res.writeHead(200, {'Content-Type' : contentType})
            res.end(content)
        }
    } )

})

let getContentType = (filePath) => {
    let extname = path.extname(filePath)
    if(extname === '.js') {
        return 'text/javascript'
    }
    if(extname === '.css') {
        return 'text/css'
    }
    if(extname === '.png') {
        return 'image/png'
    }
    if(extname === '.jpg') {
        return 'image/jpg'
    }
}

let port = 3002

server.listen(port, () => {
    console.log(`the server ${port}  is poopin`)
})