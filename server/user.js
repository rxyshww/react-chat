const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')

const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', (req, res) => {
    /*User.remove({}, (err, doc) => {})*/
    const { type } = req.query
    let typeData = {}
    if (type) {
        typeData = {type}
    }
    User.find(typeData, _filter, (err, doc) => {
        return res.json({code: 0, data: doc})
    })
})
Router.get('/getmsglist', (req, res) => {
    const user = req.cookies.user
    Chat.find({}, (err, doc) => {
        if (!err) {
            return res.json({code: 0, msgs: doc})
        }
    })
})
Router.post('/update', (req, res) => {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code: 1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
    })
})
Router.post('/login', (req, res) => {
    const { user, pwd } = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
        if (!doc) {
            return res.json({code: 1, msg: '用户名和密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})
Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body
    User.findOne({user}, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }

        /*const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save((err, doc) => {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {uer, type, _id} = doc
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })*/

        User.create({user, type, pwd: md5Pwd(pwd)}, (err, doc) => {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {uer, type, _id} = doc
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
})
Router.get('/info', (req, res) => {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if(doc) {
            return res.json({code: 0, data: doc})
        } else {
            return res.json({code: 1, msg: '没找到用户'})
        }
    })
})
module.exports = Router

function md5Pwd(pwd) {
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
    return utils.md5(utils.md5(pwd + salt))
}