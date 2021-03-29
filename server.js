const { createServer } = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;

require('dotenv').config()

const app = express()
const dev = app.get('env') !== 'production'

if (!dev) {
    app.disable('x-powered-by')
    app.use(compression())
    app.use(morgan('common'))

    app.use(express.static(path.resolve(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

if (dev) {
    console.log("dev")
    app.use(morgan('dev'))

    app.use(express.static(path.resolve(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

const server = createServer(app)

server.listen(PORT, err => {
    if (err) throw err;

    console.log("Server listening")
})