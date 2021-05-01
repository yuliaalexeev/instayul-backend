const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getPost, getPosts, deletePost, addPost, updatePost} = require('./post.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router