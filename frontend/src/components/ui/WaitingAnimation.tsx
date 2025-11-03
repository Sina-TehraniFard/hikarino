import GlassBox from "./GlassBox";

interface WaitingAnimationProps {
  progress?: number;
}

const WaitingAnimation = ({ progress = 0 }: WaitingAnimationProps) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <GlassBox className="p-6 flex flex-col items-center justify-center gap-4">
        {/* パーセンテージ表示 */}
        <div className="text-center mb-2">
          <div className="text-purple-600 font-semibold text-lg">
            {Math.round(progress)}%
          </div>
          <div className="text-gray-500 text-sm mt-1">
            ヒカリノがタロットをリーディング...
          </div>
        </div>

        {/* 横方向の進行バー */}
        <div className="w-full max-w-md">
          {/* バーの背景（グレー部分） */}
          <div className="h-3 bg-purple-200/30 rounded-full overflow-hidden">
            {/* バーの前景（進行部分） */}
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </GlassBox>
    </div>
  );
};

export default WaitingAnimation;
