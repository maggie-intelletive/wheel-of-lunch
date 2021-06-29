import { Injectable } from '@nestjs/common';
import { Resselections } from './resselections.interface';
import { ResselectionsDao } from './resselections.dao';
import { ResselectionsDto } from './resselections.dto';

@Injectable()
export class ResselectionsService {
  constructor(private readonly resselectionsDao: ResselectionsDao) {}

  async findAll(): Promise<ResselectionsDto[]> {
    return this.resselectionsDao.findAll();
  }

  async insertIntoTable(restaurant: Resselections) {
    return this.resselectionsDao.insertIntoTable(restaurant);
  }

  async deleteFromTable(id: number) {
    return this.resselectionsDao.deleteFromTable(id);
  }

  async getId(id: number) {
    return this.resselectionsDao.getId(id);
  }

  async updateTableVal(restaurant: Resselections, id: number) {
    return this.resselectionsDao.updateTableVal(restaurant, id);
  }

  async findRes(name: string, rating: number, type: string) {
    return this.resselectionsDao.findRes(name, rating, type);
  }

  async searchRes(s: string, minRating: number) {
    return this.resselectionsDao.searchRes(s, minRating);
  }
}
