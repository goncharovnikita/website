import { environment } from './../../environments/environment';
import { ContentService } from './content.service';
import { MediumContentComponent } from './medium/medium.component';
import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    ContentComponent,
    MediumContentComponent
  ],
  exports: [
    ContentComponent
  ],
  providers: [
    ContentService
  ]
})
export class ContentModule {}
