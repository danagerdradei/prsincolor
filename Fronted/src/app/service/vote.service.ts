import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { UserVote } from '../model/Vote';


@Injectable({ providedIn: 'root' })
export class VoteService {
    
    deleteUserVote(param: any):Observable<any> {
        let uri = `${environment.baseUrl}Vote/DeleteUserVote`;
        return this.restService.delete<any>(uri, param);
    }
    constructor(private restService: RestService) { }

    save(userVote: any):Observable<UserVote> {
        let uri = `${environment.baseUrl}Vote/CreateUserVote`;
        return this.restService.post<UserVote>(uri, userVote);
    }

    vote(vote:any):Observable<any> {
        return this.restService.post<any>(`${environment.baseUrl}Vote/CreateVote`, vote);
    }

    generateResults(vote:any):Observable<any> {
        return this.restService.post<any>(`${environment.baseUrl}Vote/generate-results`, vote);
    }

    getResults(userElectionId:any):Observable<any> {
        return this.restService.get<any>(`${environment.baseUrl}Vote/results/${userElectionId}`);
    }

    getUserVote(userVoteId:any):Observable<any> {
        return this.restService.get<any>(`${environment.baseUrl}Vote/GetUserVote/${userVoteId}`);
    }
}
