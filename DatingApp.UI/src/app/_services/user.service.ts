import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

const httpOptions = {
  headers:new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'user',httpOptions);
  }

  getUser(id: string):Observable<User>{
    return this.http.get<User>(this.baseUrl+'user/'+id,httpOptions);    
  }

  updateUser(id:string, user:User){
    console.log(user);
    return this.http.put(this.baseUrl + 'user/'+id,user,httpOptions);
  }

  setMainPhoto(userId:string,id:number)
  {
    return this.http.post(this.baseUrl + 'user/' + userId + '/photos/' + id + '/setMain',{},httpOptions);
  }

  deletePhoto(userId:string,id:number)
  {
    return this.http.delete(this.baseUrl + 'user/'+userId + '/photos/'+id,httpOptions);
  }
}
