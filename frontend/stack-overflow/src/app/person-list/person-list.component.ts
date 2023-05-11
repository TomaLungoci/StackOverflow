import { Component, OnInit } from '@angular/core';
import { Person } from './person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list-bootstrap.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  personList: Person[] =[
    new Person("Toma", "Lungoci", "lungocitoma@gmail.com"),
    new Person("Andrei", "Brie", "brie@yahoo.com")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
