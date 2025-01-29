import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const config = {
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },
};
