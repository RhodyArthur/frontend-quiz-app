export interface Response {
    quizzes: {
        title: string,
        icon: string,
        questions: {
            question: string,
            options: string[],
            answer: string
        }[],
    }[]
}
