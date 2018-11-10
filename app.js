const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('AWS exercise의 A project beta 버전입니다.');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/health', (req, res) => {
  res.status(200).send();
});
