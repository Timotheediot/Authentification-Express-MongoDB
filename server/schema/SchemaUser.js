const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require('../config/Config');

const userSchema = mongoose.Schema(
    {
      email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    },
    { timestamps: { createdAt: "created_at" } }
  );

//   authenticate(password) permet de vérifier si le mdp est bien celui associé à l’utilisateur;  getToken() permet de générer un jeton d’accès à partir du modèle et de notre chaîne de caractères secrète présente dans /config:

  userSchema.methods = {
    authenticate: (password) => {
      return passwordHash.verify(password, this.password);
    },
    getToken: () => {
      return jwt.encode(this, config.secret);
    }
  };
  
  module.exports = mongoose.model("User", userSchema);