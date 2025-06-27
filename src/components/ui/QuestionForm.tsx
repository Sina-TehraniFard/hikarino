// 質問入力フォームコンポーネント

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
  placeholder = "質問を入力してください",
  maxLength = 100,
  disabled = false,
}: QuestionFormProps) => {
  return (
    <div className="w-full max-w-md mb-4">
      <textarea
        className={`w-full max-w-md border-2 rounded-xl text-base p-4 transition ${
          disabled 
            ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400' 
            : 'border-purple-100 focus:border-purple-300 text-gray-700 placeholder-gray-400 dark:border-purple-700 dark:focus:border-purple-500 dark:bg-gray-800 dark:text-gray-100'
        }`}
        placeholder={disabled ? "占い完了済み" : placeholder}
        maxLength={maxLength}
        value={question}
        onChange={(e) => disabled ? undefined : onChange(e.target.value)}
        rows={3}
        disabled={disabled}
        readOnly={disabled}
      />
    </div>
  );
};

export default QuestionForm;