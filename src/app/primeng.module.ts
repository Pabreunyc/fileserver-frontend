import { NgModule } from '@angular/core';

import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [],
  exports: [
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    MenubarModule,
    RadioButtonModule,
    TabMenuModule,
    TabViewModule,
  ]
})
export class PrimengModule { }
