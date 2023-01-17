import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/global';
import { AngularFileUploaderConfig } from 'angular-file-uploader';




@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent {
  public user : User;
  public status : string = ''
  public identity : any
  public token : any
  public afuConfig : AngularFileUploaderConfig
  public url
  public statusUpdateAvatar : string = ''


  constructor(
    private _userService : UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    // this.user = new User('','','','','','','ROLE_USER')
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user = this.identity
    this.url = global.url
    this. afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .jpeg, .png, .gif",
      maxSize: 50,
      uploadAPI: {
        url: this.url+"update-avatar",
        method:"PUT",
        headers : {
          "Authorization": this.token
        },
        params: {
          page: '1',
        },
        responseType: 'json',
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        attachPinBtn: 'Sube la imagen de tu post'
      }
  };
  }

  ngOnInit(): void {

  }


  onSubmit(form : any){
    this._userService.update(this.user).subscribe(
      resp => {
        if(!resp.user){
          this.status = 'error'
        }
        else {
          this.status = 'success'
          localStorage.setItem('identity',JSON.stringify(this.user))
        }
      }, 
      error => {
        this.status = 'error'
        console.log(error)
      }
    )
  }

  avatarUpload(data: any){
    let data_obj = data.body;
    this.user.image = data_obj.user.image;
    if (data_obj.status == 'success'){
      this.statusUpdateAvatar = 'success'
    }
    else {
      this.statusUpdateAvatar = 'error'
    }
  }

}
