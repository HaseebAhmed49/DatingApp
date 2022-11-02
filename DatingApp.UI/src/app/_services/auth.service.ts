import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl=environment.apiUrl+'Auth/';
  jwtHelper = new JwtHelperService();
  token:any;
  decodedToken:any;
  currentUser: any;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http:HttpClient) { }

  changeMemberPhoto(photoUrl: string){
    this.photoUrl.next(photoUrl);
  }

  login(model:any){
    return this.http.post(this.baseUrl+'login',model)
    .pipe(
      map((response:any) =>{
        const user=response;
        if(user){
          localStorage.setItem('token',user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);  
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user:any){
    return this.http.post(this.baseUrl+'register',user);
  }

  loggedIn(){
    this.token = localStorage.getItem('token');
    // return  True if token expired
    return !this.jwtHelper.isTokenExpired(this.token); 
  }
}
