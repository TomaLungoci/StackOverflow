import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vote } from '../common/vote';
import { Observable, catchError, throwError } from 'rxjs';
import { Tag } from '../common/tag';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private getURL = 'http://localhost:8080/votes/getAll';
  private addURL = 'http://localhost:8080/votes/insertVote';

  constructor(private httpClient: HttpClient) { }

  getVoteList(): Observable<Vote[]> {
    return this.httpClient.get<Vote[]>(this.getURL)
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

  addVote(vote: Vote): Observable<Vote> {
    return this.httpClient.post<Vote>(this.addURL, vote).pipe(
      catchError(this.handleError)
    );
  }
}
