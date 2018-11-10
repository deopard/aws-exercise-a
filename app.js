const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('CodeDeploy로 배포된 AWS exercise의 첫 번째 A project 버전입니다.');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/health', (req, res) => {
  res.status(200).send();
});
