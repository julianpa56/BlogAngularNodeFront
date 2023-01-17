import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user : User
  public status = ''
  public identity : any
  public token : any 


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.user = new User('','','','','','','ROLE_USER')
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any){
    this._userService.signup(this.user).subscribe(
      resp => {
        if(resp.user && resp.user._id){
          this.status = 'success'
          this.identity = resp.user
          localStorage.setItem('identity',JSON.stringify(this.identity))

          // Conseguir el token
          this._userService.signup(this.user,true).subscribe(
            resp => {
              if(resp.token){
                // Guardamos el token en una propiedad 
                this.token = resp.token
                localStorage.setItem('token',this.token)
                this._router.navigate(['/inicio'])
              }
              else {
                this.status = 'error'
              }
            },
            error => {
              console.log(error)
              this.status = 'error'
            }
          )
          // ----
        }
        else {
          this.status = 'error'
        }
      },
      error => {
        console.log(error)
        this.status = 'error'
      }
    )
  }
}
