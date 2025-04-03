import {IsInt, IsNotEmpty, Min, Max, IsString} from 'class-validator';

export class CreateReviewDTO {
    @IsInt()
    orderId!: number;

    @IsInt()
    @Min(1)
    @Max(5)
    rating!: number;

    @IsString()
    @IsNotEmpty()
    comment!: string;
}
