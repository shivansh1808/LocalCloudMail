const Email = require('../models/email.model');
const uuid = require('uuid');

exports.sendEmail = (req, res) => {
  const newEmail = new Email({
    id: uuid.v4(),
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    subject: req.body.subject,
    message: req.body.message,
    timestamp: new Date()
  });

  Email.sendEmail(newEmail, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while sending the email."
      });
    else res.send(data);
  });
};

exports.getInbox = (req, res) => {
  Email.getEmailsByUserId(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Error retrieving inbox for user with id " + req.params.userId
      });
    else res.send(data);
  });
};

// Additional endpoints like deleteEmail, getSentEmails can be implemented here
