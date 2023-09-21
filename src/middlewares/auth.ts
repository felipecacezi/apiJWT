import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User';
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

export const Auth = {
    private: async (req: Request, res:Response, next:NextFunction) => {
        let success: boolean = false

        if (req.headers.authorization) {
            try {
                const [authType, token] =  req.headers.authorization?.split(' ')
                if (authType === 'Bearer') {
                    const decoded = JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    )
                    success = true
                }
            } catch (error) {}
        }

        if (success) {
            next()
        } else {
            res.status(403)
            .json({
                error: 'Não autorizado'
            })
        }
    }
}