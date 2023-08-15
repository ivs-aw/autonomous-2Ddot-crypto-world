import { Entity } from '@latticexyz/recs';
import { ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useMUD } from './../../../context/MUDContext';

type Props = {
  width: number;
  height: number;
  onTileClick?: (x: number, y: number) => void;
  terrain?: {
    x: number;
    y: number;
    emoji: string;
  }[];
  players?: {
    x: number;
    y: number;
    emoji: string;
    entity: Entity;
  }[];
  encounter?: ReactNode;
};

/**
 * GameMap Component
 * @param param0 
 * @returns 
 */
export const GameMap = ({
  width,
  height,
  onTileClick,
  terrain,
  players,
  encounter,
}: Props) => {
  const {
    network: { playerEntity },
  } = useMUD();

  const rows = new Array(width).fill(0).map((_, i) => i);
  const columns = new Array(height).fill(0).map((_, i) => i);

  const [showEncounter, setShowEncounter] = useState(false);
  // Reset show encounter when we leave encounter
  useEffect(() => {
    if (!encounter) {
      setShowEncounter(false);
    }
  }, [encounter]);

  return (
    <div className='inline-grid p-2 relative overflow-hidden bg-base w-[380] h-[380]'>
      {rows.map((y) =>
        columns.map((x) => {
          const terrainEmoji = terrain?.find(
            (t) => t.x === x && t.y === y
          )?.emoji;

          const playersHere = players?.filter((p) => p.x === x && p.y === y);
          const mainPlayerHere = playersHere?.find(
            (p) => p.entity === playerEntity
          );

          return (
            <div
              key={`${x},${y}`}
              className={twMerge(
                'w-[6vw] h-[6vw] flex items-center justify-center',
                onTileClick ? 'cursor-pointer hover:ring' : null
              )}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
              onClick={() => {
                onTileClick?.(x, y);
              }}
            >
              {encounter && mainPlayerHere ? (
                <div
                  className='absolute z-10 animate-battle black'
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    boxShadow: '0 0 0 100vmax black',
                  }}
                  onAnimationEnd={() => {
                    setShowEncounter(true);
                  }}
                ></div>
              ) : null}
              <div className='flex flex-wrap gap-1 items-center justify-center relative'>
                {terrainEmoji ? (
                  <div className='absolute inset-0 flex items-center justify-center text-3xl pointer-events-none'>
                    {/* {terrainEmoji} is field object */}
                    <img
                      width='98'
                      height='6vw'
                      className='max-w-none h-[6vw] w-[6vw]'
                      src={terrainEmoji}
                    ></img>
                  </div>
                ) : null}
                <div className='relative'>
                  {playersHere?.map((p) => (
                    <span key={p.entity}>
                      <img
                        width='5.5vw'
                        height='5.5vw'
                        className='max-w-none h-[5.2vw] w-[5.2vw]'
                        src={p.emoji}
                      ></img>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* encounter view */}
      {encounter && showEncounter ? (
        <div
          className='relative z-10 -m-2 bg-base text-white flex items-center justify-center w-[540px]'
          style={{
            gridColumnStart: 1,
            gridColumnEnd: width + 1,
            gridRowStart: 1,
            gridRowEnd: height + 1,
          }}
        >
          {encounter}
        </div>
      ) : null}
    </div>
  );
};
