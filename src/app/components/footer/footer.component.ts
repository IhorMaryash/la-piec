import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() footerText: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onCounter = new EventEmitter<boolean>();
  login: string;
  counter = 0;
  

  constructor() { }

  ngOnInit(): void {
  }

  inc(): void {
    this.counter++;
  }
  dec(): void {
    this.counter--;
  }

  // counter(status: boolean): void {
  //   this.onCounter.emit(status);
  // }

}
