import { Question } from "./question";

export class Tag {
    constructor(
        public tagName: string,
        public questions: Question[]){
            
        }
}
