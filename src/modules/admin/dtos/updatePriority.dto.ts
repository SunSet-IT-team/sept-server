import {IsInt, Min, Max} from 'class-validator';

export class UpdateUserPriorityDto {
    @IsInt()
    @Min(1)
    @Max(999)
    priority!: number;
}
