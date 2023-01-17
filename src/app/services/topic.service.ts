import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from '../models/topic';
import { Observable } from 'rxjs';
import { global } from '../global';



@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public url

  constructor(
    private _http: HttpClient
  ) { 
    this.url = global.url
  }

  addTopic(token:string,topic:Topic): Observable<any>{
    let params = JSON.stringify(topic)
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token)
    return this._http.post(this.url+'topic',params,{headers:headers})
  }

  getMyTopic(userId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.get(this.url+'user-topics/'+userId,{headers:headers})
  }

  getTopic(topicId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._http.get(this.url+'topic/'+topicId,{headers:headers})
  }

  update(token:string,topicId:string,topic:Topic): Observable<any>{
    let params = JSON.stringify(topic)
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token)
    return this._http.put(this.url+'topic/'+topicId,params,{headers:headers})
  }

  delete(token:string,topicId:string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token)
    return this._http.delete(this.url+'topic/'+topicId,{headers:headers})
  }

  getTopics(page:any = 1): Observable<any>{
    return this._http.get(this.url+'topics/'+page)
  }

  search(searchString : string): Observable<any>{
    return this._http.get(this.url+'search/'+searchString)
  }
}
