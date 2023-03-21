import { Resolvers } from '#graphql/resolver';
import { passwordResolver } from './password.resolver';
import { primaryItemResolver } from './primary-item.resolver';
import { secondaryItemResolver } from './secondary-item.resolver';
import { monsterResolver } from './monster.resolver';
import { bossResolver } from './boss.resolver';
import { itemNameResolver } from './item-name.resolver';

export const resolvers: Resolvers = {
  Query: {
    password: passwordResolver,
    itemName: itemNameResolver,
  },
  PasswordResult: {
    primaryItem: primaryItemResolver,
    secondaryItem: secondaryItemResolver,
    monster: monsterResolver,
    boss: bossResolver,
  },
};
