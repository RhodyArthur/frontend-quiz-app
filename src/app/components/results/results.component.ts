import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { QuizService } from '../../services/quiz.service';
import { response } from '../../interfaces/response';
import { ScoreService } from '../../services/score.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  selectedCategory: string | null = ''
  quizData: response = {quizzes: []};
  score:number = 0;
  allScores: { [key: string]: number } = {};

  constructor(private router: Router,
              private categoryService: CategoryService,
              private quizService: QuizService,
              private scoreService: ScoreService
  ) {}

  ngOnInit() {
    this.categoryService.selectedCategory$
    .subscribe(category => {
      this.selectedCategory = category;
    })

    
    if(this.selectedCategory) {
      this.score = this.scoreService.getScore(this.selectedCategory);
      console.log(this.score)
    }

    // get quiz data
this.quizService.fetchedData().subscribe(data => {
  this.quizData = data;
},
error => {
  console.error('Failed to fetch quiz data', error);
});
}

  playAgain() {
    this.router.navigate(['/'])
  }

  viewAllScores() {
    const allScores = this.scoreService.getAllScores()
    this.allScores = allScores
  }

}
