import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VoteByCategoryListComponent} from './components/Project/vote-by-category-list/vote-by-category-list.component';
import {ProjectFormComponent} from './components/Project/project-form/project-form.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { VoteResultsComponent } from './components/Project/vote-results/vote-results.component';
import { ProjectSuggestionsResultComponent } from './components/Project/project-suggestions-result/project-suggestions-result.component';
import { LandingPageComponent } from './components/Project/landing-page/landig-page.component';
import { ResultByUserPageComponent } from './components/Project/result-by-user-page/result-by-user-page.component';

const routes: Routes = [
  {
    path : 'LandingPage',
    component : LandingPageComponent,
    canActivate: [AuthGuard]

  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'user-result/:code', component: ResultByUserPageComponent }

];

@NgModule({
  imports: [   
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true,
      onSameUrlNavigation: 'reload' // Esta propiedad ayuda a forzar la recarga cuando se navega a la misma ruta
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
