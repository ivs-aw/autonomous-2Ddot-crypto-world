export enum MonsterType {
  Leaffy = 1,
  Firer,
  Grekky,
}

type MonsterConfig = {
  name: string;
  emoji: string;
};

export const monsterTypes: Record<MonsterType, MonsterConfig> = {
  [MonsterType.Leaffy]: {
    name: 'Leaffy',
    emoji: 'assets/leaffy.png',
  },
  [MonsterType.Firer]: {
    name: 'Firer',
    emoji: 'assets/firer.png',
  },
  [MonsterType.Grekky]: {
    name: 'Grekky',
    emoji: 'assets/grekky.png',
  },
};
