let express = require('express'),
    path    = require('path'),
    mysql   = require('mysql'),
    cors    = require('cors'),
    bodyParser = require('body-parser'),
    dataBaseConfig = require('./database/db');

// Connecting mongoDB
  var connection = mysql.createPool({
    connectionLimit: 100,
    host:'remotemysql.com',
    user:'JYnUnMBOeQ',
    password:'pLC0jJ9h6e',
    database:'JYnUnMBOeQ',
    port: 3306,
    debug: false,
    multipleStatements: true
});

connection.connect();

// Set up express js port
const userRoute = require('./routes/user.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/', express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/api', userRoute)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
/*app.use((req, res, next) => {
    next(createError(404));
});*/

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});