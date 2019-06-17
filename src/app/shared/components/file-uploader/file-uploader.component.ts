import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
})
export class FileUploaderComponent    {

@Output() imageData = new EventEmitter()

  constructor() {}


  onFileSelect(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageData.emit(e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  

}
