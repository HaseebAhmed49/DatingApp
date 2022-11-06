import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResults } from '../_models/Pagination';
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

  getUsers(page?: number, itemsPerPage?:number):Observable<PaginatedResults<User[]>>{
    const paginatedResult: PaginatedResults<User[]> = new PaginatedResults<User[]>();
    let parameters = new HttpParams();

    if(page != null && itemsPerPage !=null){
      parameters = parameters.append('pageNumber',page);
      parameters = parameters.append('pageSize',itemsPerPage);
    }
    return this.http.get<PaginatedResults<User[]>>(this.baseUrl+'user',
     {headers: httpOptions.headers,observe: 'response', params: parameters})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination')!=null){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      );
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
