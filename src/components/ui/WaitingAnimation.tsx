import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../public/animation/waiting-time.json';
import GlassBox from './GlassBox';

interface WaitingAnimationProps {
  onAnimationComplete: () => void;
}

const WaitingAnimation = ({ onAnimationComplete }: WaitingAnimationProps) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // 3秒後にフェードアウト開始（元のアニメーション3回分の時間）
    const timer = setTimeout(() => {
      setOpacity(0);
      // フェードアウト完了後にコールバック実行
      setTimeout(() => {
        onAnimationComplete();
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div
      className="flex items-center justify-center min-h-[200px] transition-opacity duration-1000 ease-out w-full"
      style={{ opacity }}
    >
      <GlassBox className="p-6 flex items-center justify-center">
        <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay={false}
            initialSegment={[0, 1]}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </GlassBox>
    </div>
  );
};

export default WaitingAnimation;