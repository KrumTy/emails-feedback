const app = require('express')();
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
const PORT = process.env.PORT || 5000;
require('./models/User');

mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true
  }
);

require('./services/passport');
require('./routes/auth')(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
