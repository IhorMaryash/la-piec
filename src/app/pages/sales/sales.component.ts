import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/shared/services/sales.service';
import { ISales } from 'src/app/shared/interfaces/sales.interface';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  arrNames: Array<string> = [];
  sales: Array<ISales> = [];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    // this.getDataFromService();
    this.getData();
  }

  private getData(): void {
    this.salesService.getSales().subscribe(
      data => {
        this.sales = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  private getDataFromService(): void {
    this.arrNames = this.salesService.getData();
  }

}
