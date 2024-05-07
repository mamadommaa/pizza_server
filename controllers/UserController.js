import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js'


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({'email': req.body.email});
        
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найдеggggн',
            })
        }

        
        let isValidPass = false;
        if (user.password === req.body.password) {
            isValidPass = true;
        }


        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            })
        }
        if (isValidPass) {
            const authStatus = true;
         const { password, ...userData } = user._doc;
        res.json({
            ...userData,
            authStatus
    })
        }

        ;

    } catch (err) {
         console.log(err);
        res.status(500).json({
            message: "Не удаллось авторизоваться"
        })    
    }
}