/* eslint-disable */
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

// Routes

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;
module.exports = {
  register: function(req, res) {
    
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;

    if (email == null || username == null || password == null ) {
      return res.status(400).json({'error': 'missing parameters' });
    }

    if (username.length >= 8 || username.length <= 5) {
      return res.status(400).json({ 'error': 'wrong username must be min 4 and max 8 length' })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email not valid'})
    }
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'password not valide - should be between 4 and 12 character and should have 1 numeric digit' })
    }
    models.User.findOne({
      attributes: ['email'],
      where: {email: email }
    })
    .then(function(userFound) {
      if(!userFound) {

          bcrypt.hash(password, 5, function( err, brcryptedPassword ) {
            const newUser = models.User.create({
              email: email,
              username: username,
              password: brcryptedPassword,
              bio: bio,
              isAdmin: 0,
            })
            .then(function(newUser){
              return res.status(201).json({
                  'id': newUser.id
              })
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot add user', err});
            });
          });
      } else {
          return res.status(409).json({ 'error': 'user alredy exist'});
      }

    })
    .catch(function(err){
    return res.status(500).json({ 'error': 'unable to verify user', err});
    });
  },
  login: function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null ){
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    models.User.findOne({
      where: {email: email}
    })
    .then(function(userFound) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function(errBycript, resBycript ) {
          if (resBycript) {
            return res.status(200).json({
              'userId': userFound.id,
              'token': jwtUtils.generateTokenForUser(userFound)
            });
          } else {
            return res.status(403).json({ "error": "invalid password" })
          }
        })
      } else {
        return res.status(404).json( { 'error': 'user not exist in db'})
      }
    })
    .catch(function(err) {
      return res.status(500).json({ 'error': 'unable to verify user' });
    });
  },
  getUserProfile: function(req, res) {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong Token' })
    
    models.User.findOne({
      attributes: [ 'id', 'email', 'username', 'bio' ],
      where: {id: userId },
    }).then(function(user) {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ 'error': 'user not found'})
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'cannot fetch user'})
    });
  }
};
