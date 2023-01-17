import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit{
  public user: User;
  status : string = ''

  constructor(
    private _userService : UserService
  ){
    this.user = new User('','','','','','','ROLE_USER')
  }

  ngOnInit(): void {

  }

  onSubmit(data: any){
    this._userService.register(this.user).subscribe(
      resp => {
        if(resp.user && resp.user._id && resp.status == 'success'){
          this.status = 'success'
          data.reset()
        }
        else {
          this.status = 'error'          
        }
        console.log(resp)
      },error => {
        console.log(error)
        this.status = 'error' 
      }
    )
  }
}
