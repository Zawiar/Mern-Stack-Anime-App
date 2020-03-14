const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  location: {
    type: String
  },

  bio: {
    type: String
  },

  animanga: [
    {
      typeofMaterial: { type: String, default: "anime" },

      title: {
        type: String
        //required: true
      },

      mal_id: {
        type: Number
      },

      synopsis: {
        type: String
        //required: true
      },

      image: {
        type: String
      },

      priorityLevel: {
        type: Number,
        default: 5
      },

      watched: {
        type: Boolean,
        default: false
      },

      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  hobbies: {
    type: [String]
  },

  social: {
    youtube: {
      type: String
    },

    twitter: {
      type: String
    },

    facebook: {
      type: String
    },

    linkedin: {
      type: String
    },

    instagram: {
      type: String
    }
  },

  startedWatchingAnimeFrom: {
    type: Date
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profiles = mongoose.model("Profiles", ProfileSchema);
