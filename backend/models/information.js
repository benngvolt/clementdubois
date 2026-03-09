const mongoose = require('mongoose')

const informationSchema = new mongoose.Schema(
  {
    firstPictureUrl: { type: String },
    secondPictureUrl: { type: String },
    thirdPictureUrl: { type: String },

    bioParagraph: { type: String },

    manifesto: [
      {
        sentence: { type: String },
      },
    ],

    collaborations: [
      {
        collabUrl: { type: String },
        collabName: { type: String },
        collabImgUrl: { type: String },
      },
    ],
  },
  {
    timestamps: true, // toujours utile
  }
)

module.exports = mongoose.model('Information', informationSchema, 'informations')