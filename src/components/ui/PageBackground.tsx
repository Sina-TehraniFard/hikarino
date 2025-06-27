// 共通ページ背景コンポーネント

const PageBackground = () => {
  return (
    <div className="fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950/20" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl" />
    </div>
  );
};

export default PageBackground;