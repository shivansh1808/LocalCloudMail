const pool = require('../config/db.config');

class Email {
  constructor(email) {
    this.id = email.id;
    this.senderId = email.senderId;
    this.receiverId = email.receiverId;
    this.subject = email.subject;
    this.message = email.message;
    this.timestamp = email.timestamp;
  }

  static sendEmail(newEmail, result) {
    pool.execute(
      'INSERT INTO emails (id, senderId, receiverId, subject, message, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
      [newEmail.id, newEmail.senderId, newEmail.receiverId, newEmail.subject, newEmail.message, newEmail.timestamp],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { id: newEmail.id, ...newEmail });
      }
    );
  }

  static getEmailsByUserId(userId, result) {
    pool.execute(
      'SELECT * FROM emails WHERE receiverId = ? ORDER BY timestamp DESC',
      [userId],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, queryResult);
      }
    );
  }

  // Additional methods like delete, get sent emails can be added here
}

module.exports = Email;
