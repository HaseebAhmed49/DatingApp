import { Component, Input, OnInit } from '@angular/core';
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

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;
  file!: File;

  baseUrl= environment.apiUrl;
 
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
  
    // this.uploader.onSuccessItem = (item, response, status, headers) => {
    //   if(response){
    //     const res: Photo = JSON.parse(response);
    //     const photo = {
    //       id: res.id,
    //       url: res.url,
    //       dateAdded: res.dateAdded,
    //       description: res.description,
    //       isMain: res.isMain
    //     };
    //     this.photos.push(photo);
    //   }
    // }
  }
  ngOnInit() {
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo:Photo){
    console.log(photo);
    this.userService.setMainPhoto(this.authService.decodedToken.nameid,photo.id).subscribe(() => {
      console.log('Successfully set to Main');
    },error => {
      this.alertify.error(error);
    });
  }
}
