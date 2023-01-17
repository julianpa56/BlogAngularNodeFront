import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit{

  public topic: Topic
  public identity: any
  public token
  public status


  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.topic = new Topic('','','','','','',this.identity.sub,null)
    this.status = ''
  }

  ngOnInit(): void {
    this.getTopic()
  }

  getTopic(){
    this._route.params.subscribe((params: Params) => {
      let id = params['id']
      
      this._topicService.getTopic(id).subscribe(
        resp => {
          if(resp.topic){
            this.topic = resp.topic
          }
          else {
            this._router.navigate(['/panel'])
          }
        },
        error => {
          console.log(error)
          this._router.navigate(['/panel'])
        }
      )
    })
  }

  onSubmit(form: any){
    this._topicService.update(this.token,this.topic._id,this.topic).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.status = 'success'
          this.topic = resp.topic
          // this._router.navigate(['/panel'])
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
