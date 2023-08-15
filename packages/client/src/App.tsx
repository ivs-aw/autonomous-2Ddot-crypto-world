import { SyncState } from '@latticexyz/network';
import { useComponentValue } from '@latticexyz/react';
import { GameBoard } from './components/GameSystem/GameBoard';
import { useMUD } from './context/MUDContext';

export const App = () => {
  const {
    components: { LoadingState },
    network: { singletonEntity },
  } = useMUD();

  const loadingState = useComponentValue(LoadingState, singletonEntity, {
    state: SyncState.CONNECTING,
    msg: 'Connecting',
    percentage: 0,
  });

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-around bg-no-repeat bg-center bg-cover'>
      {loadingState.state !== SyncState.LIVE ? (
        <div>
          {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
        </div>
      ) : (
        <GameBoard />
      )}
    </div>
  );
};
