const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${colors.yellow.bold(port)}..`);
});
