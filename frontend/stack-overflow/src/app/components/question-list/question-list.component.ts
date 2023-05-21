import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/common/question';
import { Tag } from 'src/app/common/tag';
import { User } from 'src/app/common/user';
import { Vote } from 'src/app/common/vote';
import { PersonService } from 'src/app/services/person.service';
import { QuestionService } from 'src/app/services/question.service';
import { TagService } from 'src/app/services/tag.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any[] = [];
  currentTagId: number = 1;
  searchMode: boolean = false;
  voteResponse!: Vote | null;
  author!: User;
  tag: Tag | undefined;

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService,
              private voteService: VoteService,
              private personService: PersonService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listQuestions();
    })
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!)
    }
    
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

  listQuestions() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchQuestions();
    }else{
      this.handleListQuestions();
    }

  }
  handleSearchQuestions() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.questionService.searchQuestion(theKeyword).subscribe(
      data => {
         console.log(data)
        this.questions = data;

      }
    )
  }

  handleListQuestions(){
    const hasTagId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasTagId){
      this.currentTagId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentTagId = 2;
      
    }
    this.questionService.getQuestionList().subscribe(
      data => {
        console.log(data)
        this.questions = data;
      }
    )

  }
  searchByAuthor(name: string){
    this.questionService.getQuestionsByAuthor(name).subscribe(
      data => {
        console.log(data)
        this.questions = data;
      }
    )
  }

  filterByTag(tag: Tag){
    this.questionService.getQuestionListByTag(tag.tagName).subscribe(
      data => {
        console.log(data)
        this.questions = data;
      }
    )
  }

  createTag(value: string){
    console.log(`value=${value}`);
    this.tag  = new Tag(value, []);
    this.tagService.addTag(this.tag).subscribe();
  }

  upvote(question: Question){
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!);
      let vote: Vote = new Vote(1, null, question, this.author)
      this.voteService.addVote(vote).subscribe(
        data => {
        console.log(data)
        this.voteResponse = data;
        if(this.voteResponse != null){
          // let newQuestion: Question = question;
          // newQuestion.votecount = question.votecount + 1;
          // let newQuestion: Question = new Question(question.id, question.user, question.title, question.questionText, question.imageUrl, question.dateCreated, question.lastUpdated, question.tags, question.answers, question.votecount + 1);
          question.votecount = question.votecount + 1;
          this.questionService.editQuestion(question).subscribe()
        }
      })
      this.handleListQuestions();
    }
  }

  downvote(question: Question){
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!);
      let vote: Vote = new Vote(0, null, question, this.author)
      this.voteService.addVote(vote).subscribe(
        data => {
        console.log(data)
        this.voteResponse = data;
        if(this.voteResponse != null){
          // let newQuestion: Question = question;
          // newQuestion.votecount = question.votecount - 1;
          // let newQuestion: Question = new Question(question.id, question.user, question.title, question.questionText, question.imageUrl, question.dateCreated, question.lastUpdated, question.tags, question.answers, question.votecount - 1);
          question.votecount = question.votecount - 1;
          this.questionService.editQuestion(question).subscribe()
        }
      })
      this.handleListQuestions();
    }
  }

}
