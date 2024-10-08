import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectFilter } from 'src/app/model/ProjectFilter';
import { User } from 'src/app/model/User';
import { UserVote } from 'src/app/model/Vote';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ElectionService } from 'src/app/service/election.service';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-result-by-user',
  templateUrl: './result-by-user-page.component.html',
  styleUrls: ['./result-by-user-page.component.css']
})
export class ResultByUserPageComponent implements OnInit {
  code: string = '';
  actualUserVote: UserVote = null;
  currentUser: User = null;
  showResult: boolean = false;
  showVote: boolean = false;
  electionInfo: any = null;
  results: any = null;
  principalCandidate: any = null;

  constructor(
    private route: ActivatedRoute,
    private electionService: ElectionService
  ) { }

  ngOnInit() {

    this.code = this.route.snapshot.params['code'];
    this.getElectionIfo();
    
  }

  getElectionIfo() {
    this.electionService.getElectionInfo().subscribe({
      next: (result) => { 
        //console.log("election",result);
        if (result) {
          this.electionInfo =  result;
        }
        else{
          this.actualUserVote =   null;
        }
      }
    });
  }

 


}
