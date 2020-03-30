import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/shared/services/sales.service';
import { ISales } from 'src/app/shared/interfaces/sales.interface';
import { Sales } from 'src/app/shared/models/sales.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.scss']
})
export class AdminSalesComponent implements OnInit {
  adminSales: Array<ISales> = [];
  saleID: number;
  saleName: string;
  saleDescription: string;
  editStatus: boolean;
  private subscription: Subscription;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.getAdminSales();
  }

  private getAdminSales(): void {
    this.subscription = this.salesService.getSales().subscribe(
      data => {
        this.adminSales = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  addSale(): void {
    const newS: ISales = new Sales(1, this.saleName, this.saleDescription);
    if (!this.editStatus) {
      if (this.adminSales.length > 0) {
        newS.id = this.adminSales.slice(-1)[0].id + 1;
      }
      this.salesService.addSales(newS).subscribe(() => {
        this.getAdminSales();
      });
    }
    else {
      newS.id = this.saleID;
      this.salesService.updateSales(newS).subscribe( () => {
        this.getAdminSales();
      });
      this.editStatus = false;
    }
    this.resetForm();
  }

  editSale(sale: ISales): void {
    this.saleID = sale.id;
    this.saleName = sale.name;
    this.saleDescription = sale.description;
    this.editStatus = true;
  }

  deleteSale(sale: ISales): void {
    this.salesService.deleteSales(sale).subscribe(() => {
      this.getAdminSales();
    });
  }

  private resetForm(): void {
    this.saleName = '';
    this.saleDescription = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
// json-server --watch db.json