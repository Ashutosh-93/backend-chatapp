import express from 'express';
import {register,logIn,logOut,getOtherUsers} from '../controllers/userController.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
const router = express.Router();



router.route('/register').post(register);
router.route('/logIn').post(logIn);
router.route('/logOut').post(logOut);
router.route('/').post(isAuthenticated,getOtherUsers);


export default router;



