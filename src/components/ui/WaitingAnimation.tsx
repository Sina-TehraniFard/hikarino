import GlassBox from './GlassBox';

interface WaitingAnimationProps {
  progress?: number;
}

const WaitingAnimation = ({ progress = 0 }: WaitingAnimationProps) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <GlassBox className="p-6 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
        </div>
        <div className="text-center">
          <div className="text-purple-600 font-semibold text-lg">{Math.round(progress)}%</div>
          <div className="text-gray-500 text-sm mt-1">ヒカリノがタロットをリーディング...</div>
        </div>
      </GlassBox>
    </div>
  );
};

export default WaitingAnimation;