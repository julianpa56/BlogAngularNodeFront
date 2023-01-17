import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit{

  public topics: Topic[]
  public totalPages: any
  public page: any
  public next_page: any
  public prev_page: any
  public number_pages: any

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService
  )
  {

  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var page = +params['page']
      if(!page || page == null || page == undefined){
        page = 1
        this.prev_page = 1
        this.next_page = 2
      }
      this.page = page
      this.getTopics(page)
    })
  }

  getTopics(page:any =1){
    this._topicService.getTopics(page).subscribe(
      resp => {
        if(resp.topics){
          this.topics = resp.topics

          // Navegacion de paginacion
          this.totalPages = resp.totalPages

          var number_pages = []
          for(var i=1; i <= this.totalPages; i++){
            number_pages.push(i)
          }
          this.number_pages = number_pages

          if(page >= 2){
            this.prev_page = page -1
          }
          else {
            this.prev_page = 1
          }

          if(page < this.totalPages){
            this.next_page = page+1
          }
          else {
            this.next_page = this.totalPages
          }
        }
        else{
          this._router.navigate(['/inicio'])
        }
      },
    )
  }
  
}
