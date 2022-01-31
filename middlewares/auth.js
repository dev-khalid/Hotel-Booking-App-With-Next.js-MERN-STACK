import catchAsyncErrors from './catchAsyncError'; 
import ErrorHandler from '../utils/errorHandler'; 
import {getSession} from 'next-auth/client'; 
import next from 'next';
const isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=> { 
  const session = await getSession({req}); 
  if(!session) { 
    return next(new ErrorHandler('Login first to access this resource',401))
  }
  req.user = session.user; 
  next(); 
})

export { 
  isAuthenticatedUser
}