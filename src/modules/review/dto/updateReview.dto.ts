import {IsInt, IsNotEmpty, Min, Max, IsString} from 'class-validator';

export class UpdateReviewDTO {
    @IsInt()
    @Min(1)
    @Max(5)
    rating!: number;

    @IsString()
    @IsNotEmpty()
    comment!: string;
}
