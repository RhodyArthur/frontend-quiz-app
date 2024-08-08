import { Component } from '@angular/core';
import { response } from '../../interfaces/response';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  quizData: response={quizzes:[]};

  constructor(private quizService: QuizService,
              private categoryService: CategoryService,
              private router: Router) {}

  ngOnInit() {
    this.quizService.fetchedData()
    .subscribe(data => {
      this.quizData = data;
    })
  }


  onCategoryClicked(category:string) {
    this.categoryService.setSelectedCategory(category)
    this.router.navigate(['/quiz'])
    console.log(`${category} clicked`)
  }
}
