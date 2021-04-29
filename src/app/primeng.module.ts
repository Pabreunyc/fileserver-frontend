import { NgModule } from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [],
  exports: [
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    ListboxModule,
    MenubarModule,
    RadioButtonModule,
    TabMenuModule,
    TabViewModule,
  ]
})
export class PrimengModule { }
