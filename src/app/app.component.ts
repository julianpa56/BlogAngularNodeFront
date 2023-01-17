import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'foro-angular';
  public identity : any
  public token : any
  public url : string
  public search : string

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = global.url
  }

  ngOnInit(): void {
  }
  
  ngDoCheck(){
    this.identity = this._userService.getIdentity()
  }

  logout(){
    localStorage.clear()
    this.identity = null
    this.token = null
    this._router.navigate(['/inicio'])
  }

  searchOnTopics(){
    this._router.navigate(['/buscar',this.search])
  }
}
