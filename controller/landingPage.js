const User = require("../models/user.js");
const Contact = require("../models/Contact.js");
const Wave = require("../models/Wave.js");
const Conversation = require("../models/Conversation");
const LandingPage = require("../models/LandingPage.js");
const fs = require("fs");
const request = require("request");

const path = require("path");

duplicateLandingPage = async (req, res) => {
  console.log("req:" + req.params.landingPageId);
  let currentUser = await User.findOne({ uid: req.params.uId });
  let LandingPageDuplicate = await LandingPage.findOne({
    user: currentUser._id,
    _id: req.params.landingPageId,
  });
  // let numForms = await Form.find({ user: currentUser._id })

  const newLandingPage = new LandingPage({
    name: "landingPage_" + Date.now(),
    json: LandingPageDuplicate.json,
  });
  newLandingPage.user = currentUser._id;
  

  await newLandingPage.save();
  currentUser.LandingPage.push(newLandingPage);
  await currentUser.save();
  res.status(200).send({ massage: "form added succesfully", newLandingPage });
};
getUidByUserName = async (req, res) => {
  console.log("inside!!")
  const userName = req.params.userName
  console.log(userName)
  const user = await User.findOne({ username: userName })
  if (user)
    console.log("uid " + user.uid)
  res.json({ "uid": user.uid })
}


removeLandingPage = async (req, res) => {
  console.log(req.params.LandingPageId);
  LandingPage.findOneAndRemove({ _id: req.params.LandingPageId }).exec(
    async (err, result) => {
      if (err) console.log(err);
      else {
        console.log("removee");
        res.status(200).json({ result });
      }
    }
  );
};

submit = async (req, res) => {
  let currentUser = await User.findOne({ uid: req.params.uId });
  try {
    let sendEmailResult = await sendEmail(
      req.body.name,
      req.body.body,
      req.body.list,
      currentUser
    );
    let sendBoxRes = await submitToLeaderBox(req);
    let dataToSocket = { title: "lead", user: currentUser.uid };
    let socket = await newLeader(dataToSocket, req.headers["authorization"]);
    res.status(200).send({ massage: "data send succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};
getLandingPages = async (req, res) => {
  console.log("getLandingPages");
  let currentUser = await User.findOne({ uid: req.params.uId });
  LandingPage.find({ user: currentUser._id }).then((landingPages, err) => {
    if (err) res.status(500).send(err);
    res.status(200).send(landingPages);
  });
};
getLandingPageDetails = async (req, res) => {
  console.log(req.params);
  let currentUser = await User.findOne({ uid: req.params.uId });
  console.log(currentUser._id);
  LandingPage.findOne({
    user: currentUser._id,
    name: req.params.name.toLowerCase(),
  }).then((user, err) => {
    // console.log(user);
    if (!err) res.status(200).send(user);
    console.log(err);
  });
};
updateLandingPageDetails = async (req, res) => {
  console.log(req.files);
  let currentUser = await User.findOne({ uid: req.params.uId });
  let customUser = req.body;
  if (req.files) {
    try {
      let url = await uploadedFile(req.files.image, req.params.uId, req.headers["authorization"]);
      customUser.img = url;
      console.log(url);
      result = await updateData(customUser, currentUser._id, req.params.name);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      result = await updateData(customUser, currentUser._id, req.params.name);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
createLandingPage = async (req, res) => {
  console.log("createLandingPage");
  let currentUser = await User.findOne({ uid: req.params.uId });
  let customUser = req.body;
  if (req.files) {
    console.log("with img");
    try {
      let url = await uploadedFile(req.files.image, req.params.uId, req.headers["authorization"]);
      console.log("uploaded img", url);
      customUser.img = url;
      customUser.name = customUser.name.toLowerCase();
      console.log(url);
      result = await saveData(customUser, currentUser);

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    console.log("without img");
    try {
      result = await saveData(customUser, currentUser);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
debugger 
saveData = (customUser, currentUser) => {
  return new Promise(async (resolve, reject) => {
    const landingPage = new LandingPage(customUser);
    landingPage.user = currentUser._id;
    let result = await landingPage.save();
    currentUser.landingPages.push(landingPage);
    try {
      await currentUser.save();
      console.log("saved successfully");
      resolve(result);
    } catch (error) {
      res.status(500).send(error)
    }

  });
};

updateData = (customUser, id, name) => {
  return new Promise(async (resolve, reject) => {
    LandingPage.findOneAndUpdate(
      { user: id, name: name.toLowerCase() },
      customUser
    ).then((result, err) => {
      if (err) console.log(err);
      console.log("updated successfully");
      resolve(result);
    });
  });
};
newLeader = (dataToSocket, headers) => {
  const options = {
    url: "https://api.leader.codes/socket",
    headers: { Authorization: headers },
    method: "POST",
    json: dataToSocket,
  };
  return new Promise(async (resolve, reject) => {
    request(options, (error, res, body) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      if (res && !res.statusCode == 200) reject(body);
      console.log(`statusCode: ${res.statusCode}`);
      console.log(body);
      resolve(body);
    });
  });
};

sendEmail = async (name, body, list, currentUser) => {
  var email = {};
  email = {
    to: list,
    from: "noreply@leader.codes",
    subject: "Landing Page " + name,
    html: body,
  };
  const options = {
    url: "https://api.leader.codes/mail/sendEmail",
    method: "POST",
    headers: { Authorization: "view" },
    json: email,
    // "data": JSON.stringify({"json": JSON.stringify(email) }),
  };
  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      console.log(`statusCode: ${res.statusCode}`);
      console.log(body);
      resolve(body);
    });
  });
};
(getUserEmail = async (req, res) => {
  const userUid = req.params.uId;
  console.log("userId", userUid);
  await User.findOne({ uid: userUid })
    .then((user) => {
      // console.log("user", user);
      console.log(user.email);
      res.status(200).send(user.email);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
}),
  (uploadedFile = (fileToUpload, uId, headers) => {
    console.log("headers", headers);
    return new Promise(async (resolve, reject) => {
      console.log(fileToUpload);
      console.log("uploadedFile");
      const uri = `https://files.leader.codes/api/${uId}/upload`;
      console.log(uri);
      const options = {
        method: "POST",
        url: uri,
        headers: {
          Authorization: headers,
          "Content-Type": "multipart/form-data",
        },
        formData: {
          file: {
            value: fileToUpload.data,
            options: {
              filename: fileToUpload.name,
            },
          },
        },
      };

      request(options, async (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log("result from server", body);
        try {
          let url = JSON.parse(body).data.url;
          resolve(url);
        } catch (error) {
          reject(error);
        }
      });
    });
  });
submitToLeaderBox = async (req) => {
  const { body, list, subject, name, submition } = req.body;
  let contactDetails = JSON.parse(submition);
  let conversation = { source: "landing_page", subject: "landingPage " + name };
  let wave = { body: req.body.body };
  console.log(contactDetails);
  const options = {
    url: ` https://box.leader.codes/api/${req.params.uId}/conversation/getConversation`,
    headers: { Authorization: req.headers["authorization"] },
    method: "POST",
    json: {
      conversation,
      wave,
      contact: { email: contactDetails.email, name: contactDetails.fullName, phone: contactDetails.phone },
    },
  };
  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (error) {
        console.log("error:" + error);
        reject(error);
      }
      console.log(`statusCode: ${res.statusCode}`);
      resolve("sent");
    });
  });
};

function randomDate(start,end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
 
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
updateViewers = async (req, res) => {
  console.log("updaeViewrs");
 let start = new Date(2020, 09, 01);
 let  end = new Date(2020, 09, 31);
 let randDate=randomDate(start,end);

  let number=getRandomInt(100);

  await LandingPage.updateMany({}, { $push: { viewers:  { date: randDate, amount: number } }  });
  console.log("updated successfully!!");
  res.send({ massage: "updated successfully!!" })
}


module.exports = {
  submit,
  getLandingPageDetails,
  updateLandingPageDetails,
  createLandingPage,
  getLandingPages,
  getUserEmail,
  removeLandingPage,
  duplicateLandingPage,
  getUidByUserName,
  updateViewers
};
