import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Question } from '../common/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private baseUrl = 'http://localhost:8080/api/questions';
  private getURL = 'http://localhost:8080/questions/getAll';
  private getURL2 = 'http://localhost:8080/questions/getQuestionById';
  
  

  constructor(private httpClient: HttpClient) { }

  // getQuestionList(): Observable<any[]> {
  //   return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
  //     map(response => response._embedded.questions)
  //   );
  // }

  getQuestionList(): Observable<Question[]>{
    return this.httpClient.get<Question[]>(this.getURL)
  }

  getQuestion(theQuestionId: number): Observable<Question> {
    const questionUrl = `${this.getURL2}/${theQuestionId}`;
    return this.httpClient.get<Question>(questionUrl);
  }


  getQuestionListByTag(theTagId: number): Observable<any[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.questions)
    );
  }
}

interface GetResponse {
  _embedded: {
    questions: Question[];
  }
}