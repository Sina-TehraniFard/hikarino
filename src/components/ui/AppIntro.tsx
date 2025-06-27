// ステップガイドコンポーネント

const AppIntro = () => {
  return (
    <div className="mt-8 mb-6 bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4 max-w-md w-full">
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-3 font-medium">
        かんたん3ステップ
      </p>
      <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 space-y-2">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0">1</span>
          <span>質問を入力</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0">2</span>
          <span>タロットカードを引く</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0">3</span>
          <span>ヒカリノに占ってもらう</span>
        </div>
      </div>
    </div>
  );
};

export default AppIntro;