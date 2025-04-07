import {IsInt, Min} from 'class-validator';

export class FavoriteDTO {
    @IsInt()
    @Min(1)
    executorId!: number;
}
