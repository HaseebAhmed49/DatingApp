import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

const httpOptoins = {
  headers:new HttpHeaders({
    'Auth':'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= environment.apiUrl;
  token = localStorage.getItem('token');

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    const httpHeaders = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Authorization': 'Bearer '+ this.token,
      })};
    console.log(localStorage.getItem('token'));    
    return this.http.get<User[]>(this.baseUrl+'user',httpOptoins);
  }

  getUser(id: string):Observable<User>{
    return this.http.get<User>(this.baseUrl+'user/'+id,httpOptoins);    
  }

  updateUser(id:string, user:User){
    console.log(id);
    return this.http.put(this.baseUrl + 'user/'+id,user,httpOptoins);
  }
}
