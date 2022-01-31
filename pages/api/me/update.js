import nc from 'next-connect';
import onError from '../../../middlewares/errors';
import dbConnect from '../../../config/dbConnect';
import { isAuthenticatedUser } from '../../../middlewares/auth';
import { updateProfile } from '../../../controllers/authControllers';


const handler = nc({ onError });
dbConnect();

handler.use(isAuthenticatedUser).put(updateProfile);

export default handler;