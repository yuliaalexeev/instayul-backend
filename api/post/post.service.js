
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    console.log('criteria:', criteria);
    const collection = await dbService.getCollection('post')
    try {
        const posts = await collection.find(criteria).toArray();
        // posts.forEach(post => delete post.password);
        // setTimeout(() => posts, 2000)
        return posts
    } catch (err) {
        console.log('ERROR: cannot find posts')
        throw err;
    }
}

async function getById(postId) {
    //console.log('get post id from server', postId)
    const collection = await dbService.getCollection('post')
    try {
        const post = await collection.findOne({ '_id': ObjectId(postId) })
        return post
 
    } catch (err) {
        console.log(`ERROR: while finding post ${postId}`)
        throw err; 
    }
}

async function remove(postId) {
    console.log('deleting post service', postId)

    const collection = await dbService.getCollection('post')
    try {
        await collection.deleteOne({ "_id": ObjectId(postId) })
    } catch (err) {
        console.log(`ERROR: cannot remove post ${postId}`)
        throw err;
    }
}


async function add(post) {
    //postId.byUserId = ObjectId(postId.byUserId);
    post.by._id = ObjectId(post.by._id);
    console.log('add post serive', post)
    const collection = await dbService.getCollection('post')
    try {
        await collection.insertOne(post);
        return post;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function update(post) {
    console.log('upadate post service', post)
    const collection = await dbService.getCollection('post')
    post._id = ObjectId(post._id);
    post.by._id = ObjectId(post.by._id);

    try {
        await collection.updateOne({ _id: post._id }, { $set: post })
        return post
    } catch (err) {
        console.log(`ERROR: cannot update post ${post._id}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy['by._id']) {
        criteria['by._id'] = ObjectId(filterBy['by._id']);
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}


