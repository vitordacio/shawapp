const express = require('express');
const routes = require('./src/routes');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`App listening on port ${port}`))

