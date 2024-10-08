import { Injectable } from '@angular/core';
import { CategoriesByElection, ElectionCategories, Project, UdateProject } from '../model/Category';
import { CreateProject } from '../model/Category'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private restService:RestService) { }

  getAll(year:number, page: number, pageSize: number, checkUser:boolean = false , userVoteId: string = null):Observable<ElectionCategories[]> {
    debugger;
    let uri = `${environment.baseUrl}Category/searchCategoriesByYear?electionsYears=${year}&checkByActualUser=${checkUser}&userVoteId=${userVoteId}&pageNumber=${page}&pageSize=${pageSize}`;
    return this.restService.get<ElectionCategories[]>(uri).pipe();
  }
  
  getProjects(data:any):Observable<Project[]> {
    let uri = `${environment.baseUrl}Project/GetProjects`;
    return  this.restService.get<Project[]>(uri,data);
  }

  get(id: string){
    return this.restService.get(`${environment.baseUrl}Project/${id}`);
  }

  getProjectsToSugget(id: number):Observable<Project[]> {
    return this.restService.get(`${environment.baseUrl}Project/GetProjectSuggestions/${id}`);
  }

  save(project: FormData){
    return this.restService.post(`${environment.baseUrl}Project/PostProjects`, project);

  }

  delete(id: string) {
    return this.restService.delete(`$${environment.baseUrl}Project/DeleteProjects/${id}`);
  }

  update(updated: UdateProject) {
    return this.restService.put(`${environment.baseUrl}Project/PutProjects`, updated);
  }

  mapTo(data: any): Project {
    return {
      id: data.id,
      name: data.name,
      description:data.description,
      goal: data.goal,
      pledged: data.pledged,
      backersCount: data.backersCount,
      pictureUrl: data.PictureUrl,
      userId: data.UserId,
      userName: data.UserName,
      userPicture: data.UserPicture,
      financedDate: data.financedDate,  // El símbolo '?' indica que es opcional, equivalente a un DateTime?
      creationOn: data.creationOn
      // Asigna otras propiedades de data a las propiedades correspondientes de User
    };
  }

  




}
