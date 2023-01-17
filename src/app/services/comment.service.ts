import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from '../global';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public url
  
  
  constructor(
    private _http: HttpClient
  ) { 
    this.url = global.url
  }

  add(token:string,comment: Comment,topicId: any): Observable<any>{
    let params = JSON.stringify(comment)
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token)
    return this._http.post(this.url+'comment/topic/'+topicId,params,{headers:headers})
  }

  delete(token:string,topicId: string, commentId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',token)
    return this._http.delete(this.url+'comment/'+topicId+'/'+commentId,{headers:headers})
  }
}
