import { IsString, IsDecimal, IsOptional, IsNumber } from 'class-validator';

export class ResselectionsDto {
  @IsString() @IsOptional() readonly name: string;

  @IsNumber() @IsOptional() readonly rating: number;

  @IsString() @IsOptional() readonly type: string;
}
