const logger = require('../../services/logger.service');
const postService = require('./post.service');
//const reviewService = require('./post.service')

// TODO: needs error handling! try, catch

async function getPosts(req, res) {
    try {
        const posts = await postService.query(req.query)
        res.send(posts)
    } catch (err) {
        logger.error('Cannot get reviews', err);
        res.status(500).send({ error: 'cannot get reviews' })

    }
}

async function getPost(req, res) {
    const post = await postService.getById(req.params.id)
    res.send(post)
}

async function deletePost(req, res) {
    try {
        await postService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete post', err);
        res.status(500).send({ error: 'cannot delete post' })
    }
}

async function addPost(req, res) {
    //console.log('addPost backend controller', req.body)
    try {
        const addedPost = await postService.add(req.body)
        res.json(addedPost)
    } catch (err) {
        logger.error('Cannot add post', err);
        res.status(500).send({ error: 'cannot add post' })
    }
}

async function updatePost(req, res) {
    const post = req.body;
    console.log('upadate post controlleer', post)
    await postService.update(post)
    res.send(post)
}

module.exports = {
    getPosts,
    deletePost,
    addPost,
    getPost,
    updatePost
}