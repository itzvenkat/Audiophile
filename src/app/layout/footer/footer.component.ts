import { Component, OnInit } from '@angular/core';
import { APP } from 'src/app/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  linkedInLoc = APP.linkedInLoc;
  linkedInUrl = APP.linkedInUrl;
  githubLoc = APP.githubLoc;
  githubUrl = APP.githubUrl;
  resumeLoc = APP.resumeLoc;
  resumeUrl = APP.resumeUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
