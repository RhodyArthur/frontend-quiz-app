import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { ResultsComponent } from './components/results/results.component';
import { routeAccessGuard } from './guards/route-access.guard';

export const routes: Routes = [
    {path:'', title: 'Home', component: HomePageComponent}, 
    {path:'quiz', title: 'Quiz Page', component: QuizPageComponent, canActivate: [routeAccessGuard]}, 
    {path:'result', title: 'ResultComponent', component: ResultsComponent}
];
