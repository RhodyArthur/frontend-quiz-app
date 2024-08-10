import { Injectable } from '@angular/core';
import { QuizService } from './quiz.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private storageKey = 'categoryScores'

 
  constructor() { }

// get score for a specific category
getScore(category: string): number {
  const scores = this.getAllScores();
  return scores[category] || 0;
}

// update or set score for a particular category
setScore(category: string, score:number): void {
  const scores = this.getAllScores();
  scores[category] = score;
  this.saveScores(scores);
}

// get all scores
getAllScores() : {[key: string]: number} {
  const scores = localStorage.getItem(this.storageKey);
  return scores ? JSON.parse(scores) : {};
}

// save scores to local storage
private saveScores(scores: {[key:string]: number}): void{
  localStorage.setItem(this.storageKey, JSON.stringify(scores))
}

 // Increment score for a particular category
 incrementScore(category: string): void {
  const scores = this.getAllScores();
  if (scores[category] !== undefined) {
    scores[category]++;
  } else {
    scores[category] = 1; 
  }
  this.saveScores(scores);
}

}
