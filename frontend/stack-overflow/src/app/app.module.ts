import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonListComponent } from './person-list/person-list.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { HttpClientModule } from '@angular/common/http'
import { QuestionService } from './services/question.service';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'questions/:id', component: QuestionDetailsComponent},
  {path: 'tag/:id', component: QuestionDetailsComponent},
  {path: 'tag', component: QuestionListComponent},
  {path: 'users', component:PersonListComponent},
  {path: 'questions', component: QuestionListComponent},
  {path: '', redirectTo: '/questions', pathMatch: 'full'},
  {path: '**', redirectTo:'/questions', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    QuestionListComponent,
    QuestionDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
