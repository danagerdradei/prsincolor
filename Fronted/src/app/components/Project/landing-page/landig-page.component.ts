import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectFilter } from 'src/app/model/ProjectFilter';
import { User } from 'src/app/model/User';
import { UserVote } from 'src/app/model/Vote';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ElectionService } from 'src/app/service/election.service';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-search-project',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  actualUserVote: UserVote = null;
  currentUser: User = null;
  showResult: boolean = false;
  showVote: boolean = false;
  optionButtomText: string = "VOTAR AHORA";
  electionInfo: any = null;
  results: any = null;

  constructor(
    private authenticationService: AuthenticationService,
    private voteService: VoteService,
    private electionService: ElectionService
  ) { }

  ngOnInit() {
    //console.log("Inicio landing");
    this.optionButtomText = "VOTAR AHORA";
    this.getElectionIfo(true);
    this.scrollToSection();
    
  }

  getElectionIfo(crateVote:boolean = false) {
    this.electionService.getElectionInfo().subscribe({
      next: (result) => { 
        //console.log("election",result);
        if (result) {
          this.electionInfo =  result;
          if(crateVote)
            this.createUserVote();
        }
        else{
          this.actualUserVote =   null;
        }
      }
    });
  }

  scrollToSection(): void {
    const sectionId = 'footer-section';
    setTimeout(() => {
      const sectionToScroll = document.getElementById(sectionId);
      if (sectionToScroll) {
        sectionToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);  // Pequeño retraso para asegurarse que el DOM está listo
  }
  
  
  
  createUserVote() {
    //console.log("entro a createUserVote");
    this.currentUser = this.authenticationService.getCurentUser();
     this.voteService.save( { userId : this.currentUser.id}).subscribe({
      next: (result) => { 
        //console.log("user Vote response",result);
        if (result) {
          this.actualUserVote =  result;
          this.changeOptionButtonIfo();
        }
        else{
          this.actualUserVote =   null;
        }
      }
    });
  
  }

changeOptionButtonIfo(){
  //console.log("changeOptionButtonIfo",this.actualUserVote);
  if(this.actualUserVote.winnerCandidateId !== null || this.actualUserVote.draw )
  {
    this.showVote = false;
    this.showResult = true;
  }
  else
  {
    this.showVote = true;
    this.showResult = false;
  }

   //console.log("boton",this.optionButtomText)
}

handleResult(result: any) { 
  //console.log("handled",result)
  this.results = result;
  this.showVote = false;
  this.showResult = true;
  this.getElectionIfo();
}

handledRepeat(result: any) { 
  //console.log("handled repeat",result)
  if(result.isDelete)
  {
    this.createUserVote();
  }
}
}
