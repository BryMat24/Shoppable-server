const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const errorHandling = require('./middleware/errorHandling')

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = require('./routes');
app.use(router);
app.use(errorHandling);

app.listen(PORT, () => { console.log(`listening to port ${PORT}`) });