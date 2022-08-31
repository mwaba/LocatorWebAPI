const path = require ('path');
const dotenv = require ('dotenv');
const express = require ('express');
const cors = require ('cors');
const connectDB = require('./config/config');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/stores', require('./routes/stores'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log('Server running in ${process.env.NODE_ENV} mode on port ${PORT}'));

