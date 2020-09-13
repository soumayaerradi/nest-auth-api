import { IsString } from "class-validator";

export class QuoteDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;
}