import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDTO } from "../models/dto/userDTO";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  nom: string;
  /***/
  prenom: string;
  /***/
  birthday: string;
  /***/
  email: string;
  /***/
  password: string;
  /***/
  confirm: string;
  /***/
  error: string;
  /***/
  msgCreating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  onRegister(
  ){
    this.msgCreating = true;
    console.log(
      "nom: " +
        this.nom +
        ", prenom: " +
        this.prenom +
        ", email: " +
        this.email +
        ", birthday: " +
        this.birthday +
        ", password : " +
        this.password +
        " = confirm: " +
        this.confirm
    );
    if (this.email == undefined || this.nom == undefined || this.prenom == undefined || this.password == undefined || this.confirm == undefined || this.birthday == undefined) {
      this.msgCreating = false;
      this.error = "Veuillez renseigner tous les champs";
    } else if (this.password != this.confirm) {
      this.msgCreating = false;
      this.error = "Les mots de passe ne correspondent pas";
    } else {
      this.error = undefined;
      console.log("ok");
      let userDTO: UserDTO = new UserDTO(
        null,
        this.email,
        this.password,
        this.confirm,
        this.nom,
        this.prenom,
        this.birthday
      );
      this.userService.createUser(userDTO).subscribe(
        data => {
          userDTO = data;
          this.finish();
        },
        error => {
          this.error = error;
          this.msgCreating = false;
        }
      );
    }
  }

  finish(){
    setTimeout(() => {
      this.router.navigate(["/dashboard"]);
    }, 2500);
  }
}
