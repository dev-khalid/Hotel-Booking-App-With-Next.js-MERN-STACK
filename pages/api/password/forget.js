import nc from 'next-connect'; 
import onError from '../../../middlewares/errors'; 
import dbConnect from '../../../config/dbConnect'; 
import {forgetPassword} from '../../../controllers/authControllers'; 
const handler = nc({onError}); 
dbConnect(); 
handler.post(forgetPassword); 
export default handler; 