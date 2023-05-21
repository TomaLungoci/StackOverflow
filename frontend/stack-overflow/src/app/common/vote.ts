import { Answer } from "./answer";
import { Question } from "./question";
import { User } from "./user";

export class Vote {
    constructor(
        public type: number,
        public answer: Answer | null,
        public question: Question | null,
        public user: User){}
}
