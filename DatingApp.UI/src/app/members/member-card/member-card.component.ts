import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user:User | undefined;

  constructor(private authService: AuthService, private userService:UserService
    , private alertify:AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id:any)
  {
    this.userService.sendLike(this.authService.decodedToken.nameid,id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user?.knownAs);
    }, error => {
      this.alertify.error('You have already like this user');
    });
  }
}