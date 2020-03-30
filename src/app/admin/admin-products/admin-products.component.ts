import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  adminCategory: Array<ICategory> = [];
  adminProducts: Array<IProduct> = [];

  productCategory: ICategory = {id: 1, nameUA: 'піца', nameEN: 'pizza'};
  productUA: string;
  productEN: string;
  productDescription: string;
  productPrice: number;
  productWeight: string;
  productImage: string;

  // FireStorage
  uploadProgress: Observable<number>;
  productNameUA: string;
  productNameEN: string;


  constructor(private catService: CategoriesService,
              private prodService: ProductsService,
              private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getCategory();
    this.getProduct();
  }

  private getCategory(): void {
    this.catService.getCategory().subscribe(
      data => {
        this.adminCategory = data;
      }
    );
  }

  private getProduct(): void {
    this.prodService.getProduct().subscribe(
      data => {
        this.adminProducts = data;
      }
    );
  }

  addProduct(): void {
    const product: IProduct = new Product(1,this.productCategory,
                                            this.productNameUA,
                                            this.productNameEN,
                                            this.productDescription,
                                            this.productPrice,
                                            this.productWeight,
                                            this.productImage)
    if(this.adminProducts.length > 0) {
      product.id = this.adminProducts.slice(-1)[0].id + 1;
    }
    this.prodService.addProduct(product).subscribe(() => {
      this.getProduct();
    })
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe( url => {
        this.productImage = url;
      })
    })
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
