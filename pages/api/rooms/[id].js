import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '../../../controllers/roomControllers';

import onError from '../../../middlewares/errors';

//eikhane next a authentication asbe

dbConnect();
const handler = nc({ onError });
handler.get(getSingleRoom).delete(deleteRoom).put(updateRoom);

export default handler;
