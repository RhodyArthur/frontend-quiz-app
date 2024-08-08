import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { response } from '../interfaces/response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizData: response={quizzes:[]};

  constructor(private dataService: DataService) { }

  ngOnInit(){}

  fetchedData(): Observable<response> {
    return this.dataService.fetchQuizData() 
      .pipe(tap(data => {
        this.quizData = data;
      }));
  }

  getQuizData(): Observable<response> {
    return this.fetchedData();
  }
}
