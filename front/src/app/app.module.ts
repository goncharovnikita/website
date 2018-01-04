import { SharedModule } from './shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContentModule } from './content/content.module';
import { environment } from '../environments/environment';
import { ScrollModule } from './scroll/scroll.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContentModule,
    SharedModule.forRoot()
  ],
  providers: [
    { provide: 'BASE_URL', useValue: environment.baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
