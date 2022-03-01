const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/users');
const route = express.Router();

route.post('/', async(req, resp) => {
    const {firstName, lastName, empNo, desig} = req.body;
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.empNo = empNo;
    user.desig = desig;
    let userModel = new User(user);
    await userModel.save();
    resp.json(userModel);
});

route.get('/getUser', (req, resp) => {
        User.find({})
        .exec(function(err, users) {
            if (err) {
                alert(err);
            } else {
                resp.json(users);
                console.log(users)
            }
        })
})

route.get('/getUser/:id', (req, resp) => {
        User.findById(req.params.id)
        .exec(function(err, users) {
            if (err) {
                alert(err);
            } else {
                resp.json(users);
                console.log(users)
            }
        })
})
route.put('/updateUser/:id', (req, resp) => {
    User.findOne({_id: req.params.id}, function(err, user) {
            if (err) {
                console.log(err);
                resp.status(500).send();
            } else {
                if (!user) {
                    resp.status(404).send();
                } else {
                const {firstName, lastName, empNo, desig} = req.body;
                user.firstName = firstName;
                user.lastName = lastName;
                user.empNo = empNo;
                user.desig = desig;
                user.save(function(err, updateObj) {
                    if (err) {
                        console.log(err);
                        resp.status(500).send();
                    } else {
                        resp.json(updateObj);
                    }
                });
            }
                console.log(user);
            }
        })
})
route.delete('/deleteUser/:id', (req, resp) => {
    User.findOneAndRemove({_id: req.params.id}, function(err, user) {
            if (err) {
                console.log(err);
                resp.status(500).send();
            } else {
               resp.status(200)
               User.find({})
               .exec(function(err, users) {
                   if (err) {
                       alert(err);
                   } else {
                       resp.json(users);
                       console.log(users)
                   }
               })
            }
        })
})
module.exports = route;