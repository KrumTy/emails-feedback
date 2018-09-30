const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('get/');
  res.send({
    ok: true,
    target: 'Nia',
    message:
      'Krum te obicha mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo mnogo'
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
