import {  Component,  Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  @Input() electionInfo: any;
  constructor() {
      
      }
  ngOnInit(): void {
  }

}
