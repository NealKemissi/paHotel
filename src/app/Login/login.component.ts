import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginDTO } from '../models/dto/user_loginDTO';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  email: string;
  /***/
  password: string;
  /***/
  msgUpdate: boolean = false;
  /***/
  error: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  onLogin(): void {
    this.error = undefined;
    if (this.email == undefined || this.password == undefined) {
      this.error = "Tous les champs doivent être remplis !";
    } else {
      this.msgUpdate = true;
      console.log("email : " + this.email + "password :" + this.password);
      let userDTO: UserLoginDTO = new UserLoginDTO(this.email, this.password);
      this.userService.login(userDTO).subscribe(data => {
        let id = data.id;
        let admin = data.admin;
        let token = data.token;
        console.log(JSON.stringify(data));
        localStorage.setItem('id', id);
        localStorage.setItem('admin', admin);
        localStorage.setItem('token', token);
        setTimeout(() => {
          //requete http login ...
          window.location.reload();
          //this.router.navigate(['/dashboard']);
      }, 2500);
      }, error => {
        this.error = error
        this.msgUpdate = false;
      });
    }
  }
}
