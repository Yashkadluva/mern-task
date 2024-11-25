import express from "express";
import { validateToken } from "./utility/validateToken";
import { userLogin, userSignup, createReview, updateReview, deleteReview, reviewList } from "./controller/onboarding";
const router = express.Router();
router.post('/login', userLogin);
router.post('/signup', userSignup);
router.post('/create/review', validateToken, createReview);
router.put('/update/review', validateToken, updateReview);
router.delete('/delete/review/:id', validateToken, deleteReview);
router.get('/get/review/list', validateToken, reviewList);

export default router;