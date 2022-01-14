import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
  
  @Input() isCorrect:boolean = false;
  constructor(private el:ElementRef,
    private render:Renderer2) { }
    @HostListener('click') answer(){
      if(this.isCorrect){    /*set style for option if answer is correct*/
        this.render.setStyle(this.el.nativeElement,'background','green');
        this.render.setStyle(this.el.nativeElement,'color','#fff');
        this.render.setStyle(this.el.nativeElement,'border','2px solid grey');
      }else{                /*set style for option if answer is incorrect*/
        this.render.setStyle(this.el.nativeElement,'background','red');
        this.render.setStyle(this.el.nativeElement,'color','#fff');
        this.render.setStyle(this.el.nativeElement,'border','2px solid grey');
      }
    }

}
