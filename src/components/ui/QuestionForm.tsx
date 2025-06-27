// 魔法の質問フォームコンポーネント

interface QuestionFormProps {
  question: string;
  onChange: (question: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

const QuestionForm = ({
  question,
  onChange,
  placeholder = "占いたいことを入力してください",
  maxLength = 100,
  disabled = false,
}: QuestionFormProps) => {
  return (
    <div className="w-full max-w-md mb-6">
      <div className="relative">
        {/* シンプルなラベル */}
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {disabled ? "入力済みの質問" : "あなたの質問"}
          </label>
        </div>
        
        <textarea
          className={`w-full rounded-xl text-base p-4 transition-all duration-200 resize-none ${
            disabled 
              ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20'
          }`}
          placeholder={disabled ? "占い完了" : placeholder}
          maxLength={maxLength}
          value={question}
          onChange={(e) => disabled ? undefined : onChange(e.target.value)}
          rows={3}
          disabled={disabled}
          readOnly={disabled}
        />
        
        {/* 文字数カウンター */}
        {!disabled && (
          <div className="absolute bottom-2 right-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{question.length}</span>
            <span className="mx-1">/</span>
            <span>{maxLength}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;