var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);
router.post('/', user_controller.create_user);
router.put('/:id', user_controller.update_user);
router.delete('/:id', user_controller.delete_user);

module.exports = router;
