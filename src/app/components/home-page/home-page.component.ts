import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { response } from '../../interfaces/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  quizData: response={quizzes:[]};

  constructor(private dataService: DataService,
              private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataService.fetchQuizData()
    .subscribe(data => {
      this.quizData = data; 
      console.log(data); 
    });
  }

  navigateToQuiz() {
    this.router.navigate(['/quiz'])
    console.log('clicked')
  }
}
