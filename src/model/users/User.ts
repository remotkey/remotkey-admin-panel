import { Schema, model, models } from "mongoose";

export interface UserType extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  isFirstTimeLogin: boolean;
  createdAt: Date;
}

const UserSchema: Schema<UserType> = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isFirstTimeLogin: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const UserModel = models.User || model<UserType>("User", UserSchema);

export default UserModel;
