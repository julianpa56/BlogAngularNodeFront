import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from '../global';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url : string
  public identity : any
  public token : any

  constructor(
    private _http: HttpClient
  ) 
  { 
    this.url = global.url
  }

  getIdentity(){
    let storage = localStorage.getItem('identity') || '' 
    let identity = null
    if(storage != ''){
      identity = JSON.parse(storage)
    }

    if(identity != null){
      this.identity = identity
    }
    else {
      this.identity = null
    }
    return this.identity
  }

  getToken(){
    let token = localStorage.getItem('token')||''
    if(token != ''){
      this.token = token
    }
    else {
      this.token = null
    }
    return this.token
  }
  
  register(user:User): Observable<any>{
    // Convertir el objeto del usuario a un json string
    let params = JSON.stringify(user)
    
    // Definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type','application/json')

    // Hacer peticion ajax
    return this._http.post(this.url+'register',params, {headers:headers})

  }

  signup(user:any, gettoken:any = null): Observable<any>{
    // Comprobar si llega el gettoken
    if(gettoken != null){
      user.gettoken = gettoken
    }
    // Convertir el objeto del usuario a un json string
    let params = JSON.stringify(user)
    
    // Definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type','application/json')

    // Hacer peticion ajax
    return this._http.post(this.url+'login',params, {headers:headers})

  }

  update(user:any): Observable<any>{
    let params = JSON.stringify(user)
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization',this.getToken())
    return this._http.put(this.url+'update',params,{headers:headers})
  }

  getUsers(): Observable<any>{
    return this._http.get(this.url+'users')
  }
  getUser(userId:string): Observable<any>{
    return this._http.get(this.url+'user/'+userId)
  }
}
