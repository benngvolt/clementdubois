const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: false},
    projectInfos: {type: String, required: false},
    moreInfos: {type: String, required: false},
    aboutShow: {type: String, required: false},
    aboutSceno: {type: String, required: false},
    mainImageIndex: { type: Number, required: true },
    projectType: {type: String, required: true},
    artistsList: [
        {
        artistFunction: {type: String, required: false},
        artistName: {type: String, required: false},
        }
    ],
    productionList: [
        {
        prodType: {type: String, required: false},
        prodName: {type: String, required: false},
        prodInfos: {type: String, required: false},
        prodLink: {type: String, required: false},
        }
    ],
    press: [
        {
        quote: {type: String, required: false},
        mediaName: {type: String, required: false},
        mediaLink: {type: String, required: false},
        }
    ],
    links: [
        {  
        linkName: {type: String, required: false},
        linkUrl: {type: String, required: false},
        }
    ],
    diffusionList: [
        {
        dates: {type: String, required: false},
        city: {type: String, required: false},
        placeName: {type: String, required: false},
        placeLink: {type: String, required: false},
        }
    ],
    projectImages: [
        {
        imageUrl: {type: String, required: false},
        photograph: {type: String, required: false},
        }
    ],
    makingOfImages: [
        {
        imageUrl: {type: String, required: false},
        photograph: {type: String, required: false},
        }
    ],
    
    
});


module.exports = mongoose.model('Project', projectSchema);