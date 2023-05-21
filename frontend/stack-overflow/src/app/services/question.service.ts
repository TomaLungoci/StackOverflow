import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Question } from '../common/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private baseUrl = 'http://localhost:8080/api/questions';
  private baseUrl1 = 'http://localhost:8080/questions';
  private getURL = 'http://localhost:8080/questions/getAll';
  private getURL2 = 'http://localhost:8080/questions/getQuestionById';
  private addURL = 'http://localhost:8080/questions/insertQuestion';
  private updateUrl = 'http://localhost:8080/questions/updateQuestion';
  private tagUrl = 'http://localhost:8080/questions/getQuestionByTag';
  private authorUrl = 'http://localhost:8080/questions/getQuestionByAuthor';

  constructor(private httpClient: HttpClient) { }

  // getQuestionList(): Observable<any[]> {
  //   return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
  //     map(response => response._embedded.questions)
  //   );
  // }

  getQuestionList(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.getURL)
  }

  getQuestion(theQuestionId: number): Observable<Question> {
    const questionUrl = `${this.getURL2}/${theQuestionId}`;
    return this.httpClient.get<Question>(questionUrl);
  }


  getQuestionListByTag(tagNmae: string): Observable<any[]> {
    const searchUrl = `${this.tagUrl}/${tagNmae}`;
    return this.httpClient.get<Question[]>(searchUrl);
  }
  
  getQuestionsByAuthor(name: string): Observable<any[]> {
    const searchUrl = `${this.authorUrl}/${name}`;
    return this.httpClient.get<Question[]>(searchUrl);  
  }

  searchQuestion(theKeyword: string) {
    const searchUrl = `${this.baseUrl1}/search/${theKeyword}`;
    return this.getQuestions(searchUrl);
  }

  getQuestions(searchUrl: string): Observable<Question[]> {
    return this.httpClient.get<Question[]>(searchUrl);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  addQuestion(question: Question): Observable<Question> {
    return this.httpClient.post<Question>(this.addURL, question).pipe(
      catchError(this.handleError)
    );
  }

  editQuestion(question: Question){
    return this.httpClient.put<Question>(this.updateUrl, question);
  }

}

interface GetResponse {
  _embedded: {
    questions: Question[];
  }
}