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
  placeholder = "あなたの心の声を聞かせてください...",
  maxLength = 100,
  disabled = false,
}: QuestionFormProps) => {
  return (
    <div className="w-full max-w-md mb-6 relative">
      {/* 魔法のようなグロー効果 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-2xl blur opacity-20 animate-gradient" />
      
      <div className="relative">
        {/* 装飾的なラベル */}
        <div className="flex items-center justify-center mb-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          <span className="px-3 text-sm text-purple-600 dark:text-purple-400 font-serif italic">
            {disabled ? "運命は語られました" : "あなたの質問"}
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>
        
        <textarea
          className={`w-full rounded-2xl text-base p-6 transition-all duration-300 backdrop-blur-sm resize-none ${
            disabled 
              ? 'bg-purple-50/50 dark:bg-purple-950/20 text-gray-500 dark:text-gray-400 cursor-not-allowed border border-purple-200/30 dark:border-purple-700/30' 
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-100 placeholder:text-purple-400/60 dark:placeholder:text-purple-300/60 border border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300 dark:hover:border-purple-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 shadow-lg hover:shadow-xl'
          }`}
          placeholder={disabled ? "✨ 占い完了 ✨" : placeholder}
          maxLength={maxLength}
          value={question}
          onChange={(e) => disabled ? undefined : onChange(e.target.value)}
          rows={3}
          disabled={disabled}
          readOnly={disabled}
          style={{
            fontFamily: 'serif',
            letterSpacing: '0.025em'
          }}
        />
        
        {/* 文字数カウンター（エレガントに） */}
        {!disabled && (
          <div className="absolute bottom-2 right-3 text-xs text-purple-400/60 dark:text-purple-300/60">
            <span className="font-serif">{question.length}</span>
            <span className="mx-1">/</span>
            <span className="font-serif">{maxLength}</span>
          </div>
        )}
        
        {/* きらめきエフェクト */}
        {!disabled && (
          <>
            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-sparkle" />
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-sparkle delay-700" />
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;