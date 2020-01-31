import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../entities/User';

dotenv.config();

// 토큰에 해당하는 유저가 없으면 Undefined를 리턴함
const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    console.log('DECODE JWT ERROR');
    console.log(error.message);
    return undefined;
  }
};

export default decodeJWT;
