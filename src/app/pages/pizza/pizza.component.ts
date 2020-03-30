import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
  }

addBasket(): void {
  this.orderService.basket.next('some text')
}

}
