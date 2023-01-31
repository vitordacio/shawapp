const express = require('express')
const { getUsers, getUserDetails, getUserRepos } = require('./controllers')

const routes = express()


routes.get('/api/users', getUsers)
routes.get('/api/users/:username/details', getUserDetails)
routes.get('/api/users/:username/repos', getUserRepos)

module.exports = routes