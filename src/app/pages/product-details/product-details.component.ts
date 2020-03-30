import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SalesService } from 'src/app/shared/services/sales.service';
import { ISales } from 'src/app/shared/interfaces/sales.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  sale: ISales;
  constructor(private router: ActivatedRoute,
              private salesService: SalesService,
              private location: Location) { }

  ngOnInit(): void {
    this.getSale();
  }

  private getSale(): void {
    const id = +this.router.snapshot.paramMap.get('id');
    this.salesService.getCurrentSale(id).subscribe(
      data => {
        this.sale = data;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }



// https://rozetka.com.ua/ua/sony_kd49xf7005br/p46880864/
// https://rozetka.com.ua/ua/sony_kd43xg7096br/p87587932/
}
