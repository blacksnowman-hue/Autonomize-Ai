import { Schema, Document, models, model } from "mongoose";


export interface IUser extends Document {
  username: string;
  location?: string;
  blog?: string;
  bio?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: Date;
  updated_at?: Date;
  friends?: string[],
  isDeleted?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, lowercase: true },
    location: { type: String, },
    blog: { type: String, },
    bio: { type: String, },
    public_repos: { type: Number, },
    public_gists: { type: Number, },
    followers: { type: Number, },
    following: { type: Number, },
    created_at: { type: Date, },
    updated_at: { type: Date, },
    friends: [{ type: String, }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;