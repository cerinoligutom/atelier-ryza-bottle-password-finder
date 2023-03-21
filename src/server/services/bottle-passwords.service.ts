import { FieldMixMapQB } from '../data';
import { OrderByDirection } from '~/enums';

function getByPassword(password: string, levelLimit = 100) {
  return FieldMixMapQB.like('password', password)
    .lessThan('level', levelLimit + 1)
    .orderBy('level', OrderByDirection.DESC)
    .exec();
}

export const bottlePasswordsService = {
  getByPassword,
};
