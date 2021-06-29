import {
  IsString,
  IsDecimal,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ResselectionsDto } from '../resselections/resselections.dto';
import { Expose } from 'class-transformer';

class PastordersDtoBase {
  @Expose({
    name: 'person_who_ordered',
    toPlainOnly: true,
  })
  @IsString()
  @IsOptional()
  readonly personWhoOrdered: string;

  @Expose({
    name: 'cost',
    toPlainOnly: true,
  })
  @IsDecimal()
  @IsOptional()
  readonly cost: number;

  @Expose({
    name: 'dishes',
    toPlainOnly: true,
  })
  @IsString()
  @IsOptional()
  readonly dishes: string;

  @Expose({
    name: 'date_ordered',
    toPlainOnly: true,
  })
  @IsDate()
  @IsOptional()
  readonly dateOrdered: Date;
}

export class PastordersDto extends PastordersDtoBase {
  @Expose({
    name: 'resId',
    toPlainOnly: true,
  })
  @IsNumber()
  @IsOptional()
  readonly resId: number;
}

export class PastordersDtoWithResInfo extends PastordersDtoBase {
  resDto: ResselectionsDto;
}
