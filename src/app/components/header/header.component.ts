import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectedCategory: string | null = null;

  constructor(public themeService: ThemeService,
              private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.selectedCategory$
    .subscribe(category => {
      this.selectedCategory = category;
    })
  }

  toggleTheme(){
    this.themeService.toggleLightMode()
  }
}
