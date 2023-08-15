import { useComponentValue, useEntityQuery } from '@latticexyz/react';
import { Entity, Has, getComponentValueStrict } from '@latticexyz/recs';
import { hexToArray } from '@latticexyz/utils';
import { useMUD } from '../../../context/MUDContext';
import { MonsterType, monsterTypes } from '../../../utils/monsterTypes';
import { TerrainType, terrainTypes } from '../../../utils/terrainTypes';
import { useKeyboardMovement } from '../../../utils/useKeyboardMovement';
import { EncounterScreen } from './../EncounterScreen';
import { GameMap } from './../GameMap';

/**
 * GameBoard Component
 * @returns 
 */
export const GameBoard = () => {
  useKeyboardMovement();

  const {
    components: { Encounter, MapConfig, Monster, Player, Position },
    network: { playerEntity, singletonEntity },
    systemCalls: { spawn },
  } = useMUD();

  const canSpawn = useComponentValue(Player, playerEntity)?.value !== true;

  const players = useEntityQuery([Has(Player), Has(Position)]).map((entity) => {
    const position = getComponentValueStrict(Position, entity);
    return {
      entity,
      x: position.x,
      y: position.y,
      emoji:
        entity === playerEntity ? 'assets/player.png' : 'assets/player.png',
    };
  });

  const mapConfig = useComponentValue(MapConfig, singletonEntity);
  console.log('mapConfig::', mapConfig);
  if (mapConfig == null) {
    throw new Error(
      'map config not set or not ready, only use this hook after loading state === LIVE'
    );
  }

  const { width, height, terrain: terrainData } = mapConfig;
  const terrain = Array.from(hexToArray(terrainData)).map((value, index) => {
    const { emoji } =
      value in TerrainType ? terrainTypes[value as TerrainType] : { emoji: '' };
    return {
      x: index % width,
      y: Math.floor(index / width),
      emoji,
    };
  });

  const encounter = useComponentValue(Encounter, playerEntity);
  const monsterType = useComponentValue(
    Monster,
    encounter ? (encounter.monster as Entity) : undefined
  )?.value;
  const monster =
    monsterType != null && monsterType in MonsterType
      ? monsterTypes[monsterType as MonsterType]
      : null;

  return (
    <GameMap
      width={width}
      height={height}
      terrain={terrain}
      onTileClick={canSpawn ? spawn : undefined}
      players={players}
      encounter={
        encounter ? (
          <EncounterScreen
            monsterName={monster?.name ?? 'MissingNo'}
            monsterEmoji={monster?.emoji ?? '💱'}
          />
        ) : undefined
      }
    />
  );
};
