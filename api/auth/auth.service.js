const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)

    console.log(`auth.service - login with email: ${email}`)
    if (!email || !password) throw new Error('email and password are required!')
    
    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    //const match = await bcrypt.compare(password, user.password)
    if(password != user.password){
        return Promise.reject('Invalid email or password')
    }
    //console.log(user, password)
    //if (!match) return Promise.reject('Invalid email or password')

    delete user.password;
    return user;
}

async function signup(email, password, username) {
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({email, password: hash, username})
}

module.exports = {
    signup,
    login,
}