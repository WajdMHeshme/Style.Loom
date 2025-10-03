import { useEffect, useState } from "react";

interface LogoutPopupProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

const LogoutPopup: React.FC<LogoutPopupProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  title = "Logout",
  message = "Are you sure you want to log out?",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setTimeout(() => setIsAnimating(true), 10); // صغير لتفعيل animation
    } else {
      setIsAnimating(false);
      setTimeout(() => setShow(false), 300); // مدة الانيميشن
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onCancel}
      />

      {/* Card */}
      <div
        className={`relative rounded-2xl p-6 max-w-sm w-full shadow-2xl transition-all duration-300 transform ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{ background: "var(--color-black, #0f1720)", border: "1px solid rgba(194,180,163,0.18)" }}
      >
        {/* Icon - Logout */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-6">{message}</p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:brightness-90 transition"
            >
              Confirm Logout
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg font-medium bg-gray-700 text-white hover:brightness-90 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
