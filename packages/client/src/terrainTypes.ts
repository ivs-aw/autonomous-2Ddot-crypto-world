export enum TerrainType {
  Grass = 1,
  Tree,
  Boulder,
  HasItem,
}

type TerrainConfig = {
  emoji: any;
};

export const terrainTypes: Record<TerrainType, TerrainConfig> = {
  [TerrainType.Grass]: {
    emoji: 'assets/glass.png',
  },
  [TerrainType.Tree]: {
    emoji: 'assets/tree.png',
  },
  [TerrainType.Boulder]: {
    emoji: 'assets/boulder.png',
  },
  [TerrainType.HasItem]: {
    emoji: 'assets/glass.png',
  },
};
