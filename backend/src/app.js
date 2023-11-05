const express = require('express');
const app = express();

app.use(express.json());

// Define routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/emails', require('./routes/email.routes'));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
