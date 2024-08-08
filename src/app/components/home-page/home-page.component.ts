import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Resp } from '../../interfaces/response';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  quizzes: Resp={quizzes:[]};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataService.fetchQuizData()
    .subscribe(data => {
      this.quizzes = data; 
      console.log(data); 
    });
  }
}
