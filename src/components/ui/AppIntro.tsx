// アプリ説明コンポーネント

const AppIntro = () => {
  return (
    <div className="text-center mb-8 px-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        タロット占い
      </h2>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        あなたの質問にタロットカードでお答えします
      </p>
      
      <div className="mt-6 bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4">
        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
            <span>質問を入力</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
            <span>タロットカードを引く</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 bg-purple-600 text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
            <span>ヒカリノに占ってもらう</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntro;