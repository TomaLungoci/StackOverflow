import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/common/answer';
import { Question } from 'src/app/common/question';
import { User } from 'src/app/common/user';
import { Vote } from 'src/app/common/vote';
import { AnswerService } from 'src/app/services/answer.service';
import { PersonService } from 'src/app/services/person.service';
import { QuestionService } from 'src/app/services/question.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  question!: Question;
  newAnswer!: Answer;
  author!: User;
  answers: any[] = [];
  // voteResponse!: Vote | null;
  // answer1 = new Answer(1, "This is the answer to all problems");
  // answer2 = new Answer(2, "This is the answer to all questions");
  constructor(private questionService: QuestionService,
              private personService: PersonService,
              private answerService: AnswerService,
              private route: ActivatedRoute,
              private voteService: VoteService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(() =>{
      this.handleQuestionDetails();
    }
    )
    //this.getAuthor(1);
    
  }
  handleQuestionDetails() {
    const theQuestionId: number = +this.route.snapshot.paramMap.get('id')!;



  
    this.questionService.getQuestion(theQuestionId).subscribe(
      (data: Question) => {
        console.log(data)
        this.question = data;
        this.author = this.question.user;
      }
    )

    this.getAnswers(theQuestionId);
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

  getAuthorbyId(id: number, answerText: string){
    console.log("get the user with id :");
    console.log(id);
    console.log('-------------------')

    this.personService.getPerson(id).subscribe(
      (data: User) => {
        console.log(data)
        this.author = data;
        this.newAnswer = new Answer(this.author, answerText, "assets/images/products/placeholder.png", new Date(), new Date(), this.question, 0);
        this.answerService.addAnswer(this.newAnswer).subscribe();
        this.personService.setIsAuth(true);
      }
    )
  }

  getAnswers(theQuestionId: number){
    this.answerService.searchQuestion(theQuestionId).subscribe(
      data => {
        console.log(data)
       this.answers = data;
     }
    )
  }



  addAnswer(answerText: string){
    debugger
    console.log(this.personService.getIsAuth());
    // if(this.personService.getIsAuth()){
    if(localStorage.getItem('isAuth') == 'true'){ 
        this.getAuthorbyId(+localStorage.getItem('authId')!, answerText);
      
      // console.log(this.personService.getTheAuthId());
      // console.log(this.author.fname);
      // this.newAnswer = new Answer(this.author, answerText, "assets/images/products/placeholder.png", new Date(), new Date(), this.question);
      
    }
    this.getAnswers(this.question.id);
    
  }

  editAnswer(editText: string, answer: Answer){
    let authorId = answer.user.cnp;
    if(localStorage.getItem('isAuth')=='true'){
      if(+localStorage.getItem('authId')! == authorId){
          answer.answerText = editText;
          answer.lastUpdated = new Date();
          this.answerService.editAnswer(answer).subscribe();
      }
    }
  }
  editQuestion(editText: string, question: Question){
    let authorId = question.user.cnp;
    if(localStorage.getItem('isAuth')=='true'){
      if(+localStorage.getItem('authId')! == authorId){
          question.questionText = editText;
          question.lastUpdated = new Date();
          this.questionService.editQuestion(question).subscribe();
      }
    }
  }

  upvote(question: Question){
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!);
      let vote: Vote = new Vote(1, null, question, this.author)
      this.voteService.addVote(vote).subscribe(
        data => {
        console.log(data)
        let voteResponse: Vote | null = data;
        if(voteResponse != null){
          // let newQuestion: Question = question;
          // newQuestion.votecount = question.votecount + 1;
          // let newQuestion: Question = new Question(question.id, question.user, question.title, question.questionText, question.imageUrl, question.dateCreated, question.lastUpdated, question.tags, question.answers, question.votecount + 1);
          question.votecount = question.votecount + 1;
          this.questionService.editQuestion(question).subscribe()
        }
      })
      //this.handleListQuestions();
    }
  }

  downvote(question: Question){
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!);
      let vote: Vote = new Vote(0, null, question, this.author)
      this.voteService.addVote(vote).subscribe(
        data => {
        console.log(data)
        let voteResponse: Vote |null = data;
        if(voteResponse != null){
          // let newQuestion: Question = question;
          // newQuestion.votecount = question.votecount - 1;
          // let newQuestion: Question = new Question(question.id, question.user, question.title, question.questionText, question.imageUrl, question.dateCreated, question.lastUpdated, question.tags, question.answers, question.votecount - 1);
          question.votecount = question.votecount - 1;
          this.questionService.editQuestion(question).subscribe()
        }
      })
      //this.handleListQuestions();
    }
  }

  upvoteAnswer(answer: Answer){
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!);
      let vote: Vote = new Vote(1, answer, null, this.author)
      this.voteService.addVote(vote).subscribe(
        data => {
        console.log(data)
        let voteResponse: Vote | null = data;
        if(voteResponse != null){
          // let newQuestion: Question = question;
          // newQuestion.votecount = question.votecount + 1;
          // let newQuestion: Question = new Question(question.id, question.user, question.title, question.questionText, question.imageUrl, question.dateCreated, question.lastUpdated, question.tags, question.answers, question.votecount + 1);
          answer.votecount = answer.votecount + 1;
          this.answerService.editAnswer(answer).subscribe()
        }
      })
      //this.handleListQuestions();
    }
  }

  downvoteAnswer(answer: Answer){
    if(localStorage.getItem('isAuth') == 'true'){
      this.getAuthor(+localStorage.getItem('authId')!);
      let vote: Vote = new Vote(1, answer, null, this.author)
      this.voteService.addVote(vote).subscribe(
        data => {
        console.log(data)
        let voteResponse: Vote | null = data;
        if(voteResponse != null){
          // let newQuestion: Question = question;
          // newQuestion.votecount = question.votecount + 1;
          // let newQuestion: Question = new Question(question.id, question.user, question.title, question.questionText, question.imageUrl, question.dateCreated, question.lastUpdated, question.tags, question.answers, question.votecount + 1);
          answer.votecount = answer.votecount - 1;
          this.answerService.editAnswer(answer).subscribe()
        }
      })
      //this.handleListQuestions();
    }
  }
  



}
