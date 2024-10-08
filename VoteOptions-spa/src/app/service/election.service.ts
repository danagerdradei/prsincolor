import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ElectionService {
    constructor(private restService: RestService) { }

    getElectionInfo():Observable<any> {
        return this.restService.get<any>(`${environment.baseUrl}Election/last-election-info`);
    }
}
