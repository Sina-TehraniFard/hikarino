// エラーメッセージ表示コンポーネント

interface ErrorMessageProps {
  error: string | null;
  className?: string;
}

const ErrorMessage = ({ error, className = "" }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <div className={`text-red-500 text-center mt-2 ${className}`}>
      {error}
    </div>
  );
};

export default ErrorMessage;