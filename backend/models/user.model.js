import mongoose from "mongoose";
// bcrypt is a widely-used password hashing function. Its primary purpose is to securely store user passwords.
import bcrypt from "bcryptjs";
// The crypto module provides a wide range of cryptographic functionality, including hashing, encryption.
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Schem.methods - It allows to define custom methods that can be called on an instance of a Mongoose mode
// matchPassword: This is the name of the method
// enteredPassword: This is the parameter for the method.
// bcrypt.compare(...): It's specifically designed to safely compare a plain-text password with a hashed password.
// returns a Boolean value - true or false
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10mins

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
