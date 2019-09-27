const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser')
// IMPORT MODELS HERE...

const app = express();
app.use(cors())
app.use(bodyParser.json())

// ROUTES WILL GO HERE...

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});