//whitelist for CORS will be for who is allowed to access your api
//You can access your api with your own website
//You can access api if you golive in VS maybe your are building with react
//Or if you are using custom server and want to access with localhost
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
