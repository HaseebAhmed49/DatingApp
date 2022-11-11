import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { PaginatedResults } from "../_models/Pagination";
import { User } from "../_models/User";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class ListsResolver implements Resolve<PaginatedResults<User[]>>{
    pageNumber = 1;
    pageSize = 5;
    likeParam = 'likers';

    constructor(private userService: UserService, 
        private router:Router, private alertify:AlertifyService){}

        resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResults<User[]>>{
            return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParam).pipe(
                catchError(error => {
                    this.alertify.error('Problem retreiving Data');
                    this.router.navigate(['/home']);
                    return of();
                })
            );
        }
}