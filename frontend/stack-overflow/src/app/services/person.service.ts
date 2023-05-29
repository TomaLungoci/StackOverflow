import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../person-list/person';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private isAuthSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuth: boolean = false;
  private theAuthId: number = -1;

  private getURL = 'http://localhost:8080/users/getAll';
  private getURL2 = 'http://localhost:8080/users/getById';
  private checkUrl = 'http://localhost:8080/users/checkPassword';
  private updateUrl = 'http://localhost:8080/users/updateUser';
  constructor(private httpClient: HttpClient) {
  }

  getPersonList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.getURL)
  }

  checkPassword(password: string): Observable<User>{
    return this.httpClient.put<User>(this.checkUrl, password);
  }

  getPerson(thePersonId: number): Observable<User> {
    const questionUrl = `${this.getURL2}/${thePersonId}`;
    return this.httpClient.get<User>(questionUrl);
  }

  getIsAuth(): boolean{
    return this.isAuth;
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }

  getTheAuthId(): number{
    return this.theAuthId;
  }

  setTheAuthId(value: number){
    this.theAuthId = value;
  }
  
  editUser(user: User){
    return this.httpClient.put<User>(this.updateUrl, user);
  }

}
