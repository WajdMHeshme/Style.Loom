import React, { useEffect, useState, useId, useRef } from "react";
import { useAppDispatch } from "../../../redux/store/hooks";
import { addReview } from "../../../redux/slices/reviewsSlice";
import type { MappedReview } from "../../../redux/slices/reviewsSlice";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (created: MappedReview | null) => void;
}

export default function AddReviewModal({
  isOpen,
  onClose,
  onSubmitted,
}: AddReviewModalProps) {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const starGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRating(5);
      setHoverRating(null);
      setComment("");
      setError(null);
      setSubmitting(false);
    } else {
      // focus textarea after opening
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 120);
    }
  }, [isOpen]);

  const startClose = () => {
    if (submitting) return;
    onClose();
  };

  const getUserIdCandidate = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const parts = token.split(".");
        if (parts.length >= 2) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          return (
            Number(payload?.id ?? payload?.userId ?? payload?.sub) || undefined
          );
        }
      }
      const keys = ["user", "currentUser", "profile"];
      for (const k of keys) {
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed?.id) return Number(parsed.id);
        if (parsed?.userId) return Number(parsed.userId);
      }
      const idDirect = localStorage.getItem("userId");
      if (idDirect) return Number(idDirect);
    } catch {}
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = comment.trim();
    if (!trimmed || trimmed.length < 3) {
      setError("Please write a short comment (min 3 characters).");
      return;
    }

    const numericRating = Math.max(1, Math.min(5, Math.round(rating || 0)));
    const payload: Partial<{
      comment: string;
      rating: number;
      userId?: number;
    }> = {
      comment: trimmed,
      rating: numericRating,
    };
    const userId = getUserIdCandidate();
    if (userId) payload.userId = userId;

    setSubmitting(true);
    try {
      const resultAction = await dispatch(addReview(payload) as any);
      if (addReview.fulfilled.match(resultAction)) {
        const created = resultAction.payload as any;
        const mapped: MappedReview = {
          id: created.id,
          rating: created.rating ?? 5,
          comment: created.comment ?? "",
          createdAt: created.createdAt ?? new Date().toISOString(),
          isApproved: !!created.isApproved,
          user: created.user,
        };
        onSubmitted(mapped.isApproved ? mapped : null);
        startClose();
      } else {
        const errMsg =
          resultAction.payload ||
          resultAction.error?.message ||
          "Failed to submit review";
        setError(errMsg);
      }
    } catch (err: any) {
      setError(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // keyboard navigation for stars
  const handleStarsKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowLeft", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      setRating((r) => Math.max(1, r - 1));
    } else if (["ArrowRight", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      setRating((r) => Math.min(5, r + 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setRating(1);
    } else if (e.key === "End") {
      e.preventDefault();
      setRating(5);
    } else if (e.key === "Enter" || e.key === " ") {
      // space/enter handled by button itself
    }
  };

  if (!isOpen) return null;

  const gradId = `starGrad-${id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-hidden={!isOpen}
    >
      {/* backdrop */}
      <div
        onClick={() => !submitting && startClose()}
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,8,0.6) 0%, rgba(7,7,8,0.5) 100%)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-200 ease-out scale-100"
        style={{ background: "var(--color-black12)" }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1 text-white">
                Add Your Review
              </h2>
              <p className="text-sm text-neutral-400">
                Share your experience — it helps others decide.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-neutral-400 mr-2">
                <span className="font-semibold text-white">{rating}</span>/5
              </div>
              <button
                onClick={() => !submitting && startClose()}
                aria-label="Close review modal"
                className="p-2 rounded-lg hover:bg-black/20 transition"
                title="Close"
                disabled={submitting}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-5">
            {/* Rating Stars */}
            <div>
              <label
                className="block text-sm font-medium mb-3 text-white"
                id="rating-label"
              >
                Rating
              </label>

              <div
                ref={starGroupRef}
                role="radiogroup"
                aria-labelledby="rating-label"
                tabIndex={0}
                onKeyDown={handleStarsKeyDown}
                className="flex items-center gap-4"
              >
                <svg style={{ height: 0, width: 0 }} aria-hidden>
                  <defs>
                    <linearGradient id={gradId} x1="0%" x2="100%">
                      <stop offset="0%" stopColor="var(--color-brown60)" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ffd27f" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((i) => {
                    const filled = (hoverRating ?? rating) >= i;
                    return (
                      <button
                        key={i}
                        type="button"
                        role="radio"
                        aria-checked={rating === i}
                        aria-label={`${i} star${i > 1 ? "s" : ""}`}
                        title={`${i} star${i > 1 ? "s" : ""}`}
                        onClick={() => setRating(i)}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(null)}
                        onFocus={() => setHoverRating(i)}
                        onBlur={() => setHoverRating(null)}
                        className={`p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown60 transition-transform transform ${
                          filled ? "scale-105" : "hover:scale-110"
                        }`}
                        style={{
                          // make button size stable
                          width: 44,
                          height: 44,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        disabled={submitting}
                      >
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 24 24"
                          fill={filled ? `url(#${gradId})` : "none"}
                          stroke={filled ? `url(#${gradId})` : "currentColor"}
                          strokeWidth="1.4"
                          className={`drop-shadow-md ${
                            filled ? "" : "text-neutral-300"
                          }`}
                        >
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.174L12 18.896l-7.336 3.876 1.402-8.174L.132 9.21l8.2-1.192L12 .587z" />
                        </svg>
                      </button>
                    );
                  })}
                </div>

                {/* numeric label */}
                <div className="ml-2 text-sm text-neutral-300">
                  <span className="text-white font-semibold">{rating}</span> out of 5
                </div>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Comment
              </label>
              <textarea
                aria-label="Review comment"
                rows={4}
                ref={textareaRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-2xl border border-black15 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-brown60 bg-black text-white placeholder:text-neutral-500 shadow-sm"
                disabled={submitting}
                placeholder="Write your review..."
                required
              />
              <div className="mt-2 flex justify-between items-center text-xs text-neutral-400">
                <div>{comment.length} characters</div>
                <div>Be kind and specific ✨</div>
              </div>
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => !submitting && startClose()}
                className="px-4 py-2 rounded-lg border border-black15 text-white hover:text-brown60 transition-all duration-200 ease-in-out"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[var(--color-brown60)] to-[#ffd27f] text-black font-semibold hover:opacity-95 transition transform active:scale-98"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
