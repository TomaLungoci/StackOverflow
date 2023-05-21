import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Tag } from '../common/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl = 'http://localhost:8080/api/tags';
  private baseUrl1 = 'http://localhost:8080/tags';
  private getURL = 'http://localhost:8080/tags/getAll';
  private getURL2 = 'http://localhost:8080/tags/getTagById';
  private addURL = 'http://localhost:8080/tags/insertTag';

  constructor(private httpClient: HttpClient) { }

  getTagList(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(this.getURL)
  }

  addTag1(tag: Tag) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify(tag);
  
    return this.httpClient.post(this.addURL, body, { headers: headers }).toPromise();
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

  addTag(tag: Tag): Observable<Tag> {
    return this.httpClient.post<Tag>(this.addURL, tag).pipe(
      catchError(this.handleError)
    );
  }



}
