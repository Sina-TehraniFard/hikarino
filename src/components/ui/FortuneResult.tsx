// 占い結果表示コンポーネント

interface FortuneResultProps {
  result: string;
  placeholder?: string;
}

const FortuneResult = ({
  result,
  placeholder = "カードを引いて、ヒカリノに解釈してもらいましょう。",
}: FortuneResultProps) => {
  return (
    <div className="rounded-2xl shadow-lg min-h-[200px] flex items-center justify-center border border-purple-100 p-8 transition-all duration-300 ease-in-out">
      {result ? (
        <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 w-full">
          {result}
        </div>
      ) : (
        <div className="text-gray-300 text-center w-full">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default FortuneResult;