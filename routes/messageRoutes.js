import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';


const router = express.Router();


router.route('/send/:Id').post(isAuthenticated,sendMessage);
router.route('/:Id').get(isAuthenticated,getMessage)


export default router