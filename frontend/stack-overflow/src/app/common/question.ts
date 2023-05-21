import { Answer } from "./answer";
import { Tag } from "./tag";
import { User } from "./user";

export class Question {
    constructor(public id: number,
                public user: User,
                public title: string,
                public questionText: string,
                public imageUrl: string,
                public dateCreated: Date,
                public lastUpdated: Date,
                public tags: Tag[],
                public answers: Answer[],
                public votecount: number){}
}
