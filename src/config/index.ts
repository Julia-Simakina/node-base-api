import "dotenv/config";

const config = {
  token: {
    keys: {
      access: process.env.ACCESS_KEY,
      refresh: process.env.REFRESH_KEY,
    },
    expirationTime: {
      access: process.env.TIME_EXPIRES_ACCESS_TOKEN,
      refresh: process.env.TIME_EXPIRES_REFRESH_TOKEN,
    },
  },
};

export default config;
