import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'la-piec';
  text: string = 'Arsenal';
  count = 0;
  @ViewChild(FooterComponent, {static: false})
  private footerComponent: FooterComponent;

  isCounter(checker): void {
    if (checker) {
      ++this.count;
    }
    else {
      --this.count;
    }
  }

  increment(): void {
    this.footerComponent.inc();
  }

  decrement(): void {
    this.footerComponent.dec();
  }

}
