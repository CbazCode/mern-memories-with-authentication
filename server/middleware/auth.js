import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //This is from google Auth
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData.id;
    } else {
        //This is for the google token
      decodedData = jwt.decode(token);
        //Sub is google name for specific ID
      req.userId = decodedData.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;