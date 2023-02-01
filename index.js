const express = require('express');
const routes = require('./src/routes');

const app = express();
app.use(express.json())

app.use(routes)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`))

