import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.css"]
})
export class DocumentComponent implements OnInit {
  uploadedFiles: any[] = [];
  vDocumentForm: FormGroup;
  public vBase: string;
  constructor(
    private formBuilder: FormBuilder
  ) {}
  onUpload(event) {
    this.getBase(event.files[0]);
  }

  getBase(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      console.log(fileReader.result.toString());
    };
  }

  ngOnInit(): void {}
}
