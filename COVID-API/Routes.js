//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

//Import Covid Controller
var Controller = require('./Controller');

// Covid routes
router.route('/covid')
    .get(Controller.index)
    .post(Controller.add);
    
router.route('/covid/:covid_id')
    .get(Controller.view)
    .patch(Controller.update)
    .put(Controller.update)
    .delete(Controller.delete);

//Export API routes
module.exports = router;