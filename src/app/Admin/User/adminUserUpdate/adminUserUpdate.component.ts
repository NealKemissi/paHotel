import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { UserDTO } from "src/app/models/dto/userDTO";

@Component({
  selector: "adminUserUpdate",
  templateUrl: "./adminUserUpdate.component.html",
  styleUrls: ["./adminUserUpdate.component.css"]
})
export class AdminUserUpdateComponent {
  /** utilisateur */
  user: User = new User();
  /***/
  error: string;
  /***/
  loading: boolean = true;
  /***/
  msgUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      this.userService.getUser(params["email"]).subscribe(
        data => {
          this.user = data;
          this.loading = false;
          console.log("email user" + this.user.email);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  onUpdate() {
    if (!this.msgUpdate) {
      console.log(
        "nom :" +
          this.user.firstname +
          ", prenom :" +
          this.user.lastname +
          ", email :" +
          this.user.email
      );
      this.msgUpdate = true;
      let user_DTO: UserDTO = new UserDTO(
        this.user.id,
        this.user.email,
        this.user.password,
        this.user.password,
        this.user.lastname,
        this.user.firstname,
        this.user.birthday,
        this.user.admin,
        this.user.active
      );
      this.userService
        .updateUser(user_DTO)
        .subscribe(data => (user_DTO = data), error => this.error = error);
      setTimeout(() => {
        //requete http update ...
        this.router.navigate(["/adminUser"]);
      }, 2500);
    }
  }
}
