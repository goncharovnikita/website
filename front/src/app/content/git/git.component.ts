import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ContentService } from './../content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.sass']
})
export class GitContentComponent implements OnInit {
  repos: BehaviorSubject<gitRepoUnit[]> = new BehaviorSubject(null);

  constructor(private $s: ContentService) {}
  ngOnInit() {
    //
  }
}
