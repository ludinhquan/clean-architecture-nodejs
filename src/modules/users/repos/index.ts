
import models from "@/infra/database/mongodb/models";

import { UserRepo } from "./userRepo";

const userRepo = new UserRepo(models);

export {
  userRepo
}