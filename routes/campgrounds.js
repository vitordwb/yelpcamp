const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post( isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
    .post(upload.single('image'), (req, res) => {
        console.log(req.body, req.file);
        res.send('IT WORKED');
    })

router.route('/new')
    .get(isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor,  validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.route(':id/edit')
    .get(isLoggedIn, isAuthor,  catchAsync(campgrounds.renderEditForm))

module.exports = router;
