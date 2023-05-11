import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/common/answer';
import { Question } from 'src/app/common/question';
import { User } from 'src/app/common/user';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  question!: Question;
  // answer1 = new Answer(1, "This is the answer to all problems");
  // answer2 = new Answer(2, "This is the answer to all questions");
  constructor(private questionService: QuestionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(() =>{
      this.handleQuestionDetails();
    }
    )
  }
  handleQuestionDetails() {
    const theQuestionId: number = +this.route.snapshot.paramMap.get('id')!;



  
    this.questionService.getQuestion(theQuestionId).subscribe(
      (data: Question) => {
        console.log(data)
        this.question = data;
      }
    )
  }

}
