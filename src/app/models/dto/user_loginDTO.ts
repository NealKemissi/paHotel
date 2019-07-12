export class UserLoginDTO {
  /***/
  id: number;
  /***/
  lastname: string;
  /***/
  firstname: string;
  /***/
  email: string;
  /***/
  password: string;
  /***/
  date_insc: string;
  /***/
  birthday: string;
  /***/
  admin: number;
  /***/
  active: number;
  /***/
  enabled: number;
  /***/
  token: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
