import {ErrorMessage} from "../../../exceptions/types.exceptions";
import { IsInt } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateInvitesDto {
  @ApiProperty({required: true})
  @IsInt({message: ErrorMessage.INT})
  readonly teamId: number;

  @ApiProperty({required: true})
  @IsInt({message: ErrorMessage.INT})
  readonly userId: number;
}
