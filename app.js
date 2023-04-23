const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

mongoose.connect('mongodb+srv://mazlum:qqwwqqww11@cluster0.4molq.mongodb.net/logos?retryWrites=true&w=majority');
mongoose.connection.on('open', () => {
    console.log("MongoDB: Connected");
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
});

const verifyToken = require('./middleware/verify-token');
const verify = require('./middleware/verify');

const noTokenRouter = require('./components/notoken/noTokenRouter');
const clientRouter = require('./components/client/clientRoute');
const psychologistRouter = require('./components/psychologist/psychologistRoute');
const reservationRoute = require('./components/reservation/reservationRoute');
const commentRoute = require('./components/comment/commentRoute');
const talkRoute = require('./components/talk/talkRoute');


const app = express();

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});

app.use(cors({
    origins: ["*"]
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const API_PREFIX = '/api';

app.use(`${API_PREFIX}`,noTokenRouter);
app.use(`${API_PREFIX}`, verifyToken);
app.use(`${API_PREFIX}/client`, clientRouter);
app.use(`${API_PREFIX}/psyc`, psychologistRouter);
app.use(`${API_PREFIX}/reservation`, reservationRoute);
app.use(`${API_PREFIX}/comment`, commentRoute);
app.use(`${API_PREFIX}/talk`, talkRoute);
app.use(`${API_PREFIX}/verify`, verify);

module.exports = app;