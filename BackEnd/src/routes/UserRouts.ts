
import express from 'express';
import { signup, login, getProfile, updateProfile , uploadProfilePic} from '../controller/UserController';
import auth from '../middleware/auth';
import upload from '../middleware/upload';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/profile/upload',auth,upload.single('profilePic'),uploadProfilePic)


export default router;  

