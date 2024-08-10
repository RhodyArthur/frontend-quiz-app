import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.applyDefaultTheme();
   }
  isLightMode:boolean = false;

  toggleLightMode(){
    this.isLightMode = !this.isLightMode;
    this.updateTheme();
  }

  private updateTheme(){
    const body = document.getElementsByTagName('body')[0];
    if(this.isLightMode){
      body.classList.add('light-mode')
      body.classList.remove('dark-mode')
    }
    else {
      body.classList.remove('light-mode')
      body.classList.add('dark-mode')
    }
  }


  private applyDefaultTheme(){
    this.isLightMode = false;
    this.updateTheme();
  }
}
