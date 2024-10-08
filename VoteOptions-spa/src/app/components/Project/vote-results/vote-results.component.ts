import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserVote } from 'src/app/model/Vote';
import { VoteService } from 'src/app/service/vote.service';
import { StorageService } from '../../../service/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vote-results',
  templateUrl: './vote-results.component.html',
  styleUrls: ['./vote-results.component.css']
})
export class VoteResultsComponent implements OnInit {

  @Input() actualUserVote: UserVote
  @Input() generatedResults: any = null;
  @Output() repeatEvent = new EventEmitter<any>();

results: any = null;
principalCandidate: any = null;
otherCandidates: any[] = null;
buttonText: string = "Compartir"
shareUrl: string;

  constructor(
    private voteService : VoteService
    ) {
      
      }


  ngOnInit(): void {
    this.shareUrl = `${environment.baseFrontUrl}#/user-result/${this.actualUserVote.id}`;
    //console.log(this.shareUrl);
    this.getResults();
    this.updateSocialLinks();
  }

getResults() {
  if(this.generatedResults ===null)
  {
    this.voteService.getResults(this.actualUserVote.userElectionId ).subscribe({
      next: (result) => {
        if (result) {
          this.results = result;
          this.setResultsInfo();
        }
      }
    });
  }
  else
  {
    this.results = this.generatedResults;
    this.setResultsInfo();
  }
  }

setResultsInfo()
{
  //console.log("setResultsInfo",this.results);
  if (this.results.candidates && this.results.candidates.length > 1) {
    this.principalCandidate = this.results.candidates[0];
    this.otherCandidates = this.results.candidates.slice(1); // Extrae desde el índice 1 en adelante
  } else {
    this.principalCandidate = this.results.candidates[0];
    this.otherCandidates = []; // Si no hay más candidatos, deja un array vacío
  }
  if(this.results.repeat)
    this.buttonText = "Repetir"
  else{
    this.buttonText = "Compartir"
  }
}

onClick() {
  this.voteService.deleteUserVote({ userVoteId: this.actualUserVote.id}).subscribe({
    next: (result) => { 
      //console.log("onClick delete userVote",result);
      if (result) {
        this.repeatEvent.emit(result);
      }  
    }
  });
}

  updateSocialLinks(): void {
    const whatsappShare = document.getElementById('whatsappShare') as HTMLAnchorElement;
    const facebookShare = document.getElementById('facebookShare') as HTMLAnchorElement;
    const twitterShare = document.getElementById('twitterShare') as HTMLAnchorElement;
    const emailShare = document.getElementById('emailShare') as HTMLAnchorElement;
    const instagramShare = document.getElementById('instagramShare') as HTMLAnchorElement;

    const encodedUrl = encodeURIComponent(this.shareUrl);

    if (whatsappShare) {
      whatsappShare.href = `https://api.whatsapp.com/send?text=${encodedUrl}`;
    }
    if (facebookShare) {
      facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }
    if (twitterShare) {
      twitterShare.href = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
    }
    if (emailShare) {
      emailShare.href = `mailto:?subject=Tarjeta de Resultados&body=Tu tarjeta de resultados: ${encodedUrl}`;
    }
    if (instagramShare) {
      instagramShare.href = `https://www.instagram.com/?url=${encodedUrl}`; // Instagram no tiene API de compartir directa
    }
  }

}
