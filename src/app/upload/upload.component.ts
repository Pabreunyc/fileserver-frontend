import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FileService } from 'src/app/_services/file.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { DbService } from '../_services/db.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy, AfterViewInit {
@ViewChild('fileUpload', {static:false} ) fileUploadRef:ElementRef;
@ViewChild('uploadForm', {static:false}) uploadFormRef:Form;
public moduleList$:Observable<string[]>

public uploadForm;

  constructor(
    private filService:FileService,
    private dbService:DbService,
    private fb:FormBuilder
  ) {
  }

  ngOnInit() {
    console.log('%cUploadComponent.onInit', 'background-color:black;color:white');
    this.moduleList$ = this.filService.getModules();
    this.initForm();
  }
  ngOnDestroy() {
    console.log('%cUploadComponent.onInit', 'background-color:red;color:black');
  }
  ngAfterViewInit() {
    console.log('%cUploadComponent.afterViewInit', 'background-color:yellow;color:black');    
  }

  // convenience getter for easy access to form fields
  get f() { 
    if(this.uploadForm)
      return this.uploadForm.controls;
  }
  // --------------------------------------------------------------------------

  onSubmit(evt) {
    let fileData = undefined;
    const { fc_username, fc_module } = this.uploadForm.value;
    console.log({ fc_username, fc_module });
    console.log('onSubmit.files', this.fileUploadRef.nativeElement.files);
    
    fileData = {
      username: fc_username.trim(),
      module: fc_module.trim(),
      files: this.fileUploadRef.nativeElement.files,
    }

    this.filService.upload(fileData).pipe(
      catchError(err => {
        console.log('Error', err);
        return throwError(err);
      }),
      switchMap( res => {
        console.log('switchMap', res);        
        let { filetype, filesize } = res;
        let filepath = res.destFile;

        return this.dbService.saveFileInfo({
          module: fc_module,
          filename: res.originalFilename,
          filetype: filetype,
          filesize: filesize,
          filepath: res.destFile
        });
      })
    )
    .subscribe(res => {
        // getting results from inner obs( dbService.base)
        console.log('file.Upload:', res);
        alert(`${res.module} file uploaded. ID: ${res.fileId}`);
        this.uploadForm.reset();
      },
      err => { console.log(err) },
      () => console.log('COMPLETE')
    );
  }

  // --------------------------------------------------------------------------
  initForm() {
    this.uploadForm = this.fb.group( {
      fc_username:  ['', Validators.required],
      fc_module:    [null, Validators.required],
      fc_fupload:   [null, Validators.required]
    });

  }
}
