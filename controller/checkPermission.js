// const User = require("../models/user.js");
// const Funnel = require("../models/Funnel.js");
// const request = require('request');


// const path = require("path");

// checkPermission = async (req, res, next) => {
//     const host = req.get('host');
//     const isLocal = (req.query.isLocal == 'true');
//     console.log("newIsLocal", isLocal);
//     if (isLocal)
//         return next();
//     console.log("in checkPermission", req.originalUrl.split("/"));
//     let userName = req.originalUrl.split("/")[1];
//     let apiFlag = false
//     let urlRoute
//     let redirectUrl = host + "/admin";
//     if (userName == "api") {
//         userName = req.originalUrl.split("/")[2];
//         apiFlag = true
//     }
//     if (!apiFlag) urlRoute = req.originalUrl.split("/")[3]
//     if (!userName) {
//         console.log("no uid");
//         return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
//     }
//     else {
//         console.log(req.cookies);
//         const jwt = req.cookies.devJwt ? req.cookies.devJwt : req.headers['authorization'] ? req.headers['authorization'] : null
//         const cookie = request.cookie(`jwt=${jwt}`)
//         console.log(req.cookies.devJwt, cookie)
//         const options = {
//             method: "GET",
//             url: `https://accounts.codes/isPermission/${userName}`   ,
//             headers: { Cookie: cookie }
//         };
//         request(options, (error, response, body) => {
//             console.log("response.statusCode", response.statusCode)
//             console.log("body", typeof (body), body)
//             if (error || response.statusCode != 200) {
//                 return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
//             }
//             else {
//                console.log("userName", userName)
//                 if (body == 'true') {
//                     console.log("no error!!!!!!!");
//                     return next();
//                 }
//                 return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
//             }
// });
//     }
// };
