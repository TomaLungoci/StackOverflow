import { Question } from "./question";
import { User } from "./user";

export class Answer {

    constructor(
        public id: number | null,
        public user: User,
        public answerText: string,
        public imageUrl: string,
        public dateCreated: Date,
        public lastUpdated: Date,
        public question: Question,
        public votecount: number){}
}
