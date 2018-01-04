import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {
  private readonly GET_MEDIUM_FEED = 'get/medium/feed';
  private readonly GET_GIT_REPOS   = 'get/git/repos';
  constructor(
    private $h: HttpClient,
    @Inject('BASE_URL') private baseURL: string
  ) {}

  fetchMediumFeed(): Observable<mediumFeed> {
    return this.$h.get(this.baseURL + this.GET_MEDIUM_FEED).map(r => <mediumFeed>r);
  }

  fetchGitRepos(): Observable<gitRepoUnit[]> {
    return this.$h.get(this.baseURL + this.GET_GIT_REPOS).map(r => <gitRepoUnit[]>r);
  }
}
