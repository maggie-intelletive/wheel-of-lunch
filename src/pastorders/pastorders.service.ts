import { Injectable } from '@nestjs/common';
import { PastordersDao } from './pastorders.dao';
import { PastordersDto, PastordersDtoWithResInfo } from './pastorders.dto';
import { Pastorders } from './pastorders.interface';

@Injectable()
export class PastordersService {
  constructor(private readonly pastordersDao: PastordersDao) {}

  async findAll(): Promise<PastordersDto[]> {
    return this.pastordersDao.findAll();
  }

  async findAllWithName(): Promise<PastordersDtoWithResInfo[]> {
    return this.pastordersDao.findAllWithName();
  }

  async insertIntoTable(order: Pastorders) {
    return this.toClass(
      await this.pastordersDao.insertIntoTable(this.toPlain(order)),
    );
  }

  toPlain(pastorderdto: PastordersDto): any {
    const obj = {
      res_id: pastorderdto.resId,
      date_ordered: pastorderdto.dateOrdered,
      person_who_ordered: pastorderdto.personWhoOrdered,
      cost: pastorderdto.cost,
      dishes: pastorderdto.dishes,
    };
    return obj;
  }

  toClass(a: any): PastordersDto {
    return {
      resId: a.res_id,
      dateOrdered: a.date_ordered,
      personWhoOrdered: a.person_who_ordered,
      cost: a.cost,
      dishes: a.dishes,
    };
  }

  async deleteFromTable(id: number) {
    return this.pastordersDao.deleteFromTable(id);
  }

  async getOrderById(id: number) {
    return this.pastordersDao.getOrderById(id);
  }

  async updateTableVal(order: Pastorders, id: number) {
    return this.pastordersDao.updateTableVal(order, id);
  }

  async findOrders(name: string, date: Date, res_name: string, cost: number) {
    return this.pastordersDao.findOrders(name, date, res_name, cost);
  }
}
