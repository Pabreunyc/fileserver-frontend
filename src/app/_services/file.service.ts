import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl + 'fileservice/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) {
    console.log('file.service.constructor', apiUrl);
  }

  getModules():Observable<string[]> {
    return this.http.get<string[]>(apiUrl + 'modules');      
  }

  upload(data):Observable<any> {
    const fd = new FormData();
    console.log('>>', data);
    fd.append('files', data.files[0]);
    fd.append('username', data.username);
    fd.append('module', data.module);
    return this.http.post(apiUrl + 'upload', fd).pipe(
      catchError( err => {
        console.log('FileService.upload.ERR', err);
        return throwError(err.error);
      })
    );
  }

  upload2(data:IUpload):Observable<IUploadResponse[]> {
    let calls = [];

    for(let i=0; i<data.files.length; i++) {
      let fd = new FormData();
      fd.append('username', data.username);
      fd.append('module', data.module);
      fd.append('files', data.files[i]);
      calls.push(this.http.post(apiUrl + 'upload', fd));
    }
    console.log('Calling:', calls);
    return forkJoin(calls);
  }

  uploadMulti(data):Observable<any> {
    const fd = new FormData();
    console.log('uploadMulti', data);

    for(let i=0; i<data.files.length; i++) {
      fd.append('files', data.files[i]);  
    }

    fd.append('username', data.username);
    fd.append('module', data.module);
    return this.http.post(apiUrl + 'uploadMulti', fd).pipe(
      catchError( err => {
        console.log('FileService.uploadMulti.ERR', err);
        return throwError(err.error);
      })
    );
  }

  download(module, fileId):Observable<any> {
    let fd = new FormData();

    fd.append('fileId', fileId);
    fd.append('module', module);

    console.log('download', {module,fileId});
    return this.http.post(apiUrl + 'download', fd, {responseType: 'blob'})
      .pipe(
        catchError( err => {
          console.log('FileService.download.ERR', err);
          return throwError(err.message);
        })
      );
  }
}

export interface IUpload {
  files: File[],
  username: string,
  module: string,
  folder?: string
};
export interface IUploadResponse {    
  destFile: string //full path on server
  filename: string // as on user's PC
  owner: string  
  size: number,
  type: string,
  hash: string,
  timeStamp: number
}

/*
  activeDrivePath: "file://192.168.1.173//public/"
  destDir: "file://192.168.1.173/public/cbg_masterdoc/helpdesk"
  destFile: "file://192.168.1.173/public/cbg_masterdoc/helpdesk/sam_5qbopkjrug6b8dbenk7x7k.docx"
  filename: "sam_5qbopkjrug6b8dbenk7x7k.docx"
  moduleDirectory: "helpdesk"
  os: "win32"
  timeStamp: "Wed Apr 28 2021 11:39:04 GMT-0400 (Eastern Daylight Time)"
*/