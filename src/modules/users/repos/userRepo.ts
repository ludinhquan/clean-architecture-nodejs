
import { UserMap } from "../mappers/UserMap";
import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";

export interface IUserRepo {
  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername(username: string): Promise<User>;
  exists(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class UserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery() {
    const { models } = this;
    return {}
  }

  public async findUserByUsername(username: string): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery['username'] = username;
    const user = await this.models.User.findOne(baseQuery);
    if (!!user === true) return user;
    return null;
  }

  public async findUserByEmail(email: UserEmail): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery['user_email'] = email.value.toString();
    const user = await this.models.User.findOne(baseQuery);
    console.log({ baseQuery, user })
    if (!!user === true) return user;
    return null;
  }

  public async exists(email: UserEmail): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery['user_email'] = email.value.toString();
    const user = await this.models.User.findOne(baseQuery);
    return !!user === true;
  }

  public async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.email);
    const rawUser = UserMap.toPersistence(user);
    try {
      if (!exists) {
        // Create new
        await UserModel.create(rawUser);
      }

      else {
        // Save old
        const sequelizeUserInstance = await UserModel.findOne({
          where: { user_email: user.email.value }
        })
        await sequelizeUserInstance.update(rawUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
}