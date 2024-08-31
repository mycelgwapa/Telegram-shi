const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database('my_database.db', (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('LOADING DATABASE...⏳');
        this.createTable();
      }
    });
  }

  createTable() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        username TEXT
      )
    `);
  }

  insertUser(user_id, username) {
    this.db.run('INSERT INTO users (user_id, username) VALUES (?, ?)', [user_id, username], (err) => {
      if (err) {
        console.error('Error inserting user:', err.message);
      } else {
        console.log('User inserted successfully');
      }
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Closed the database connection');
      }
    });
  }
}

module.exports = Database;