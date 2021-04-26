const express = require("express");
const router = express.Router();
const path=require('path')


const funnelController = require("../controller/funnel");

router.post("/updateFunnel/:uId/:funnelId", funnelController.updateFunnel);
router.delete("/removeFunnel/:funnelId", funnelController.removeFunnel);
router.post('/uploadFile/:uId/:userName',funnelController.uploadFile)
router.post('/:uId',funnelController.creatFunnel);
router.get("/:uId", funnelController.getFunnelsbyUser);
router.get('/getUser/:userName', getUidByUserName);
router.get('/:uId/:name',funnelController.getFunnelById);



module.exports = router;
