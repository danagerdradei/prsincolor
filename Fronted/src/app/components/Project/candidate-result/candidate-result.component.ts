import {  Component,  Input, OnInit } from '@angular/core';
import { ElectionService } from 'src/app/service/election.service';

@Component({
  selector: 'app-candidate-result',
  templateUrl: './candidate-result.component.html',
  styleUrls: ['./candidate-result.component.css']
})
export class CandidateResultComponent implements OnInit {

  electionInfo: any;
  constructor(private electionService: ElectionService) {
      
      }
      ngOnInit() {

        this.getElectionIfo();
        
      }
    
      getElectionIfo() {
        this.electionService.getElectionInfo().subscribe({
          next: (result) => { 
            console.log("election",result);
            if (result) {
              this.electionInfo =  result;
            }
          }
        });
      }
    
}
