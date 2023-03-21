import { initLoaders } from './dataloaders';

export interface IGraphQLContext {
  loaders: ReturnType<typeof initLoaders>;
}
