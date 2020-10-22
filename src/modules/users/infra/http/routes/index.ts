
import express from 'express';
import { createUserController } from '@/modules/users/useCases/createUser';
import { registerWithFacebookController } from '@/modules/users/useCases/registerWithFacebook';

const userRouter = express.Router();

userRouter.post('/',
  (req, res) => createUserController.execute(req, res)
)

userRouter.post('/fb-register',
  (req, res) => registerWithFacebookController.execute(req, res)
)

export { userRouter };