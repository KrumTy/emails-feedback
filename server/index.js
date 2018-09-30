const app = require('express')();
const PORT = process.env.PORT || 5000;

require('./services/passport');
require('./routes/auth')(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
