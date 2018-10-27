const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

require('./models/User');

require('./services/bodyparser')(app);
require('./services/passport')(app);
require('./services/mongoose');

require('./routes/auth')(app);
require('./routes/billing')(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
