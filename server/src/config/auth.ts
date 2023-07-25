export const authConfig = {
  jwt: {
    secret: process.env.SECRET_KEY || 'default',
    expiresIn: '1d',
  },
};
