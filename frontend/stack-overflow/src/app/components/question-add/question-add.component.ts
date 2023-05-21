import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/common/question';
import { Tag } from 'src/app/common/tag';
import { User } from 'src/app/common/user';
import { Person } from 'src/app/person-list/person';
import { PersonService } from 'src/app/services/person.service';
import { QuestionService } from 'src/app/services/question.service';
import { TagService } from 'src/app/services/tag.service';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {

  constructor(private questionService:QuestionService, private tagService: TagService, private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router) { }

  tags: any[] = [];
  selectedTags: Tag[] = [];
  author!: User;
  authors: any[] = [];
  newQuestion!: Question;
  questions: any[] = [];

  ngOnInit(): void {
    this.handleListTags();
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!)
    }
    //this.getAuthor(1);
  }

  handleListTags(){
    debugger
    this.tagService.getTagList().subscribe(
      data => {
        console.log(data)
        this.tags = data;
      }
    )
  }
  getAuthors(){
    this.personService.getPersonList().subscribe(
      data => {
        console.log(data)
        this.authors = data;
      }
    )
  }
  getAuthor(id: number){
    console.log("hereeeeeeeeeeeee");
    this.personService.getPerson(id).subscribe(
      (data: User) => {
        console.log(data)
        this.author = data;
      }
    )
  }

  handleListQuestions(){
    this.questionService.getQuestionList().subscribe(
      data => {
        console.log(data)
        this.questions = data;
      }
    )

  }

  selectTags(stringTags: string){
    const providedTags = stringTags.split(' ');
    for(const t of providedTags){
      for(const existingTag of this.tags){
        if(existingTag.tagName == t){
          this.selectedTags.push(existingTag);
        }
      }
    }
  }

  addQuestion(title: string, text: string, stringTags: string){
    console.log(this.personService.getIsAuth())
    // if(this.personService.getIsAuth()){
    if(localStorage.getItem('isAuth') == 'true'){
      this.selectedTags = [];
      console.log(`title=${title}`);
      console.log(`text=${text}`);
      console.log(`stringTags=${stringTags}`);
      const addedTags = stringTags.split(' ');
      console.log(addedTags);
      this.selectTags(stringTags);
      this.handleListQuestions();
      this.getAuthors();
      this.getAuthor(+localStorage.getItem('authId')!);
      console.log(`author=${this.author.email}`);
      this.newQuestion = new Question(1, this.author, title, text,"assets/images/products/placeholder.png", new Date(), new Date(), this.selectedTags, [] , 0);
      // this.router.navigateByUrl(`/search/${value}`);
      this.questionService.addQuestion(this.newQuestion).subscribe();
  
    }
  }



}
