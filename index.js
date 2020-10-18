const express = require("express");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const request = require("request");



// const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
dotenv.config();
app.use(cors());
const landingPageRouterApi = require("./routes/api");
const landingPageRouter = require("./routes/views");
app.use(bodyParser.json());
app.use(fileupload({ createParentPath: true }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
checkPermission = async (req, res, next) => {
  console.log("checkPermission");
  let redirectUrl=req.get('host')
  let urlRoute=req.originalUrl.split("/")[2]
  if(req.originalUrl.includes('getUser')||req.originalUrl.includes('updateViewers'))
    {
      console.log("inside")
       return next()
    }
  if (req.originalUrl.includes("/view/") || req.headers["authorization"] == "view")
    return next();
  let uId = req.originalUrl.split("/")[1];
 
  if (uId == "api") {
    uId = req.originalUrl.split("/")[2];
   
  }
 //console.log("######",req.originalUrl); 
  if (uId == "removeLandingPage") {
    uId = req.originalUrl.split("/")[3];
  }
  if (uId == "duplicateLandingPage") {
    uId = req.originalUrl.split("/")[3]; 
  }

  if (!req.headers["authorization"]) {
    if (req.cookies && req.cookies.jwt)
      req.headers["authorization"] = req.cookies.jwt;
      else
        res.redirect('https://leader.codes/login'+'?des='+redirectUrl+'&routes='+urlRoute);
  }
  if (!uId) {
    console.log("no uid");
    res.redirect("https://leader.codes/login"+'?des='+redirectUrl+'&routes='+urlRoute);
  }
  const options = {
    method: "GET",
    url: "https://api.leader.codes/isPermission",
    headers: { Authorization: req.headers["authorization"] },
  };
  request(options, (error, response, body) => {
    if (error) {
      console.log("error: ", error);
      res.redirect("https://leader.codes/login"+'?des='+redirectUrl+'&routes='+urlRoute);
    } else {
      // if (body != uId) {       
      //   console.log(body, "access denied");
      //   res.redirect("https://leader.codes/login"+'?des='+redirectUrl+'&routes='+urlRoute);
      // } else {
        console.log(body, "access successfully");
        return next();
      // }
    }
  });
};

app.use(express.static(path.join(__dirname, "./views")));
 app.use(checkPermission);
app.use("/api/", landingPageRouterApi);
app.use("/", landingPageRouter);
app.listen(3000, () => {
  console.log("server is up");
});


