import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string;
  password : string;

  constructor() { }

  ngOnInit() {
  }

  onLogin(email: string, password: string): void {
    console.log("email : " + email + "password :" + password);
  }

}
