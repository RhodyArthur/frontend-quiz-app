import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private selectedCategorySubject = new BehaviorSubject<string|null>(null)
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  
  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category)
  }
}