const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./models/Survey');

require('./services/bodyparser')(app);
require('./services/passport')(app);
require('./services/mongoose');

require('./routes/auth')(app);
require('./routes/billing')(app);
require('./routes/surveys')(app);
require('./routes/productionAssets')(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
