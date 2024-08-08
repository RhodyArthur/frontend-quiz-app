import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly localStorageKey = 'selectedCategory'
  private selectedCategorySubject = new BehaviorSubject<string|null>(localStorage.getItem(this.localStorageKey))
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor() { }

  
  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category)
    if(category){
      localStorage.setItem(this.localStorageKey, category)
    }
    else {
      localStorage.removeItem(this.localStorageKey)
    }
  }
}