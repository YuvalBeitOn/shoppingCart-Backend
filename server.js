const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

const http = require('http').createServer(app);

// Express App Config
app.use(cookieParser())
app.use(bodyParser.json());


app.use(session({
    secret: 'anyrandomstring',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false }
}))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const productRoutes = require('./api/product/product.routes')



// routes


app.use('/api/product', productRoutes)


module.exports = app;


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
        // console.log('Server is running on port:', port);
});