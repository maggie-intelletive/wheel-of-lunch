import {
  Get,
  Post,
  Controller,
  Body,
  UsePipes,
  Res,
  Param,
  HttpStatus,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PastordersService } from './pastorders.service';
import { PastordersDto, PastordersDtoWithResInfo } from './pastorders.dto';

@Controller('api/pastorders')
export class PastordersController {
  constructor(private readonly pastorderservice: PastordersService) {}

  @Get()
  async findAll(
    @Query('withname') withname: boolean,
  ): Promise<PastordersDto[] | PastordersDtoWithResInfo[]> {
    if (withname) {
      return this.pastorderservice.findAllWithName();
    }
    return this.pastorderservice.findAll();
  }

  @Post()
  async insertToTable(@Body() pastordersDto: PastordersDto) {
    return await this.pastorderservice.insertIntoTable(pastordersDto);
  }

  // should get the order corresponding to the given id
  // should return a 404 error when id doesn't exist
  @Get('/:id')
  async getOrderById(@Res() res, @Param('id') id: number) {
    const orderInfo = await this.pastorderservice.getOrderById(id);
    if (orderInfo === undefined || orderInfo === null) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
    res.status(HttpStatus.OK).send(orderInfo);
  }

  // delete order from id
  @Delete('/:id')
  async deleteFromTable(@Param('id') id: number) {
    return await this.pastorderservice.deleteFromTable(id);
  }

  // will take an id and a body = partial dto Promise<dto> (doesn't have to have every element
  // should update included fields in database
  // also handle nulls and ignore undefined
  //.update
  @Put('/:id')
  //@UsePipes(new ValidationPipe())
  async updateTableVal(
    @Body() orderDto: PastordersDto,
    @Param('id') id: number,
  ) {
    const update = await this.pastorderservice.updateTableVal(orderDto, id);
    return update;
  }

  // path: '/kyle/orders?dateOrdered=something&res=pizzahut ignore any params we don't care about
  // @QueryParam type any
  @Get('/:name/orders')
  //takes a personWhoOrdered's name and gives every dish they've ordered
  async findOrders(
    @Param('name') name: string,
    @Query('date') date: Date,
    @Query('restaurant_name') res_name: string,
    @Query('cost') cost: number,
  ) {
    return await this.pastorderservice.findOrders(name, date, res_name, cost);
  }
}
