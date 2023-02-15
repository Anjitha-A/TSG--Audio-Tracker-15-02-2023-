import { Component, OnInit } from '@angular/core';
import { AdminCategoryListService } from './admin-category-list.service';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.scss'],
})
export class AdminCategoryListComponent implements OnInit {
  constructor(private viewCategoryService: AdminCategoryListService) {}
  category: any;
  ngOnInit(): void {
    this.viewCategoryService.getCategorylist().subscribe((response: any) => {
      this.category = response;
    });
  }
}
