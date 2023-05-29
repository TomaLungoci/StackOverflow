import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailDetails } from 'src/app/common/email';
import { User } from 'src/app/common/user';
import { EmailService } from 'src/app/services/email.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {


  user!: User;
  loggedUser!: User;
  isLogged: boolean = false;
  isAdmin: boolean = false;


  constructor(private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,
              private emailService: EmailService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.handlePersonDetails();
    }
    )

    this.getLoggedUser()
  }

  getAuthorbyId(id: number){
    console.log("get the user with id :");
    console.log(id);
    console.log('-------------------')

    this.personService.getPerson(id).subscribe(
      (data: User) => {
        console.log(data)
        this.loggedUser = data;
        if(this.loggedUser.admin == 1){
          this.isAdmin = true;
        }
        this.personService.setIsAuth(true);
      }
    )
  }

  getLoggedUser(){
    if(localStorage.getItem('isAuth') == 'true'){
      
      this.getAuthorbyId(+localStorage.getItem('authId')!);

    }
  }

  handlePersonDetails() {
    const theUserId: number = +this.route.snapshot.paramMap.get('id')!;
    this.personService.getPerson(theUserId).subscribe(
      (data: User) => {
        console.log(data)
        this.user = data;
      }
    )
  }

  banUser(user: User){
    user.banned = 1;
    this.personService.editUser(user).subscribe();
    let email: EmailDetails = new EmailDetails(user.email, "You have been banned from our page!", "Ban");
    this.emailService.sendEmail(email).subscribe();
  }

  unbanUser(user:User){
    user.banned = 0;
    this.personService.editUser(user).subscribe();
  }

}
