import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/services/user.service';

const URL = 'http://localhost:3000/api/blogapp/upload-image';

@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.css']
})
export class ChangeProfilePicComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  selectedFile: any;
  successMessage: String;
  errorMessage: String;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  OnFileSelected(event) {
    let fileInput = <any>document.querySelector( ".input-file" );
    let the_return = document.querySelector(".file-return");;
    let path = fileInput.value.split('\\');
    the_return.innerHTML = path[path.length-1];
    document.querySelector('.updateBtn').classList.remove('disabled');
    const file: File = event[0];
    this.ReadAsBase64(file).then(result => {
      this.selectedFile = result;
    }).catch(err => console.log(err));
  }

  Upload() {
    document.querySelector('.file-return').innerHTML = '';
    document.querySelector('.updateBtn').classList.add('disabled');
    if(this.selectedFile) {
      document.querySelector('form').classList.add('loading');
      this.userService.addImage(this.selectedFile).subscribe(data => {
        document.querySelector('form').classList.remove('loading');
        this.successMessage = 'Updated profile picture successfully';
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
