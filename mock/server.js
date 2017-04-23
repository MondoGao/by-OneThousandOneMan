const path = require('path')
const url = require('url')
const jsonServer = require('json-server')
const express = require('express')
const server = jsonServer.create()
const db = require(path.resolve(__dirname, 'db.json'))
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(express.static(path.resolve(__dirname, 'public')))
server.use(router)

server.listen(8081, err => {
  console.log('Starting mock server')
})

module.exports = server