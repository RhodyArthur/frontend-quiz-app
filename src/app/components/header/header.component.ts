import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CategoryService } from '../../services/category.service';
import { response } from '../../interfaces/response';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  quizData: response={quizzes:[]};

  selectedCategory: string | null = null;
  showCategoryContainer: boolean = false;

  constructor(public themeService: ThemeService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private quizService: QuizService
  ) {}

  ngOnInit() {
    this.categoryService.selectedCategory$
    .subscribe(category => {
      this.selectedCategory = category;
      this.checkRoute()
    })

    this.quizService.fetchedData()
    .subscribe(data => {
      this.quizData = data;
    })

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute() {
    const currentRoute = this.router.url;
    this.showCategoryContainer = currentRoute !== '/' && !!this.selectedCategory;
  }

  toggleCategory(category: string) {
    this.categoryService.setSelectedCategory(category)
  }

  toggleTheme(){
    this.themeService.toggleLightMode()
  }
}
