import { useEffect, useState } from "react";

/* ========== SuccessMessage (Popup) ========== */
interface SuccessMessageProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  isVisible,
  onClose,
  title = "Message Sent Successfully!",
  message = "Thank you for your inquiry. We'll get back to you soon.",
  autoClose = true,
  autoCloseDelay = 5000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);

      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300); // give time for fade-out animation
  };

  if (!isVisible && !isAnimating) return null;

  // colors (use CSS variable if present, otherwise fallbacks)
  const brown = "var(--color-brown70, #c2b4a3)";
  const brownDark = "var(--color-brown80, #927a60)"; // darker fallback
  const blackBg = "var(--color-black, #0f1720)";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Card */}
      <div
        className={`relative rounded-2xl p-8 max-w-md w-full shadow-2xl transition-all duration-300 transform ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{
          background: blackBg,
          border: `1px solid rgba(194,180,163,0.18)`, // subtle brown border (fallback)
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Close success message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* animated rings using brown with opacity */}
            <div
              style={{ borderColor: "rgba(194,180,163,0.22)" }}
              className="absolute inset-0 w-16 h-16 rounded-full animate-ping border-2"
            />
            <div
              style={{ borderColor: "rgba(194,180,163,0.14)", animationDelay: "0.5s" }}
              className="absolute inset-0 w-16 h-16 rounded-full animate-ping border-2"
            />

            {/* Main icon - brown gradient */}
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${brown} 0%, ${brownDark} 100%)`,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">{message}</p>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors"
              style={{
                background: `linear-gradient(90deg, ${brown} 0%, ${brownDark} 100%)`,
                color: "#0b0b0b",
              }}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Decorative */}
        <div style={{ background: "rgba(194,180,163,0.12)" }} className="absolute -top-2 -left-2 w-4 h-4 rounded-full" />
        <div style={{ background: "rgba(146,122,96,0.12)" }} className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full" />
      </div>
    </div>
  );
};

export default SuccessMessage;
