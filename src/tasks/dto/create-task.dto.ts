import { ApiProperty, PartialType } from "@nestjs/swagger";

export class TaskDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    orderValue: number
}


export class CreateTaskDto extends PartialType(TaskDto) {
    @ApiProperty()
    name: string;

    @ApiProperty()
    doDate: Date;
}
