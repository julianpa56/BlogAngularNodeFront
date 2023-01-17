import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit{

  public users: User[]
  public url

  constructor(
    private _userService: UserService
  )
  {
    this.url = global.url
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      resp => {
        if(resp.users){
          this.users = resp.users
        }
        else {
          console.log('error 1')
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}
