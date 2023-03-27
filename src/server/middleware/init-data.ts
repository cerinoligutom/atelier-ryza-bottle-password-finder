import { EnemyDataQB, FieldMixEnemyQB, FieldMixMapInfoQB, FieldMixMapQB } from '../data';

export default defineEventHandler(async () => {
  // For when the serverless function goes from cold start

  const hasEmpty = [EnemyDataQB, FieldMixEnemyQB, FieldMixMapInfoQB, FieldMixMapQB].some((qb) => qb['_data'].length === 0);

  if (hasEmpty) {
    console.info('Initializing data...');
    await $fetch('/api/init');
  }
});
