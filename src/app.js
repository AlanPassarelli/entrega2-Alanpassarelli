import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
 import { Server } from 'socket.io';
// import connectToDB from "./config/configServer.js"
import {__dirname} from "./utils.js";
import userRouter from './routers/users.routes.js';
import routerP from './routers/products.routes.js';
import routerC from './routers/carts.routes.js';
import routerV from './routers/views.routes.js';
import sessionRouter from './routers/session.routes.js';
//socketservers
import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';

const app = express();
const PORT = process.env.PORT || 8080

//BDD
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('BDD conectada')
    })
    .catch(() => console.log('Error en conexion a BDD'))


const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`);
        console.log(`\t3). http://localhost:${PORT}/api/users`);
    }
    catch (err) {
        console.log(err);
    }
});



app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser (process.env.SIGNED_COOKIE));
app.use (session({
    store: MongoStore.create ({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedtopology:true
        },
        ttl: 60
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.engine("handlebars",handlebars.engine())
app.set('view engine', 'handlebars');
app.set("views",__dirname+"/views")

app.use('/api/users', userRouter)
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/api/sessions', sessionRouter)
app.use('/', routerV);



const socketServer = new Server(httpServer)

socketProducts(socketServer)
socketChat(socketServer)
//  socketServer.on('connection',socket=>{
//     socketChat(socketServer,socket);
//  })