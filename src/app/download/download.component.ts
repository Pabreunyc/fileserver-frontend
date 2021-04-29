import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DbService } from '../_services/db.service';
import { FileService } from '../_services/file.service';
import { map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit, OnDestroy {
moduleList:SelectItem[] = [];
availFiles: SelectItem[] = [];
selectedModule:Selection;

selectModForm:FormGroup;

  constructor(
    private fileService:FileService,
    private dbService:DbService,
    private fb:FormBuilder
  ) {

  }

  ngOnInit() {
    console.log('%cDownloadComponent.onInit', 'background-color:black;color:white');
    this.fileService.getModules().subscribe(el => {
      this.moduleList =  el.map(e => { return {label:e, value:e } });
      this.moduleList.unshift({label:'Select Module', value:null});
    });
    this.initForm();
  }
  ngOnDestroy() {
    console.log('%cDownloadComponent.onInit', 'background-color:black;color:black');
  }
  // ==========================================================================

  selectModule(evt) {
    let module = evt.value;
    let cmd = undefined;
    console.log('selectModule', module);
    
    switch(module) {
      case 'helpdesk': {
        this.availFiles = [];
        this.dbService.getHelpdeskFiles().subscribe(r => {
          console.log('helpdesk', r);
          this.availFiles = r.map(e => {
            return {label:e.filename, value:e.id};
          });
        });
        break;
      }
      case 'maintenance': {
        this.availFiles = [];
        this.dbService.getMaintenanceFiles().subscribe(r => {
          console.log('maintenance', r);
          this.availFiles = r.map(e => {
            return {label:e.file_name, value:e.record_id};
          });
        });
        break;
      }
      default: {
        cmd = undefined; break;
      }
    }
  }
  
  selectFile(evt) {
    console.log('selectFile', evt.value);
  }

  onSubmit(form) {
    console.log('onSubmit:', form.values);
    let fileId = parseInt(form.values.fc_selectedFile);
    console.log('download', fileId);

    if((fileId === 0) || isNaN(fileId) ) {
      alert('Wrong fileId');
      return;
    }

    this.fileService.download(fileId)
      .subscribe(e => {
        console.log(e);
      });
  }

  // ==========================================================================
  initForm() {
    this.selectModForm = this.fb.group( {
      fc_module: [''],
      fc_selectedFile: [''],
      fc_selectModule: ['']
    });
  }
}
