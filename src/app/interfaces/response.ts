// Define an interface for a single question
export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  // Define an interface for a single quiz
  export interface Quiz {
    title: string;
    icon: string;
    questions: Question[];
  }
  
  // Define an interface for the entire data structure
  export interface Resp {
    quizzes: Quiz[];
  }
  