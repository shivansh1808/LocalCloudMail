const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  let newUser = new User({
    email: req.body.email,
    password: hashedPassword
  });

  User.create(newUser, (err, user) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.'
      });
    } else {
      res.send(user);
    }
  });
};

exports.login = (req, res) => {
  User.findByEmail(req.body.email, async (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with email ${req.body.email}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with email ${req.body.email}.`
        });
      }
    } else {
      const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, 'fce7ac48aba4459d3e39e21b0b232deac24e8dd37ae1ee5dcaa7444316abd6eff04d6bcdaddde1177639eedbccacda029460cd431408628cb3e4beb0f9c92d90', {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token
      });
    }
  });
};

// Additional controller methods can be added here
