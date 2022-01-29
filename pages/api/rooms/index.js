import nc from 'next-connect';
import { allRooms, newRoom } from '../../../controllers/roomControllers';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';

dbConnect();
const handler = nc({ onError }); //ei route handler er moddhe error handler thakte hobe .

handler.get(allRooms).post(newRoom);
export default handler;
