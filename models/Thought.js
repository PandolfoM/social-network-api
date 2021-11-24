const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
  reactionId: {
    type: ObjectId,
    default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  }
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

ReactionSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
