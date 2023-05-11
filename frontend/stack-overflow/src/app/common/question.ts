import { Tag } from "./tag";
import { User } from "./user";

export class Question {

    // id!: number;
    // user: User;
    // title!: string;
    // questionText!: string;
    // imageUrl!: string;
    // dateCreated!: Date;
    // lastUpdated!: Date;
    // tags!: Tag[];
    constructor(public id: number,
                public user: User,
                public title: string,
                public questionText: string,
                public imageUrl: string,
                public dateCreated: Date,
                public lastUpdated: Date,
                public tags: Tag[]){}
}
