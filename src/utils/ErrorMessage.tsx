// src/components/SuccessMessage.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

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
  title = "Message",
  message = "",
  autoClose = true,
  autoCloseDelay = 3000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<number | null>(null);
  const dismissedRef = useRef(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  // create a container div for the portal (so we don't depend on a specific root)
  useEffect(() => {
    const el = document.createElement("div");
    // optional: give it an id/class if you want to style or debug
    el.className = "success-message-portal-root";
    document.body.appendChild(el);
    elRef.current = el;
    return () => {
      if (elRef.current) {
        document.body.removeChild(elRef.current);
        elRef.current = null;
      }
    };
  }, []);

  const handleDismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    setIsAnimating(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    window.setTimeout(() => {
      onClose();
      // reset for next time the component is opened
      dismissedRef.current = false;
    }, 220);
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      dismissedRef.current = false;

      if (autoClose) {
        timerRef.current = window.setTimeout(() => {
          handleDismiss();
        }, autoCloseDelay);
      }

      const onDocClick = () => {
        // close when click outside card OR anywhere on page (as you asked)
        handleDismiss();
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleDismiss();
      };

      window.addEventListener("click", onDocClick);
      window.addEventListener("keydown", onKey);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        window.removeEventListener("click", onDocClick);
        window.removeEventListener("keydown", onKey);
      };
    } else {
      setIsAnimating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, autoClose, autoCloseDelay, handleDismiss]);

  if ((!isVisible && !isAnimating) || !elRef.current) return null;

  const content = (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-[11000] flex items-center justify-center p-4 pointer-events-auto"
    >
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? "opacity-80 backdrop-blur-sm" : "opacity-0"}`}
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.55))" }}
      />

      {/* Centered Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-20 max-w-sm w-full rounded-2xl transition-transform duration-300 transform ${
          isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
        style={{
          background: "rgba(15,17,20,0.98)",
          border: "1px solid rgba(201,182,158,0.06)",
          boxShadow: "0 12px 40px rgba(2,6,23,0.7)",
          padding: 22,
        }}
        // stop propagation so clicks inside the card do not bubble to the document click listener
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) */}
        <button
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md text-gray-300 hover:text-white hover:bg-white/3 transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Icon + Content (centered) */}
        <div className="flex flex-col items-center text-center gap-4 py-6 px-2">
          <div
            style={{ width: 64, height: 64, background: "linear-gradient(135deg, #c9b69e 0%, #94785f 100%)" }}
            className="rounded-full flex items-center justify-center"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="pt-1 px-4">
            <h3 className="text-lg font-semibold" style={{ color: "white" }}>
              {title}
            </h3>
            {message && (
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.78)" }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, elRef.current);
};

export default SuccessMessage;
