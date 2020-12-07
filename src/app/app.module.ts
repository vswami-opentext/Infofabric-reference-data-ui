import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ReferenceDatagridComponent } from './components/reference-datagrid/reference-datagrid.component';
import { ExportComponent } from './components/export/export.component';
import { ImportComponent } from './components/import/import.component';
import { FilterComponent } from './components/filter/filter.component';
import { DataTableModule, ModalModule, DialogueboxModule } from 'tgocp-ng/dist';
import { PopUpComponent } from './shared/pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    ReferenceDatagridComponent,
    ExportComponent,
    ImportComponent,
    FilterComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,
    ModalModule,
    DialogueboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
