import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserVote } from 'src/app/model/Vote';
import { VoteService } from 'src/app/service/vote.service';
import { StorageService } from '../../../service/storage.service';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote-winner-results',
  templateUrl: './vote-winner-result.component.html',
  styleUrls: ['./vote-winner-result.component.css']
})
export class VoteWinnerResultsComponent implements OnInit {

  @Input() code: string;
  actualUserVote: UserVote = null;
  currentUser: User = null;
  showResult: boolean = false;
  showVote: boolean = false;
  electionInfo: any = null;
  results: any = null;
  principalCandidate: any = null;

  constructor(private voteService:VoteService , private router: Router) {
      
      }


  ngOnInit(): void {
    this.getUserVote();
  }


  getUserVote() {
    this.voteService.getUserVote( this.code).subscribe({
     next: (result) => { 
       if (result) {
         this.actualUserVote =  result;
         this.getResults();
       }
       else{
         this.actualUserVote =   null;
       }
     }
   });
 
 }

getResults() {
 //console.log("entro a getResults");
   this.voteService.getResults(this.actualUserVote.userElectionId ).subscribe({
     next: (result) => {
       if (result) {
         this.results = result;
         this.setResultsInfo();
       }
     }
   });
 }
  setResultsInfo()
  {
      this.principalCandidate = this.results.candidates[0];
  }

  doTest()
  {
    this.router.navigate(['']);
  }

}
