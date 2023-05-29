import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonListComponent } from './person-list/person-list.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { HttpClientModule } from '@angular/common/http'
import { QuestionService } from './services/question.service';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { QuestionAddComponent } from './components/question-add/question-add.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { AuthGuradService } from './services/auth-gurad.service';
import { AuthGuard } from './common/auth-guard';

const routes: Routes = [
  {path: 'search/:keyword', component: QuestionListComponent},
  {path: 'questions/:id', component: QuestionDetailsComponent},
  {path: 'users/:id', component: PersonDetailsComponent},
  {path: 'tag/:keyword', component: QuestionDetailsComponent},
  {path: 'addQuestion', component: QuestionAddComponent},
  {path: 'tag', component: QuestionListComponent},
  {path: 'users', component:PersonListComponent},
  {path: 'questions', component: QuestionListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/questions', pathMatch: 'full'},
  {path: '**', redirectTo:'/questions', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    QuestionListComponent,
    QuestionDetailsComponent,
    LoginComponent,
    QuestionAddComponent,
    SearchComponent,
    PersonDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [QuestionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
