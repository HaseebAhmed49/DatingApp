import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { User } from "../_models/User";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor(private userService: UserService,  
        private authService:AuthService,
        private router:Router, private alertify:AlertifyService){}

        resolve(route: ActivatedRouteSnapshot): Observable<User>{
            console.log(this.authService.decodedToken.nameid);
            return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
                catchError(error => {
                    this.alertify.error('Problem retreiving your Data');
                    this.router.navigate(['/members']);
                    return of();
                })
            );
        }
}