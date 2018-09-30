const app = require('express')();
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./services/passport');
require('./routes/auth')(app);

mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true
  }
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
