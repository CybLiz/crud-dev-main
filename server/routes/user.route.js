const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Register a new user
router.post('/register', userController.createUser);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.editUser);


// get all users
router.get('/users', userController.getUsers);

module.exports = router;