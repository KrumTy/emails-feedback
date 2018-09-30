const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('get/');
  res.send({
    test: true
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
