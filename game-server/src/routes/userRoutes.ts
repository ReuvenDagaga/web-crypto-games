import express from 'express';
import { createUser, getUserDetails } from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUserDetails);

export default router;
