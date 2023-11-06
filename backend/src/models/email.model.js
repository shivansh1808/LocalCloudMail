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
  static getEmailById(emailId, result) {
    pool.execute(
      'SELECT * FROM emails WHERE id = ?',
      [emailId],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, queryResult[0]);
      }
    );
  }
  static moveEmailToFolder(emailId, folder, result) {
    pool.execute(
      'UPDATE emails SET folder = ? WHERE id = ?',
      [folder, emailId],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, queryResult);
      }
    );
  }
  
  static getEmailsByFolder(userId, folder, result) {
    pool.execute(
      'SELECT * FROM emails WHERE receiverId = ? AND folder = ? ORDER BY timestamp DESC',
      [userId, folder],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, queryResult);
      }
    );
  }
  static deleteEmail(emailId, result) {
    pool.execute(
      'DELETE FROM emails WHERE id = ?',
      [emailId],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, queryResult);
      }
    );
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

  static searchEmails(keyword, userId, result) {
    pool.execute(
      'SELECT * FROM emails WHERE MATCH(subject,body,senderEmail) AGAINST(? IN NATURAL LANGUAGE MODE) AND receiverId = ?',
      [keyword, userId],
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
