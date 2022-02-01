import nc from 'next-connect';
import onError from '../../../middlewares/errors';
import dbConnect from '../../../config/dbConnect';
import { forgotPassword } from '../../../controllers/authControllers';
const handler = nc({ onError });
dbConnect();
handler.post(forgotPassword);
export default handler;
