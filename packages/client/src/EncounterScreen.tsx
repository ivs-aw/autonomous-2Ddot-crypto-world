import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { useMUD } from './MUDContext';
import { MonsterCatchResult } from './monsterCatchResult';
import './styles/index.css';

type Props = {
  monsterName: string;
  monsterEmoji: string;
};

export const EncounterScreen = ({ monsterName, monsterEmoji }: Props) => {
  const {
    systemCalls: { throwBall, fleeEncounter },
  } = useMUD();

  const [appear, setAppear] = useState(false);
  useEffect(() => {
    // sometimes the fade-in transition doesn't play, so a timeout is a hacky fix
    const timer = setTimeout(() => setAppear(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={twMerge(
        'flex flex-col gap-10 items-center justify-center text-white transition-opacity duration-1000 w-[500px]',
        appear ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className='text-8xl animate-bounce'>
        <img
          width='98'
          height='98'
          className='max-w-none h-[98px]'
          src={monsterEmoji}
        ></img>
      </div>
      {/* memo:  メッセージウインド */}
      <div className='textboard'>
        <p className='encounter-text'>
          あ、野生の {monsterName} があらわれた！
        </p>
      </div>

      <div className='flex gap-2'>
        <button
          type='button'
          className='bg-stone-600 hover:ring rounded-lg px-4 py-2'
          onClick={async () => {
            const toastId = toast.loading('Throwing emojiball…');
            const result = await throwBall();
            if (result === MonsterCatchResult.Caught) {
              toast.update(toastId, {
                isLoading: false,
                type: 'success',
                render: `${monsterName} を捕まえたぞ！`,
                autoClose: 5000,
                closeButton: true,
              });
            } else if (result === MonsterCatchResult.Fled) {
              toast.update(toastId, {
                isLoading: false,
                type: 'default',
                render: `Oh no, the ${monsterName} fled!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else if (result === MonsterCatchResult.Missed) {
              toast.update(toastId, {
                isLoading: false,
                type: 'error',
                render: '捕獲に失敗した💦',
                autoClose: 5000,
                closeButton: true,
              });
            } else {
              throw new Error(
                `Unexpected catch attempt result: ${MonsterCatchResult[result]}`
              );
            }
          }}
        >
          ☄️ 捕獲する
        </button>
        <button
          type='button'
          className='bg-stone-800 hover:ring rounded-lg px-4 py-2'
          onClick={async () => {
            const toastId = toast.loading('Running away…');
            await fleeEncounter();
            toast.update(toastId, {
              isLoading: false,
              type: 'default',
              render: `上手く逃げれた！`,
              autoClose: 5000,
              closeButton: true,
            });
          }}
        >
          🏃‍♂️ 逃げる
        </button>
      </div>
    </div>
  );
};
