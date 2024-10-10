import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserVote } from 'src/app/model/Vote';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  code: string = '';
  actualUserVote: UserVote = null;
  currentUser: User = null;
  showResult: boolean = false;
  showVote: boolean = false;
  electionInfo: any = null;
  results: any = null;
  principalCandidate: any = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { 
  }



  voteNow() {
    let currentUser = this.authenticationService.getCurentUser();
    if (currentUser)
        this.router.navigate(['/LandingPage']);
    else
      this.router.navigate(['/login']);
  }


}
