import { environment } from './../../environments/environment';
import { ContentService } from './content.service';
import { NgModule } from '@angular/core';
import { ContentComponent } from './content.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared.module';
import { WallpaperizeComponent } from './wallpaperize/wallpaperize.component';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    ContentComponent,
    WallpaperizeComponent
  ],
  exports: [
    ContentComponent
  ],
  providers: [
    ContentService
  ]
})
export class ContentModule {}
