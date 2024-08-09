import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { QuizService } from '../../services/quiz.service';
import { Quiz, response } from '../../interfaces/response';

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

 constructor(private categoryService: CategoryService,
            private quizService: QuizService) {}


  ngOnInit() {
// filter questions based on category
this.categoryService.selectedCategory$
.subscribe(category => {
  this.selectedCategory = category;
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
  console.log(this.filteredQuestions); 
  this.currentQuestionIndex = 0;
}

// get option label
getOptionLabel(index: number): string {
  return String.fromCharCode(65 + index); // Converts index to A, B, C, D
}

// get selected option
getSelectedOption(option: string) {
  this.selectedOption = option;
}

// check if answer is correct
checkAnswer(){
if(this.selectedOption === this.filteredQuestions[this.currentQuestionIndex].questions[this.currentQuestionIndex].answer){
  this.score++;
  console.log(this.score)
}
this.nextQuestion();
}

// move to next question
nextQuestion(){
  if(this.currentQuestionIndex < this.filteredQuestions.length - 1){
    this.currentQuestionIndex++;
    console.log(this.currentQuestionIndex, 'next')
    this.selectedOption = '';
  }
}
}