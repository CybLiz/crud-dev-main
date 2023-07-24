const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Register a new user
router.post('/register', userController.createUser);
router.post('/register', userController.createUser);
router.post('/register', userController.createUser);



// get all users
router.get('/all', userController.getALLUsers);


module.exports = router;
