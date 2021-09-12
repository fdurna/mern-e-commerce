import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
//import {protect} from '../middleware/authMiddleware.js'

import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

router.route('/').post(registerUser)
router.post('/login', authUser)
//router.route('/profile').get(protect,getUserProfile)
router.put('/profile', asyncHandler(async(req,res)=> {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            const user = await User.findById(req.user._id)
            if (user) {

                user.name = req.body.name || user.name
                user.email = req.body.email || user.email
                
                if(req.body.password) {
                    user.password = req.body.password
                }

                const updateUser = await user.save()

                res.json({
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    isAdmin: updateUser.isAdmin,
                    token: generateToken(updateUser._id)
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