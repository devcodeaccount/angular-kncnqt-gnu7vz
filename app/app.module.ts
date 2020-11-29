import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { AppComponent } from '../app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ListViewAllModule,
    RichTextEditorAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }