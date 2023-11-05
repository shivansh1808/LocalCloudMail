const pool = require('../config/db.config');

class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    // Add other user properties if necessary
  }

  static create(newUser, result) {
    pool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [newUser.email, newUser.password],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { id: queryResult.insertId, ...newUser });
      }
    );
  }

  static findByEmail(email, result) {
    pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, queryResult) => {
        if (err) {
          result(err, null);
          return;
        }
        if (queryResult.length) {
          result(null, queryResult[0]);
          return;
        }
        result({ kind: "not_found" }, null);
      }
    );
  }

  // Additional methods like update, delete can be added here
}

module.exports = User;
