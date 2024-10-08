import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/navegacion/nav.component';
import { VoteByCategoryListComponent } from './components/Project/vote-by-category-list/vote-by-category-list.component';
import { from } from 'rxjs';
import { GridComponent } from './components/grid/grid.component';
import { JwtInterceptor } from './helpers/jwt-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './helpers/error-interceptor.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './service/modal.service';
import { LandingPageComponent } from './components/Project/landing-page/landig-page.component';
import { ProjectFormComponent } from './components/Project/project-form/project-form.component';
import { VoteResultsComponent } from './components/Project/vote-results/vote-results.component';
import { ProjectSuggestionsResultComponent } from './components/Project/project-suggestions-result/project-suggestions-result.component';
import { ResultByUserPageComponent } from './components/Project/result-by-user-page/result-by-user-page.component';
import { VoteWinnerResultsComponent } from './components/Project/vote-winner-result/vote-winner-result.component';
import { CandidateResultComponent } from './components/Project/candidate-result/candidate-result.component';
import { StepsComponent } from './components/Project/steps/steps.component';
import { StartPageComponent } from './components/Project/start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VoteByCategoryListComponent,
    GridComponent,
    LoginComponent,
    ModalComponent,
    LandingPageComponent,
    ProjectFormComponent,
    VoteResultsComponent,
    ProjectSuggestionsResultComponent,
    ResultByUserPageComponent,
    VoteWinnerResultsComponent,
    CandidateResultComponent,
    StepsComponent,
    StartPageComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ModalService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
