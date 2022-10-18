import { Component, OnInit , HostListener, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user?:User;

  constructor(private userService:UserService,
    private alertify:AlertifyService,
    private route:ActivatedRoute,
    private el:ElementRef) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  @HostListener('click')
    imageChange(){
      var src:any = this.el.nativeElement as HTMLElement;
       var prev:any = document.getElementById("preview");
       console.log(src);
       console.log(prev);
      // prev.src = src;
      // this.el.nativeElement.parentElement.classList.add("active");
    }
  

  // members/4
  // loadUser()
  // {
  //   this.userService.getUser(this.route.snapshot.params['id']).subscribe((user:User) => {
  //     this.user=user;
  //   },error => {
  //     this.alertify.error(error);
  //   });
  // }
}
