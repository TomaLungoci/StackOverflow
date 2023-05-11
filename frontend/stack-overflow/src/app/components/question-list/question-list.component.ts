import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/common/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any[] = [];
  currentTagId: number = 1;

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listQuestions();
    })
    
  }

  listQuestions() {
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

}
