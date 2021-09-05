import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
//import {protect} from '../middleware/authMiddleware.js'

import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
//router.route('/profile').get(protect,getUserProfile)
router.get('/profile', asyncHandler(async (req, res)=> {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            const user = await User.findById(req.user._id)
            if (user) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                })
            } else {
                res.status(404)
                throw new Error('User not found')
            }
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized,token failed')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

}))

export default router;