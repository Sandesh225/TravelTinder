import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllProfile
} from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/create', verifyJWT, createProfile);
router.get('/:userId', verifyJWT, getProfile);
router.get('/', verifyJWT, getAllProfile);
router.put('/', verifyJWT, updateProfile);
router.delete('/', verifyJWT, deleteProfile);

export default router;
