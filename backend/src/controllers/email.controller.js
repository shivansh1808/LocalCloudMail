const Email = require('../models/email.model');
const uuid = require('uuid');
// const emailController = require('./email.controller.js');
// router.post('/path', emailController.someHandlerFunction);

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
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while sending the email."
      });
    } else {
      res.send(data);
    }
  });
};

exports.getEmail = (req, res) => {
  Email.getEmailById(req.params.emailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Email with id ${req.params.emailId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Email with id " + req.params.emailId
        });
      }
    } else res.send(data);
  });
};
exports.moveEmailToFolder = (req, res) => {
  Email.moveEmailToFolder(req.params.emailId, req.body.folder, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error moving Email to folder on id " + req.params.emailId
      });
    } else res.send({ message: `Email moved to ${req.body.folder} successfully!` });
  });
};

exports.getEmailsByFolder = (req, res) => {
  Email.getEmailsByFolder(req.params.userId, req.params.folder, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving emails from folder " + req.params.folder
      });
    } else res.send(data);
  });
};
exports.deleteEmail = (req, res) => {
  Email.deleteEmail(req.params.emailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Email with id ${req.params.emailId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Email with id " + req.params.emailId
        });
      }
    } else res.send({ message: `Email was deleted successfully!` });
  });
};

exports.searchEmails = (req, res) => {
  Email.searchEmails(req.query.keyword, req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error searching emails for user with id " + req.params.userId
      });
    } else res.send(data);
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
