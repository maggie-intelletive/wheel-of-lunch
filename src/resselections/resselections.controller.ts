import {
  Get,
  Post,
  Controller,
  Body,
  UsePipes,
  Delete,
  Put,
  Param,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ResselectionsDto } from './resselections.dto';
import { ValidationPipe } from '../common/validation.pipe';
import { ResselectionsService } from './reselections.service';
import { isString } from 'class-validator';

@Controller('/api/resselections')
export class ResselectionsController {
  constructor(private readonly resselectionService: ResselectionsService) {}

  @Get()
  async findAll(): Promise<ResselectionsDto[]> {
    return this.resselectionService.findAll();
  }

  @Get('/search')
  async searchRes(
    @Query('s') s: string,
    @Query('minRating') minRating: number,
    @Res() res,
  ) {
    if (!isNaN(minRating) || !minRating) {
      //throw bad request
      // do same thing for everything else
      res.status(HttpStatus.BAD_REQUEST);
    }
    if (!isString(s) || !s) {
      res.status(HttpStatus.BAD_REQUEST);
    }
    return await this.resselectionService.searchRes(s, minRating);
  }

  // should get the restaurant corresponding to the given id
  // should return a 404 error when id doesn't exist
  @Get('/:id')
  async getId(@Res() res, @Param('id') id: number) {
    const resInfo = await this.resselectionService.getId(id);
    if (resInfo === undefined || resInfo === null) {
      res.status(HttpStatus.NOT_FOUND).send();
    } else {
      res.status(HttpStatus.OK).send(resInfo);
    }
  }

  @Post()
  async insertToTable(@Body() resselectionDto: ResselectionsDto) {
    return this.resselectionService.insertIntoTable(resselectionDto);
  }

  // delete restaurant from id
  @Delete('delete/:id')
  async deleteFromTable(@Param('id') id?: number) {
    return await this.resselectionService.deleteFromTable(id);
  }

  // will take an id and a body = partial dto Promise<dto> (doesn't have to have every element
  // should update included fields in database
  // also handle nulls and ignore undefined
  //.update
  @Put('/:id')
  //@UsePipes(new ValidationPipe())
  async updateTableVal(
    @Body() resselectionDto: ResselectionsDto,
    @Param('id') id: number,
  ) {
    if (typeof id !== 'number') {
      id = Number(id);
    }
    const update = await this.resselectionService.updateTableVal(
      resselectionDto,
      id,
    );
    return update;
  }

  @Get('/:name/info')
  async findRes(
    @Param('name') name: string,
    @Query('rating') rating: number,
    @Query('type') type: string,
  ) {
    return await this.resselectionService.findRes(name, rating, type);
  }
}
