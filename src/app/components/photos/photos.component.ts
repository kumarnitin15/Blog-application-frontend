import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

const URL = 'http://localhost:3000/api/blogapp/upload-image';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  user: any;
  images = [];
  selectedFile: any;
  successMessage: String;
  errorMessage: String;

  constructor(private userService: UserService, private tokenService: TokenService) { }

  ngOnInit() {
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.images = this.user.images;
    })
  }

  OnFileSelected(event) {
    let fileInput = <any>document.querySelector( ".input-file" );
    let the_return = document.querySelector(".file-return");;
    let path = fileInput.value.split('\\');
    the_return.innerHTML = path[path.length-1];
    document.querySelector('.uploadBtn').classList.remove('disabled');
    const file: File = event[0];
    this.ReadAsBase64(file).then(result => {
      this.selectedFile = result;
    }).catch(err => console.log(err));
  }

  Upload() {
    document.querySelector('.file-return').innerHTML = '';
    document.querySelector('.uploadBtn').classList.add('disabled');
    if(this.selectedFile) {
      document.querySelector('form').classList.add('loading');
      this.userService.addImage(this.selectedFile).subscribe(data => {
        document.querySelector('form').classList.remove('loading');
        this.successMessage = 'Uploaded picture successfully';
      }, err => {
        console.log(err);
        this.errorMessage = 'Error occured. Please try again';
      });
    }
  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve,reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.addEventListener('error', (event) => {
        reject(event);
      });
      reader.readAsDataURL(file);
    });
    return fileValue;
  }

}
