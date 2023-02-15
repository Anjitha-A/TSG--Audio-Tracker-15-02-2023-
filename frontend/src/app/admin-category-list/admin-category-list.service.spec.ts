import { TestBed } from '@angular/core/testing';

import { AdminCategoryListService } from './admin-category-list.service';

describe('AdminCategoryListService', () => {
  let service: AdminCategoryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCategoryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
