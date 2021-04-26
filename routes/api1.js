const express = require("express");
const router = express.Router();

const landingPageController = require("../controller/landingPage.js");
router.get('/getUser/:userName', getUidByUserName)
router.post("/:uId/submit", landingPageController.submit);
router.put("/updateViewers", landingPageController.updateViewers);
router.get("/:uId/getEmail", landingPageController.getUserEmail);
router.get("/:uId/:name", landingPageController.getLandingPageDetails);
router.post("/:uId/:name", landingPageController.updateLandingPageDetails);
router.delete("/removeLandingPage/:uId/:LandingPageId", landingPageController.removeLandingPage);
router.post("/:uId", landingPageController.createLandingPage);


// router.post("/duplicateLandingPage/:uId/:landingPageId",landingPageController.duplicateLandingPage);
// router.post("/upload/file/yyyy", landingPageController.uploadedFile);

router.get("/:uId", landingPageController.getLandingPages);

module.exports = router;
