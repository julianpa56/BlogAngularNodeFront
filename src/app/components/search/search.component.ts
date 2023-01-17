import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {

  public topics: Topic[]

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService
  )
  {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var search = params['search']
      this.getTopics(search)
    })
  }

  getTopics(search: string){
    this._topicService.search(search).subscribe(
      resp => {
        if(resp.topics){
          this.topics = resp.topics
          console.log(this.topics)
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}
