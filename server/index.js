const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./services/passport')(app);
require('./routes/auth')(app);
require('./routes/billing')(app);
require('./services/mongoose');

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
