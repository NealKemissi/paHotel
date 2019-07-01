import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirm: string;
  

  constructor() { }

  ngOnInit() {
  }
  
  onRegister(nom: string, prenom: string, email: string, password: string, confirm: string): void {
    console.log("nom : " + nom + ", prenom : " + prenom + ", email : " + email + ", password : " + password + " = confirm : " + confirm);
  }
}
