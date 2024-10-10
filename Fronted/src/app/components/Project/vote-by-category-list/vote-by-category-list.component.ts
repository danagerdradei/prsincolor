import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../../service/categories.service';
import { Router } from '@angular/router';
import { CategoriesByElection, ElectionCategories } from 'src/app/model/Category';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProposalService } from 'src/app/service/proposal.service';
import { Proposal } from 'src/app/model/Report';
import { OptionVote, UserVote, VoteInfo } from 'src/app/model/Vote';
import { User } from 'src/app/model/User';
import { VoteService } from 'src/app/service/vote.service';

@Component({
  selector: 'app-vote-by-categories-list',
  templateUrl: './vote-by-category-list.component.html',
  styleUrls: ['./vote-by-category-list.component.css']
})
export class VoteByCategoryListComponent implements OnInit {
  @Input() actualUserVote: UserVote;
  @Output() resultEvent = new EventEmitter<any>();

  currentYear: number;
  currentCantegory: CategoriesByElection;
  showTextIndex: number = 0;
  item: number = 0;
  currentElection: ElectionCategories;
  proposals: Proposal[] = []
  isAdmind = false;
  totalCategories: number = 0;
  proposalsGrouped: any[] = [];
  selectedProposal: Proposal | null = null;
  currentUser: User = null;
  continue: boolean = true;

  constructor(
    private CategoriesService: CategoriesService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private proposalService: ProposalService,
    private voteService: VoteService
  ) { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.getCategories();
  }

  exit() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  onNextClick() {
    this.showTextIndex++;
    //console.log('Propuesta seleccionada para el voto:', this.selectedProposal);
    if (this.selectedProposal === null)
      return;
    //console.log('total Categories:', this.totalCategories);
    //console.log('show Text Index:', this.showTextIndex);
    //console.log('continue', this.continue);
    if (this.totalCategories >= this.showTextIndex && this.continue)
      this.createVote();

    if (this.totalCategories == this.showTextIndex)
      this.generateResults();
  }

  private getCategories() {
    if (this.actualUserVote.winnerCandidateId !== null)
      return;

    this.CategoriesService.getAll(this.currentYear, 1, 10, true , this.actualUserVote.id).subscribe({
      next: (result) => {
        if (result) {
          this.currentElection = result[0];
          //console.log("user vote", this.actualUserVote);
          //console.log("current election ", this.currentElection);
          //console.log("current categories ", this.currentElection.categories);

          this.totalCategories = this.currentElection.categories.length;
          this.printProposals(this.showTextIndex);
        }
      }
    });
  }

  printProposals(index: number) {
    console.log(index);
    this.item = index + 1;
    //console.log(this.currentElection);
    this.currentCantegory = this.currentElection.categories[index];
    //console.log("current category", this.currentCantegory);
    var categoryByElectionId = this.currentCantegory.categoriesByElectionItemsId
    this.proposalService.get(categoryByElectionId, 1, 10).subscribe({
      next: (result) => {
        if (result) {
          //console.log(result);
          this.proposals = result;
          this.proposalsGrouped = this.groupProposals(this.proposals);
        }
      }
    });
  }

  groupProposals(proposals: any[]): any[] {
    const grouped = [];
    for (let i = 0; i < proposals.length; i += 2) {
      grouped.push(proposals.slice(i, i + 2));
    }
    return grouped;
  }

  unSelectedOptions() {
    const options = document.querySelectorAll('.new-option');
    options.forEach((option, i) => {
      option.classList.remove('new-selected');
    });
  }

  selectProposal(proposal: Proposal) {
    this.unSelectedOptions();
    const element = document.getElementById(proposal.id);
  if (element) {
    element.classList.add('new-selected');

  } else {
    //console.log('Elemento con id="proposal-1" no encontrado');
  }
    this.selectedProposal = proposal;
    console.log('Propuesta seleccionada:', this.selectedProposal);
  }

  fillVoteInfo(): VoteInfo {
    //console.log("userVoteActual", this.actualUserVote);
    const optionVote: OptionVote = {
      category: this.currentCantegory.category,
      proposal: this.proposals,
      selectedProposal: this.selectedProposal.id,
    };

    const voteInfo: VoteInfo = {
      optionsVote: optionVote,
      selectedCandidate: this.selectedProposal.userId,
      selectedProposal: this.selectedProposal.id,
      selectedCategory: this.currentCantegory.category.id,
      userVoteId: this.actualUserVote.id
    };

    //console.log('VoteInfo filled:', voteInfo);
    return voteInfo;
  }

  createVote() {
    let vote = this.fillVoteInfo()
    this.voteService.vote(vote).subscribe({
      next: (result) => {
        //console.log(result);
        if (result) {
          this.continue = result.created;
          if (this.totalCategories > this.showTextIndex)
            this.printProposals(this.showTextIndex);
          else
            this.continue = false;
        } else {
          this.continue = false;
        }
      }
    });
  }

  generateResults() {
    this.voteService.generateResults({ userElectionId: this.actualUserVote.userElectionId }).subscribe({
      next: (result) => {
        //console.log("resultados", result);
        if (result) {
          this.resultEvent.emit(result);
        }
      }
    });
  }
}


