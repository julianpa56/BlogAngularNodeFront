import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { User } from 'src/app/models/user';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService, TopicService ]
})
export class ProfileComponent implements OnInit{

  public user : User
  public topics : Topic[]
  public url

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.url = global.url
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var userId = params['id']

      this.getUser(userId)
      this.getTopics(userId)

    })
  }

  getUser(userId: string){
    this._userService.getUser(userId).subscribe(
      resp => {
        if(resp.user){
          this.user = resp.user
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  getTopics(userId: string){
    this._topicService.getMyTopic(userId).subscribe(
      resp => {
        if(resp.topics){
          this.topics = resp.topics
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}
