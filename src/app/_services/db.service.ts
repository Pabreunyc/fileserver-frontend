import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl + 'db/';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http:HttpClient) {
  }

  base():Observable<any> {
    return this.http.get(apiUrl);
  }

  saveFileInfo(data):Observable<any> {
    return this.http.post(apiUrl + 'saveInfo', data);
  }

  getMaintenanceFiles():Observable<any> {
    return this.http.get(apiUrl + 'getFilesMaintenance');
  }
  getHelpdeskFiles():Observable<any> {
    return this.http.get(apiUrl + 'getFilesHelpdesk');
  }
}