import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { Tag } from '../common/tag';
import { Question } from '../common/question';
import { Answer } from '../common/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  editQuestion(question: Question) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/answers'; 
  private addUrl = 'http://localhost:8080/answers/insertAnswer';
  private getUrl = 'http://localhost:8080/answers/search';
  private updateUrl = 'http://localhost:8080/answers/updateAnswer';
  private getURL2 = 'http://localhost:8080/answers/getAnswerById';
  constructor(private httpClient: HttpClient) { }

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

  addAnswer(answer: Answer): Observable<Answer> {
    return this.httpClient.post<Answer>(this.addUrl, answer).pipe(
      catchError(this.handleError)
    );
  }

  getAnswer(theAnswerId: number): Observable<Answer> {
    const answerUrl = `${this.getURL2}/${theAnswerId}`;
    return this.httpClient.get<Answer>(answerUrl);
  }

  getAnswers(searchUrl: string): Observable<Answer[]> {
    return this.httpClient.get<Answer[]>(searchUrl);
  }

  searchQuestion(theQuestionId: number) {
    const searchUrl = `${this.baseUrl}/search/${theQuestionId}`;
    return this.getAnswers(searchUrl);
  }

  editAnswer(answer: Answer){
    return this.httpClient.put<Answer>(this.updateUrl, answer);
  }
}
