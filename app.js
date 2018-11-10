const express = require('express');
const app = express();

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk'),
    endpoint = "https://secretsmanager.ap-northeast-2.amazonaws.com",
    region = "ap-northeast-2",
    secretName = "production/aws-exercise",
    secret,
    binarySecretData;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    endpoint: endpoint,
    region: region,
    accessKeyId: '액세스 키 ID', // 본인의 ID를 입력
    secretAccessKey: '시크릿 액세스 키' // 본인의 키를 입력
});

app.get('/', (req, res) => {
  client.getSecretValue({ SecretId: secretName }, function (err, data) {
    if (err) {
      if (err.code === 'ResourceNotFoundException')
        console.log("The requested secret " + secretName + " was not found");
      else if (err.code === 'InvalidRequestException')
        console.log("The request was invalid due to: " + err.message);
      else if (err.code === 'InvalidParameterException')
        console.log("The request had invalid params: " + err.message);
    }
    else {
      // Decrypted secret using the associated KMS CMK
      // Depending on whether the secret was a string or binary, one of these fields will be populated
      if (data.SecretString !== "") {
        secret = JSON.parse(data.SecretString);
      } else {
        binarySecretData = data.SecretBinary;
      }
    }

    res.send(`SecretsManager로 실행되는 AWS exercise의 A project입니다.<br />
- Admin 비밀번호: ${secret.admin_password}<br />
- 비밀 값: ${secret.secret_key}`);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/health', (req, res) => {
  res.status(200).send();
});

