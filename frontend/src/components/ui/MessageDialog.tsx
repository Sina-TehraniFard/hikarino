// 共通メッセージダイアログコンポーネント

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "info" | "warning" | "error" | "success";
}

const MessageDialog = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
}: MessageDialogProps) => {
  if (!isOpen) return null;

  const typeStyles = {
    info: {
      icon: "💭",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    warning: {
      icon: "⚠️",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
    error: {
      icon: "❌",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      buttonColor: "bg-red-600 hover:bg-red-700",
    },
    success: {
      icon: "✅",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    },
  };

  const style = typeStyles[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 ${style.borderColor} border`}
      >
        {/* ヘッダー */}
        <div className={`${style.bgColor} px-6 py-4 rounded-t-xl`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{style.icon}</span>
            <h3 className={`font-semibold ${style.textColor}`}>
              {title ||
                (type === "warning"
                  ? "注意"
                  : type === "error"
                    ? "エラー"
                    : type === "success"
                      ? "成功"
                      : "お知らせ")}
            </h3>
          </div>
        </div>

        {/* メッセージ */}
        <div className="px-6 py-4">
          <p className="text-gray-700 leading-relaxed">{message}</p>
        </div>

        {/* ボタン */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className={`w-full ${style.buttonColor} text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95`}
          >
            {type === "warning"
              ? "はい"
              : type === "error"
                ? "OK"
                : type === "success"
                  ? "OK"
                  : "了解"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDialog;
