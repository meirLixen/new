const User = require("../models/user.js");
const Funnel = require("../models/Funnel.js");
const request = require('request');


const path = require("path");

getUidByUserName = async (req, res) => {
    console.log("inside!!")
    const userName = req.params.userName
    console.log(userName)
    const user = await User.findOne({ username: userName })
    if (user) {
        console.log("uid " + user.uid)
        res.json({ "uid": user.uid })
    }
}



const creatFunnel = async (req, res) => {
    console.log(req.body);
    console.log('creat funnel!!');
    let currentUser = await User.findOne({ 'uid': req.params.uId })
    console.log(currentUser);
    await Funnel.findOne({ user: currentUser._id, name: req.body.name.toLowerCase() }).exec(async (err, result) => {
        if (result) {
            return res.status(409).json({ message: 'funnel already exists' })

        }
        const funnel = new Funnel({
            name: req.body.name.toLowerCase(),
            json: req.body.json
        })
        funnel.user = currentUser._id;

        await funnel.save();
        currentUser.funnel.push(funnel)
        await currentUser.save();
        res.status(200).send({ message: 'funnel added succesfully', funnel })
    })
}
getFunnelsbyUser = async (req, res) => {
    console.log("getFunnels");
    let currentUser = await User.findOne({ "uid": req.params.uId });
    Funnel.find({ user: currentUser._id }).exec((err, result) => {
        res.status(200).json({ result })
    })
}
getFunnelById = async (req, res) => {
    console.log("getFunnelById");
    // res.send({message:"sssss"})
    console.log(req.params.uId);
    let currentUser = await User.findOne({ "uid": req.params.uId });
    console.log(currentUser._id, req.params.name.toLowerCase());
    Funnel.findOne({ user: currentUser._id, name: req.params.name.toLowerCase() }).exec((err, result) => {

        if (err)
            res.status(500).json({ err })
        else
            res.status(200).json({ result })
    })
}
updateFunnel = async (req, res) => {
    console.log("update funnel")
    let currentUser = await User.findOne({ "uid": req.params.uId });
    let new_json = req.body.json;
    console.log(req.params);
    Funnel.findOneAndUpdate({ user: currentUser._id, _id: req.params.funnelId }, { $set: { json: new_json, name: req.body.name } }, { new: true }).exec((err, result) => {
        console.log(result);
        if (err)
            res.status(500).json({ err })
        else res.status(200).json({ message: 'funnel updated successfully' })
    })
}
removeFunnel = async (req, res) => {
    console.log("removeFunnel");
    console.log(req.params.funnelId)
    let funnels1 = await Funnel.find();
    console.log(funnels1.length)
    Funnel.findOneAndRemove({ _id: req.params.funnelId }).exec(async (err, result) => {
        if (err)
            console.log(err);
        else {
            console.log("removee");
            let funnels = await Funnel.find();
            console.log(funnels.length)
            res.status(200).json({ result })

        }
    })
}
duplicateFunnel = async (req, res) => {
    console.log("duplicateFunnel");
    console.log("req:" + req.params.funnelId);
    let currentUser = await User.findOne({ "uid": req.params.uId });
    let funnelDuplicate = await Funnel.findOne({ user: currentUser._id, _id: req.params.funnelId });
    let numFunnels = await Funnel.find({ user: currentUser._id })
    // console.log('num: '+numFunnels)
    console.log('funnelDuplicate:' + funnelDuplicate);

    const newFunnel = new Funnel({
        name: funnelDuplicate.name + '(copy)',
        json: funnelDuplicate.json
    })
    newFunnel.user = currentUser._id;
    console.log(newFunnel);
    await newFunnel.save();
    currentUser.funnels.push(newFunnel);
    await currentUser.save();
    res.status(200).send({ massage: "funnel added succesfully", newFunnel })
}
const uploadFile = async (req, res) => {
    console.log("&&&&&&&&&&&&&&&&&&&&")
    console.log("wwwwwwwwwwwwwwwwwwww",req.files)
    console.log(req.files.file)
    console.log(req.params.uId)
    console.log(req.headers)

    let url = await uploadedFile1(req.files.file, req.params.uId,req.params.userName, req.headers["authorization"]);
    console.log(url);
    res.send(url);
}


uploadedFile1 = (fileToUpload, uId,userName, headers) => {
    console.log("headers", headers);
    return new Promise(async (resolve, reject) => {
        console.log(fileToUpload);
        console.log("uploadedFile");
        const uri = `https://files.leader.codes/api/${uId}/upload`;
        console.log(uri,headers);
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
            let url;
            console.log("result from server", body);
            try {
                url = JSON.parse(body).data.url;
                // let url=body.data.url;
                resolve(url);
            } catch (error) {
                reject(error);
            }
        });
    });
};



module.exports = {
    creatFunnel,
    getFunnelsbyUser,
    getUidByUserName,
    getFunnelById,
    updateFunnel,
    removeFunnel,
    uploadFile
}