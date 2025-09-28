export class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.role = user.role;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
  }
}