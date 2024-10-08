import { CategoryVote } from "./Category"
import { Proposal } from "./Report"

export interface VoteInfo {
    optionsVote: OptionVote,
    selectedCandidate: string,
    selectedProposal: string,
    selectedCategory: string,
    userVoteId: string
}

export interface OptionVote {
    category: CategoryVote,
    proposal: Proposal[],
    selectedProposal: string
}

export interface UserVote {
    id : string,
    userId: string,
    userElectionId: string,
    winnerCandidateId: string,
    draw:boolean
}