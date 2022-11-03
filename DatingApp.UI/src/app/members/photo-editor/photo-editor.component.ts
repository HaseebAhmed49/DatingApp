import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos:any;
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;
  file!: File;

  baseUrl= environment.apiUrl;
 
  currentMainPhoto: any;

  constructor (private authService:AuthService, private userService:UserService, private alertify: AlertifyService){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
 
    this.hasBaseDropZoneOver = false;
 
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );    
  
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if(photo.isMain)
        {
          this.authService.changeMemberPhoto(photo.url);  
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    
        }
      }
    }
  }
  ngOnInit() {
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo:Photo){
    console.log(photo);
    this.userService.setMainPhoto(this.authService.decodedToken.nameid,photo.id).subscribe(() => {
      this.currentMainPhoto = this.photos.filter((p: { isMain: boolean; }) => p.isMain ==  true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);  
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    },error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id:number){
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid,id).subscribe(() => {
        // Remove elements from array
        this.photos.splice(this.photos.findIndex((p: { id: number; }) => p.id == id),1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }
}
