import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContentModule } from './content/content.module';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContentModule
  ],
  providers: [
    { provide: 'BASE_URL', useValue: environment.baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
