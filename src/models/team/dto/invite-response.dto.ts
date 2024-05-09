import {ErrorMessage} from "../../../exceptions/types.exceptions";
import { IsInt, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { InviteStatus } from "@prisma/client";

export class InviteResponseDto {
  @ApiProperty({required: true})
  @IsInt({message: ErrorMessage.INT})
  readonly id: number;

  @ApiProperty({required: true})
  @IsString({message: ErrorMessage.STRING})
  readonly status: InviteStatus;
}
