import { IsString } from "class-validator";
import { UserRO } from "src/user/user.dto";

export class QuoteDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class QuoteRO {
    id?: string;
    created: Date;
    updated: Date;
    title: string;
    description: string;
    author: UserRO;
}