import Joi, { Schema } from 'joi';

import { IUser } from '../models/users.model';

const userSchema: Schema<IUser> = Joi.object({
  username: Joi.string().required(),
  location: Joi.string().optional(),
  blog: Joi.string().optional(),
  bio: Joi.string().optional(),
  public_repos: Joi.number().integer().min(0).optional(),
  public_gists: Joi.number().integer().min(0).optional(),
  followers: Joi.number().integer().min(0).optional(),
  following: Joi.number().integer().min(0).optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
  friends: Joi.array().items(Joi.string()).optional(),
  isDeleted: Joi.boolean().default(false).optional(),
});

export { userSchema };
