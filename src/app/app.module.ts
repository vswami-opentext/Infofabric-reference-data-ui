import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ReferenceDatagridComponent } from './components/reference-datagrid/reference-datagrid.component';
import { ExportComponent } from './components/export/export.component';
import { ImportComponent } from './components/import/import.component';
import { FilterComponent } from './components/filter/filter.component';
import { DataTableModule, ModalModule, DialogueboxModule, SelectDropdownModule, NotificationModule } from 'tgocp-ng/dist';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { AddCompComponent } from './components/add-comp/add-comp.component';
import { NotificationComponent } from './shared/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    ReferenceDatagridComponent,
    ExportComponent,
    ImportComponent,
    FilterComponent,
    PopUpComponent,
    AddCompComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,
    ModalModule,
    DialogueboxModule,
    BrowserAnimationsModule,
    SelectDropdownModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
