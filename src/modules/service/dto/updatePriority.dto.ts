import {IsInt, Min} from 'class-validator';

export class UpdatePriorityDTO {
    @IsInt()
    @Min(0)
    priority!: number;
}
