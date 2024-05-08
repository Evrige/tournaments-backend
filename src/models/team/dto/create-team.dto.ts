import {ErrorMessage} from "../../../exceptions/types.exceptions";
import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTeamDto {
	@ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  readonly name: string;
}
