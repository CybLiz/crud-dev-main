const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Register a new user
router.post('/register', userController.createUser);

// Delete a user
router.delete('/user/:id', userController.deleteUser);

// update a user
router.put('/user/:id', userController.editUser);


// get all users
router.get('/users', userController.getUsers);

router.get('/oneuser/:id', userController.getOneUser);

module.exports = router;