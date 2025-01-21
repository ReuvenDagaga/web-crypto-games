
import express from 'express';
import { connectWallet } from '../controllers/authController';

const router = express.Router();

router.post('/connect-wallet', connectWallet);
// router.post('/disconnect-wallet', disconnectWallet);


export default router;
