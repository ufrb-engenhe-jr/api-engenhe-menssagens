const express = require('express');
const routes = require('./src/routes/index');

require('./src/database/index')

class App {
    constructor() {
        this.server = express()
        this.middleware()
        this.routes()
    }

    routes() { 
        this.server.use(routes)
    }

    middleware() {
        this.server.use(express.json())
     }

}

module.exports = new App().server