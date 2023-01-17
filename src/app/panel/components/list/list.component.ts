import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit{

  public topics: Array<Topic>
  public identity: any
  public token
  public status


  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _routes: ActivatedRoute
  ){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.status = ''
  }

  ngOnInit(): void {
    this.getTopics()
  }

  getTopics(){
    this._topicService.getMyTopic(this.identity._id).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.status = 'success'
          this.topics = resp.topics
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteTopic(topicId: string){
    this._topicService.delete(this.token,topicId).subscribe(
      resp => {
        this.getTopics()
      },
      error => {
        console.log(error)
      }
    )
  }
}
