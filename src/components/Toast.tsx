import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-amber-400" />,
  };

  const borders = {
    success: 'border-emerald-500/40 bg-pitch-950/90 text-emerald-200',
    error: 'border-rose-500/40 bg-stadium-950/90 text-rose-200',
    info: 'border-amber-500/40 bg-stadium-950/90 text-amber-200',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-xl ${borders[type]}`}>
        {icons[type]}
        <span className="text-sm font-semibold font-sans">{message}</span>
        <button onClick={onClose} className="p-1 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
