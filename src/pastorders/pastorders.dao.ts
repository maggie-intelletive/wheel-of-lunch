import { DatabaseService } from '../shared/database.service';
import { Injectable } from '@nestjs/common';
import { PastordersDto, PastordersDtoWithResInfo } from './pastorders.dto';
import * as knexnest from 'knexnest';

@Injectable()
export class PastordersDao {
  constructor(private readonly databaseservice: DatabaseService) {}

  async findAll() {
    const cnex = await this.databaseservice.getConnection();
    return cnex.select().from('pastorders');
  }

  async findAllWithName() {
    const knex = await this.databaseservice.getConnection();
    return knexnest(
      knex
        .select(
          'orders.id as _id',
          'orders.person_who_ordered as _personWhoOrdered',
          'orders.cost as _cost',
          'orders.dishes as _dishes',
          'orders.date_ordered as _dateOrdered',
          'selections.id as _resDto_id',
          'selections.name as _resDto_name',
          'selections.rating as _resDto_rating',
          'selections.type as _resDto_type',
        )
        .from('pastorders as orders')
        .leftJoin(
          'resselections as selections',
          'orders.res_id',
          '=',
          'selections.id',
        ),
    );
  }
  async insertIntoTable(ordersdto: PastordersDto) {
    const knex = await this.databaseservice.getConnection();
    const arr = knex.insert(ordersdto).into('pastorders').returning('*');
    return (await arr)[0];
  }

  async deleteFromTable(id: number) {
    const knex = await this.databaseservice.getConnection();
    const query = knex('pastorders').where('id', id).del().returning('id');
    return query;
  }

  async getOrderById(id: number) {
    const knex = await this.databaseservice.getConnection();
    const arr = knexnest(
      knex
        .select(
          'orders.id as _id',
          'orders.person_who_ordered as _personWhoOrdered',
          'orders.cost as _cost',
          'orders.dishes as _dishes',
          'orders.date_ordered as _dateOrdered',
          'selections.id as _resDto_id',
          'selections.name as _resDto_name',
          'selections.rating as _resDto_rating',
          'selections.type as _resDto_type',
        )
        .from('pastorders as orders')
        .leftJoin(
          'resselections as selections',
          'orders.res_id',
          '=',
          'selections.id',
        )
        .where('orders.id', id),
    );
    return (await arr)[0];
  }

  async updateTableVal(ordersdto: PastordersDto, id: number) {
    const knex = await this.databaseservice.getConnection();
    return knex('pastorders').where('id', id).update(ordersdto).returning('*');
  }

  async findOrders(name: string, date: Date, res_name: string, cost: number) {
    const knex = await this.databaseservice.getConnection();
    const orders = knex
      .from('pastorders')
      .join('resselections', 'pastorders.resId', '=', 'resselections.id')
      .select('pastorders.dishes', 'resselections.name')
      .where('person_who_ordered', 'ILIKE', name)
      .returning('pastorders.dishes', 'resselections.name');
    if (date) {
      orders.andWhere('date_ordered', date);
    }
    if (res_name) {
      orders.andWhere('resselections.name', 'ILIKE', '%' + res_name + '%');
    }
    if (cost) {
      orders.andWhere('cost', cost);
    }
    return orders;
  }
}
