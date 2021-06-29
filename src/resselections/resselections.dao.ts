import { DatabaseService } from '../shared/database.service';
import { Injectable } from '@nestjs/common';
import { ResselectionsDto } from './resselections.dto';

@Injectable()
export class ResselectionsDao {
  constructor(private readonly databaseservice: DatabaseService) {}

  async findAll() {
    const cnex = await this.databaseservice.getConnection();
    return cnex.select().from('resselections');
  }

  async insertIntoTable(resdto: ResselectionsDto) {
    const knex = await this.databaseservice.getConnection();
    return knex.insert(resdto).into('resselections').returning('*');
  }

  async deleteFromTable(id: number) {
    const knex = await this.databaseservice.getConnection();
    return knex
      .select()
      .from('resselections')
      .where('id', id)
      .del()
      .returning('id');
  }

  async getId(id: number) {
    const knex = await this.databaseservice.getConnection();
    const resInfo = await knex
      .select()
      .from('resselections')
      .where('id', id)
      .returning('*');
    return resInfo[0];
  }

  async updateTableVal(resdto: ResselectionsDto, id: number) {
    const knex = await this.databaseservice.getConnection();
    return knex('resselections').where('id', id).update(resdto).returning('*');
  }

  async findRes(name: string, rating: number, type: string) {
    const knex = await this.databaseservice.getConnection();
    const info = knex
      .from('pastorders')
      .join('resselections', 'pastorders.resId', '=', 'resselections.id')
      .select('resId', 'name', 'type', 'rating')
      .where('name', 'ILIKE', '%' + name + '%')
      .count('resId as number of past orders')
      .groupBy('resId', 'name', 'type', 'rating')
      .returning('*');
    if (rating) {
      info.andWhere('rating', rating);
    }
    if (type) {
      info.andWhere('type', type);
    }
    return info;
  }

  //where minRating >= 4.5?
  async searchRes(s: string, minRating: number) {
    const knex = await this.databaseservice.getConnection();
    if (!minRating) {
      minRating = 0;
    }
    return knex
      .from('resselections')
      .select('*')
      .where('type', 'ILIKE', '%' + s + '%')
      .orWhere('name', 'ILIKE', '%' + s + '%')
      .andWhere('rating', '>=', minRating)
      .returning('*');
  }
}
