
import { Mapper } from "@/core/infra/Mapper";
import { User } from "../domain/user";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { UserEmail } from "../domain/userEmail";

export class UserMap extends Mapper<User> {

  public static toPersistence (user: User): any {
    return {
      base_user_id: user.id.toString(),
      user_email: user.email.value,
      first_name: user.firstName,
      last_name: user.lastName,
    }
  }

  public static toDomain (raw: any): User {
    const userEmailOrError = UserEmail.create(raw.user_email);

    const userOrError = User.create({
      email: userEmailOrError.getValue(),
      firstName: raw.first_name,
      lastName: raw.last_name,
      isEmailVerified: raw.is_email_verified,
      username: raw.username
    }, new UniqueEntityID(raw.base_user_id))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
  
}