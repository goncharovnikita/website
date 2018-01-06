import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
  private readonly GET_RANDOM_IMAGE_URL = 'get/random/image';
  private readonly REFRESH_RANDOM_IMAGE_URL = 'refresh/random/image';
  image = new BehaviorSubject('');
  refreshingImage = new BehaviorSubject(false);
  constructor(
    private $http: HttpClient,
    @Inject('BASE_URL') private baseURL: string
  ) {}

  fetchRandomImage(): Observable<string> {
    return this.$http.get(this.baseURL + this.GET_RANDOM_IMAGE_URL, {responseType: 'arraybuffer'})
      .map((b: ArrayBuffer) => {
        return new Blob([b], {type: 'image/jpeg'});
      }).map(b => URL.createObjectURL(b));
  }

  refreshRandomImage(): Observable<string> {
    this.refreshingImage.next(true);
    return this.$http.get(this.baseURL + this.REFRESH_RANDOM_IMAGE_URL)
      .switchMap(() => {
        return this.fetchRandomImage();
      });
  }
}
