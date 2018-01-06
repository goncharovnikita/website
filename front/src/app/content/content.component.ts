import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
  refreshing: Observable<boolean>;
  constructor(private $app: AppService) {}
  ngOnInit() {}

  refreshBackground() {
    this.refreshing = this.$app.refreshingImage;
    this.$app.refreshRandomImage()
      .subscribe(v => {
        this.$app.image.next(`url(${v})`);
        this.$app.refreshingImage.next(false);
      });
  }
}
