import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { User } from "../_models/User";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class MemberListResolver implements Resolve<User[]>{
    constructor(private userService: UserService, 
        private router:Router, private alertify:AlertifyService){}

        resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
            return this.userService.getUsers().pipe(
                catchError(error => {
                    this.alertify.error('Problem retreiving Data');
                    this.router.navigate(['/home']);
                    return of();
                })
            );
        }
}