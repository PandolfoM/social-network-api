const { Schema, model } = require("mongoose");

const FriendSchema = new Schema({
  friendId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (email) {
          return /^[A-Za-z0-9+_.-]+@(.+)$/.test(email);
        },
        message: (email) => `${email.value} is not a valid email address!`,
      },
      required: true,
      unique: true,
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
    friends: [FriendSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
