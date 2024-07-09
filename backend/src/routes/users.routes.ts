import { Router } from "express";

import validateData from "../middleware/validateData.middleware";

import { userSchema } from "../validation/validation";

import {
  getUserAndSave,
  findMutualFollowers,
  updateUser,
  deleteUser,
  searchUsers,
  sortUsers
} from "../controllers/users.controller";



const router = Router();

router.get('/search', searchUsers);

router.get('/sorted', sortUsers);

router.get('/:username', validateData(userSchema), getUserAndSave);

router.get('/:username/friends', validateData(userSchema), findMutualFollowers);

router.patch('/:username', updateUser);

router.delete('/:username', deleteUser);


export default router;
