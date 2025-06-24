// 質問入力フォームコンポーネント

interface QuestionFormProps {
  question: string;
  onChange: (question: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const QuestionForm = ({
  question,
  onChange,
  placeholder = "100文字以内で占いたいことを書いてください（例：仕事の今後が知りたいです）",
  maxLength = 100,
}: QuestionFormProps) => {
  return (
    <div className="w-full max-w-md mb-4">
      <textarea
        className="w-full max-w-md border-2 border-purple-100 focus:border-purple-300 rounded-xl text-base text-gray-700 placeholder-gray-400 p-4 transition"
        placeholder={placeholder}
        maxLength={maxLength}
        value={question}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    </div>
  );
};

export default QuestionForm;