import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameKey! : ElementRef; /*through ViewChild pass the name to question component*/
  constructor() { }

  ngOnInit(): void {
  }
  startQuiz(){
    localStorage.setItem("name", this.nameKey.nativeElement.value); /*push the name to the local storage*/
  }

}
