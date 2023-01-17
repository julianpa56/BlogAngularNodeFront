import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit{

  public topic: Topic
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
    this.topic = new Topic('','','','','','',this.identity.sub,null)
    this.status = ''
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any){
    this._topicService.addTopic(this.token,this.topic).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.status = 'success'
          this.topic = resp.topic
          this._router.navigate(['/panel'])
        }
        else {
          this.status = 'error'
        }

      }, 
      error => {
        this.status = 'error'
        console.log(error)
      }
    )
  }

}
