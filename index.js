import express from 'express';
import mongoose from 'mongoose';
import { loginValidator } from './validations.js'
// import checkAuth from './utils/checkAuth.js'
import { UserController, PizzaController } from './controllers/index.js'
import handleValidationErrors from './utils/handleValidationErrors.js';
import cors from 'cors';

mongoose
    .connect("mongodb+srv://mamadommaa:vsue4NSnDONV5HgA@cluster0.uxhl5cq.mongodb.net/pizza?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
    console.log('DB работает супер')
    })
    .catch((err) => {
        console.log('DB ersror' , err)
    });

let app = express();
    
app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.get('/pizzas', PizzaController.pizza)
app.post('/pizzas/create', PizzaController.create)
app.delete('/pizzas/:id', PizzaController.remove)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Servser работает супер')
})
