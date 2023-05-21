import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { PersonService } from '../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list-bootstrap.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  personList: Person[] =[
    // new Person("1","Toma", "Lungoci", "lungocitoma@gmail.com"),
    // new Person("2", "Andrei", "Brie", "brie@yahoo.com")
  ];

  persons: any[] = [];

  constructor(private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(){
    debugger
    this.personService.getPersonList().subscribe(
      data => {
        console.log(data)
        this.persons = data;
      }
    )
  }

}
