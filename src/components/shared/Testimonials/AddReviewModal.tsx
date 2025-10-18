import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!isOpen) {
      setRating(5);
      setHoverRating(null);
      setComment("");
      setError(null);
      setSubmitting(false);
    } else {
      setTimeout(() => {
        const el = document.querySelector<HTMLTextAreaElement>(
          "textarea[aria-label='Review comment']"
        );
        el?.focus();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => !submitting && startClose()}
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(7,7,8,0.55)",
          backdropFilter: "blur(3px)",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "var(--color-black12)" }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Add Your Review
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Rating
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((i) => {
                  const filled = (hoverRating ?? rating) >= i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      onMouseEnter={() => setHoverRating(i)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="transition-transform transform hover:scale-125 hover:-translate-y-1"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill={filled ? "var(--color-brown60)" : "none"}
                        stroke={filled ? "var(--color-brown60)" : "currentColor"}
                        strokeWidth="1.5"
                        className="drop-shadow-md"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.174L12 18.896l-7.336 3.876 1.402-8.174L.132 9.21l8.2-1.192L12 .587z" />
                      </svg>
                    </button>
                  );
                })}
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-xl border border-black15 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brown60 bg-black text-white"
                disabled={submitting}
                placeholder="Write your review..."
                required
              />
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
                className="px-6 py-2 rounded-lg bg-brown60 text-white font-semibold hover:bg-opacity-90 transition"
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
