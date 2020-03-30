import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  categoryID: 1;
  nameUA: string;
  nameEN: string;
  editStatus: boolean;
  adminCategory: Array<ICategory> = [];

  constructor(private catService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  private getCategory(): void {
    this.catService.getCategory().subscribe(
      data => {
        this.adminCategory = data;
      }
    );
  }

  public addCategory(): void {
    const category: ICategory = new Category(1, this.nameUA, this.nameEN);
    if (this.adminCategory.length > 0) {
      category.id = this.adminCategory.slice(-1)[0].id + 1;
    }
    this.catService.addCategory(category).subscribe(
      () => {
        this.getCategory();
      }
    );
  }

  public deleteCategory(category: ICategory): void {
    this.catService.deleteCategory(category).subscribe(
      () => {
        this.getCategory();
      }
    );
  }

  public editCategory(category: ICategory) {}
}
