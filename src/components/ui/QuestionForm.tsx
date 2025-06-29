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
          <textarea
            className={`w-full rounded-2xl text-lg p-4 pr-16 transition-all duration-200 resize-none ${
              disabled 
                ? 'bg-white/40 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400 cursor-not-allowed border border-white/20 dark:border-gray-700/50' 
                : 'bg-white/30 dark:bg-gray-900/30 text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-white/20 dark:border-white/10 hover:border-purple-400/50 dark:hover:border-purple-500/50 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 backdrop-blur-md shadow-xl ring-1 ring-white/10 hover:shadow-2xl'
            }`}
            placeholder={disabled ? "占い完了" : placeholder}
            maxLength={maxLength}
            value={question}
            onChange={(e) => disabled ? undefined : onChange(e.target.value)}
            rows={4}
            disabled={disabled}
            readOnly={disabled}
          />
          
          {/* 文字数カウンター - テキストエリア内に配置 */}
          {!disabled && (
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 dark:text-gray-500">
              <span className={question.length >= maxLength * 0.9 ? 'text-orange-500' : ''}>{question.length}</span>
              <span className="mx-0.5">/</span>
              <span>{maxLength}</span>
            </div>
          )}
        </div>
    </div>
  );
};

export default QuestionForm;