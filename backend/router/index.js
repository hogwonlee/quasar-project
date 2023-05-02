
'use strict'


const userController = require('../controller/user')


module.exports = {
  router: app => {
    app.post('/login', userController.login);
  }

}
