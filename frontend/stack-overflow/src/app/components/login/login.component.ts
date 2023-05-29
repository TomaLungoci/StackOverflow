import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/common/user';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  users: User[] = [];
  currentUser!: User;
  emails: string[] = [];
  isAuth: boolean = false;
  badPass: boolean = false;
  ngOnInit(): void {
    localStorage.setItem('isAuth', 'false');
    localStorage.setItem('authId', '0');
    this.getUsers();
  }

  getUsers(){
    this.personService.getPersonList().subscribe(
      data => {
        console.log(data)
        this.users = data;
      }
    )
  }

  getUsersAndCheckEmail(email: string, password: string){
   
    this.personService.getPersonList().subscribe(
      data => {
        console.log(data)
        this.users = data;
         debugger
        for(const tempUser of this.users){

          console.log(email);
          console.log(tempUser.email);
          console.log('-----');
          if(email == tempUser.email){
            console.log('i have found the user');
            let passedPass = password.concat(" ", tempUser.cnp.toString());
            console.log("passed pass:" + passedPass);
            this.personService.checkPassword(passedPass).subscribe(
              data => {
                console.log(data)
                let found: User = data;
                if(found != null){
                  if(found.banned != 1){
                    this.currentUser = tempUser;
                    this.personService.setIsAuth(true);
                    localStorage.setItem('isAuth', 'true');
                    localStorage.setItem('authId', tempUser.cnp.toString());
                    this.personService.setTheAuthId(tempUser.cnp);
                  }
                }else{
                  this.badPass = true;
                }
              }
            )
          }
        }
      }
    )
  }
  
  login(email: string, password: string): boolean{
    // debugger
    console.log('i am trying to log you in');
    this.getUsersAndCheckEmail(email, password);
    // for(const tempUser of this.users){
    //   console.log(email);
    //   console.log(tempUser.email);
    //   console.log('-----');
    //   if(email == tempUser.email){
    //     console.log('i have found the user');
    //     this.currentUser = tempUser;
    //     this.personService.setIsAuth(true);
    //     this.personService.setTheAuthId(tempUser.cnp);
    //     return true;
    //   }
    // }
    // console.log('I couldnt log you in')
    return false;
  }
}
