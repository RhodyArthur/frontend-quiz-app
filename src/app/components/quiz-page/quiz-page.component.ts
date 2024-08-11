import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { QuizService } from '../../services/quiz.service';
import { Quiz, response } from '../../interfaces/response';
import { Router } from '@angular/router';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css'
})
export class QuizPageComponent {
  quizData: response = {quizzes: []};
  selectedCategory: string | null = null;
  filteredQuestions: Quiz[] = [];
  currentQuestionIndex: number = 0;

  selectedOption: string = ''
  score: number = 0

  // track correct and incorrect answers
  showError: boolean = false;
  isCorrect: boolean = false;
  isInCorrect: boolean = false;
  isLoading: boolean = false;

 constructor(private categoryService: CategoryService,
            private quizService: QuizService,
            private router: Router,
            private scoreService: ScoreService) {}


  ngOnInit() {
// filter questions based on category
this.categoryService.selectedCategory$
.subscribe(category => {
  this.selectedCategory = category;
  if(this.selectedCategory){
    this.scoreService.setScore(this.selectedCategory || '', 0)
  }
  this.filterQuestionsByCategory();
})

// get quiz data
this.quizService.fetchedData().subscribe(data => {
  this.quizData = data;
  this.filterQuestionsByCategory();
},
error => {
  console.error('Failed to fetch quiz data', error);
});

}

// filter questions by category
filterQuestionsByCategory() {
  if(this.selectedCategory) {
    this.filteredQuestions = this.quizData.quizzes.filter(quiz => quiz.title === this.selectedCategory);
  }
  this.currentQuestionIndex = 0;
  this.score = this.scoreService.getScore(this.selectedCategory || '');
}

// get option label
getOptionLabel(index: number): string {
  return String.fromCharCode(65 + index); // Converts index to A, B, C, D
}

// get selected option
getSelectedOption(option: string) {
  this.selectedOption = option;
  this.showError = false
}

// check if answer is correct
checkAnswer(){
if(!this.selectedOption){
  this.showError = true;
  return;
}
if(this.selectedOption === this.filteredQuestions[0].questions[this.currentQuestionIndex].answer){
  this.score++
  this.isCorrect = true;
  console.log(this.score)
}
else {
  this.isInCorrect = true;
}

// displaying loading feature
this.isLoading = true;

// delay next question for user to see immediate effect
setTimeout(()=>{
  this.nextQuestion();
  this.isLoading = false;
}, 1000)
}

isCorrectOption(option:string): boolean {
  return this.isCorrect && option === this.filteredQuestions[0].questions[this.currentQuestionIndex].answer;
}


isInCorrectOption(option:string): boolean {
  return this.isInCorrect && this.selectedOption === option;
}

isSelected(option: string): boolean {
  return this.selectedOption === option;
}

// move to next question
nextQuestion(){
  if(this.currentQuestionIndex < this.filteredQuestions[0].questions.length - 1){
    this.currentQuestionIndex++;
    this.resetForNextQuestion();
  }
  else {
    this.completeQuiz();
  }
}

resetForNextQuestion() {
  this.selectedOption = ''
  this.isCorrect = false
  this.isInCorrect = false
  this.showError = false
}

// update progress bar
updateProgress(): number{
  if(this.filteredQuestions.length > 0) {
    const totalQuestions = this.filteredQuestions[0].questions.length;
    return ((this.currentQuestionIndex + 1) / totalQuestions) * 100
  }
  return 0;
}

// complete quiz
completeQuiz() {
  this.scoreService.setScore(this.selectedCategory || '', this.score);
  this.router.navigate(['/result']);
}


}