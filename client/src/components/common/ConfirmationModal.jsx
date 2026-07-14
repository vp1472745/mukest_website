import { ShieldAlert } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#141414] border border-white/10 rounded-lg p-6">

        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7 text-red-400" />
          </div>
        </div>

        <h2 className="text-xl text-center font-semibold mt-5">
          {title}
        </h2>

        <p className="text-sm text-center text-gray-400 mt-3 leading-6">
          {message}
        </p>

        <div className="flex gap-3 mt-7">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 border border-white/10 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm font-medium"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 rounded-md text-sm font-medium text-white ${confirmColor}`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;