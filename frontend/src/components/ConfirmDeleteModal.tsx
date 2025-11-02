interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting?: boolean;
  deleteType?: "single" | "all";
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting = false,
  deleteType = "single",
}: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 border border-red-200">
        <div className="bg-red-50 px-6 py-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-semibold text-red-800">{title}</h3>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="text-gray-700 leading-relaxed">{message}</p>
          {deleteType === "all" && (
            <p className="mt-3 text-sm text-red-600 font-medium">
              この操作は取り消せません。
            </p>
          )}
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            キャンセル
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "削除中..." : "削除する"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
