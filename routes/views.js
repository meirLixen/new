const express = require('express');
const router = express.Router();
const path = require('path')

// SEND VIEW

// router.get('/:userName/:new', (req, res) => {
//   console.log("inside1")
//   router.use(express.static(path.join(__dirname, "../build")));
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })

// router.get('/view/:userName/:new', (req, res) => {
//   console.log(req.originalUrl)
//   router.use(express.static(path.join(__dirname, '../build')));
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })

//comment
// router.get('/:userName/:new',papersController.checkPermission, papersController.editQuote, (req, res) => {
//   console.log("inside1")
//   router.use(express.static(path.join(__dirname, "../build1")));
//   res.sendFile(path.join(__dirname, '../build1/index.html'))
// })


router.get('/view/:userName/:new', (req, res) => {
  console.log(req.originalUrl)
  router.use(express.static(path.join(__dirname, '../build1')));
  res.sendFile(path.join(__dirname, '../build1/index.html'))
})
// router.get('/*', (req, res) => {
//   console.log(req.originalUrl)
//   router.use(express.static(path.join(__dirname, '../build')));
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })
// router.get('/view/:uId/:name', (req, res) => {
//     res.sendFile(path.join(__dirname, "../views/viewLandingPage.html"))
// });

// router.get('/:uId/:name', (req, res) => {
//     res.sendFile(path.join(__dirname, "../views/landingPage.html"))
// });

// router.post('/:uId/:name', (req, res) => {
//     res.sendFile(path.join(__dirname, "../views/landingPageUser.html"))
// });
module.exports = router;