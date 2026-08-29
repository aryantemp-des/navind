import React, { useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="clay-card relative z-10 w-full max-w-md p-6 sm:p-8 overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="clay-icon-well w-10 h-10 flex items-center justify-center rounded-xl shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">{title}</h3>
              </div>
              <button
                onClick={onCancel}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
              {message}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onCancel}
                className="clay-btn-secondary px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="clay-btn-primary px-6 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider text-white cursor-pointer"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
