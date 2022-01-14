import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

 public name: string = "";
 public questionList: any =[];
 public currentQuestion:number = 0;
 public points:number=0;
 public counter:number=30;
 public correctAnswer=0;
 public incorrectAnswer=0;
 public interval$:any;
 public progress:string='0';
 public isQuizCompleted:boolean= false;
 public questionAttempt:number =0;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!; /*get the name of the user from localstorage*/
    this.getAllQuestions();
    this.startCounter();
  }

  // **To get questions from json server
  getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res=>{
      console.log(res.questions);
      this.questionList=res.questions;  
    })
    }

  // **To get next question
  nextQuestion(){
    this.currentQuestion++;
  }
  
  
  // **To check answer is correct or wrong
  answer(currentQno:number,option:any){
    this.questionAttempt++;

    // after answering last question quiz show the result section 
    if(currentQno == this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    // condition for correct answer
    if(option.correct){        /*if option is correct following task perform*/
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {       /*set interval of 1 sec to show the status of the correct answer in green color*/
      this.currentQuestion++;     
      this.resetCounter();
      this.getProgressPercent();
      }, 1000);
    }else{                    /*if option is incorrect following task perform*/
      setTimeout(() => {      /*set interval of 1 sec to show the status of the incorrect answer in red color*/
      this.incorrectAnswer++;
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercent();
      }, 1000);
      this.points-=10;
    }
  }

  // Function for starting the 30 sec counter
  startCounter(){
    this.interval$=interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){     /*if 30 sec is up quiz will redirect to next question*/
        this.currentQuestion++;
        // this.points-=10;
        this.counter=30;
        if(this.currentQuestion == this.questionList.length){  /*if at last question 30 sec is up quiz will redirect to result section*/
          this.isQuizCompleted = true;
          this.stopCounter();
        }
      }
    });
    // after 5 min counter will be unsubscribe
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },300000);
  }

  // Function for stoping the counter
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  // Function for reseting the counter
  resetCounter(){
    this.stopCounter();
    this.counter=30;
    this.startCounter();
  }

  // Function for refreshing the quiz
  resetQuiz(){
    this.resetCounter();
    this.currentQuestion=0;
    this.points=0;
    this.getAllQuestions();
    this.progress='0';
    this.correctAnswer=0;
    this.incorrectAnswer=0;
    this.questionAttempt=0;
  }

  // Function for progress bar
  getProgressPercent(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

  // Function for submiting the quiz
  submitQuiz(){
    this.isQuizCompleted=true;
  }

}
