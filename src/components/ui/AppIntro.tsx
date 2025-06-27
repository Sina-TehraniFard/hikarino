// ステップガイドコンポーネント - 不安解消のための目立つデザイン

const AppIntro = () => {
  return (
    <div className="mb-8 w-full max-w-md">
      {/* 統合されたステップガイド */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
        {/* ヘッダー */}
        <div className="text-center mb-5">
          <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md">
            <span className="text-xs font-bold tracking-wide">かんたん3ステップ</span>
          </div>
        </div>
        
        {/* ステップ */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              1
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">質問を入力</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">100文字以内で占いたいことを書く</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              2
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">タロットカードを引く</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">3枚のタロットカードが選ばれます</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              3
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">結果を待つ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">その場でタロットを読んでくれます</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntro;