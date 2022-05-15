const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/js/api/server.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})
