const { name, version, description } = require('../package.json')

const versions = (req, res) => {
  res.json([
    {
      version: 1,
      path: '/api/v1'
    }
  ])
}

const ping = (req, res) => {
  res.json({
    name,
    description,
    version,
    uptime: process.uptime()
  })
}

module.exports = { ping, versions }