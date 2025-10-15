import React, { useEffect, useRef, useState, type JSX } from "react";
import axios from "axios";
import TestimonialCard from "../Testimonials/TestimonalCard";
import TitleComponent from "../TitleComponent/TitleComponent";
import LoadingWave from "../../utils/Loader";

// ---- Types ----
type ApiUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type ApiReview = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
  userId: number;
  user?: ApiUser;
};

// ---- Helper: decode JWT payload (browser) ----
const decodeTokenPayload = (rawToken?: string | null) => {
  if (!rawToken) return null;
  try {
    const parts = rawToken.split(".");
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return payload as any;
  } catch {
    return null;
  }
};

/* ---------------------------
   AddReviewModal (no libs)
   Colors: uses --color-black12 and --color-brown60 (with fallbacks)
   --------------------------- */
const AddReviewModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (review: ApiReview | null) => void;
}> = ({ isOpen, onClose, onSubmitted }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const token = localStorage.getItem("token");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRating(5);
      setHoverRating(null);
      setComment("");
      setError(null);
      setSubmitting(false);
      setClosing(false);
    } else {
      setTimeout(() => textareaRef.current?.focus(), 120);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape" && !submitting) startClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, submitting]);

  const startClose = () => {
    if (submitting) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  const getUserIdCandidate = () => {
    try {
      const payload = decodeTokenPayload(token);
      const idFromToken = payload?.id ?? payload?.userId ?? payload?.sub ?? null;
      if (idFromToken) return Number(idFromToken);

      const possibleKeys = ["user", "currentUser", "profile"];
      for (const k of possibleKeys) {
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          if (parsed?.id) return Number(parsed.id);
          if (parsed?.userId) return Number(parsed.userId);
        } catch {
          // ignore
        }
      }
      const idDirect = localStorage.getItem("userId");
      if (idDirect) return Number(idDirect);
    } catch (e) {
      console.warn("getUserIdCandidate error", e);
    }
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = comment.trim();
    if (!trimmed || trimmed.length < 3) {
      setError("Please write a short comment (min 3 characters).");
      textareaRef.current?.focus();
      return;
    }

    const numericRating = Math.max(1, Math.min(5, Math.round(Number(rating) || 0)));
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      setError("Rating must be an integer between 1 and 5.");
      return;
    }

    const payload: Record<string, any> = {
      comment: trimmed,
      rating: numericRating,
    };

    const candidateUserId = getUserIdCandidate();
    if (candidateUserId) payload.userId = candidateUserId;

    setSubmitting(true);

    try {
      const res = await axios.post<ApiReview>("http://localhost:3000/api/webSit", payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const created = res.data;
      if (created.isApproved) onSubmitted(created);
      else onSubmitted(null);
      startClose();
    } catch (err: any) {
      console.error("Failed to submit review", err);
      let serverMessage = "Failed to submit. Try again later.";
      if (err?.response) {
        const resp = err.response;
        if (resp.data?.message) serverMessage = resp.data.message;
        else if (resp.data?.errors) {
          try {
            serverMessage = typeof resp.data.errors === "string" ? resp.data.errors : JSON.stringify(resp.data.errors);
          } catch {
            serverMessage = `Validation error: ${resp.status}`;
          }
        } else if (typeof resp.data === "string") serverMessage = resp.data;
        else serverMessage = `Server returned ${resp.status} ${resp.statusText}`;
      } else if (err?.message) {
        serverMessage = err.message;
      }
      setError(serverMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const Star: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden style={{ verticalAlign: "middle" }}>
      <path
        d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.174L12 18.896l-7.336 3.876 1.402-8.174L.132 9.21l8.2-1.192L12 .587z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        :root {
          /* fallbacks in case project doesn't define them */
          --color-brown60: var(--color-brown60, #AE9B84);
          --color-black12: var(--color-black12, rgba(18,18,18,0.9));
          --color-gray50: var(--color-gray50, #9CA3AF);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.995); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modalFadeOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.995); }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes backdropOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .modal-backdrop {
          animation: backdropIn 180ms ease forwards;
          background-color: rgba(7,7,8,0.55);
          backdrop-filter: blur(3px);
        }
        .modal-backdrop.closing {
          animation: backdropOut 160ms ease forwards;
        }
        .modal-card {
          animation: modalFadeIn 220ms cubic-bezier(.2,.9,.3,1) forwards;
        }
        .modal-card.closing {
          animation: modalFadeOut 160ms ease forwards;
        }

        /* small focus style for keyboard users */
        .focus-ring:focus {
          outline: 2px solid rgba(174,155,132,0.18);
          outline-offset: 2px;
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation" aria-live="polite">
        {/* backdrop */}
        <div
          onClick={() => !submitting && startClose()}
          className={`absolute inset-0 modal-backdrop ${closing ? "closing" : ""}`}
          aria-hidden
        />

        {/* modal */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add Review"
          className={`relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl modal-card ${closing ? "closing" : ""}`}
        >
          <div style={{ background: "var(--color-brown60)" }}>
            {/* header */}
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.6 5.2L20 9l-4 3.6L17.2 20 12 16.9 6.8 20 8 12.6 4 9l5.4-1.8L12 2z" fill="#fff" opacity="0.9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-semibold" style={{ color: "white" }}>Share your experience</h3>
                  <p className="text-xs md:text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>Your feedback helps us improve — reviews are moderated before appearing.</p>
                </div>
              </div>

              <button
                onClick={() => !submitting && startClose()}
                aria-label="Close review modal"
                className="rounded-md p-2 hover:bg-white/10 transition focus-ring"
                style={{ color: "white", background: "transparent", border: "none" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* body */}
            <div className="p-6 md:p-8" style={{ background: "var(--color-black12)" }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "white" }}>Rating</label>
                  <div className="flex items-center gap-3" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((i) => {
                      const isFilled = (hoverRating ?? rating) >= i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i)}
                          onMouseEnter={() => setHoverRating(i)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="flex items-center gap-2 px-3 py-1 rounded-md transition focus-ring"
                          aria-checked={rating === i}
                          role="radio"
                          aria-label={`${i} star`}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowLeft" || e.key === "ArrowDown") setRating((r) => Math.max(1, r - 1));
                            if (e.key === "ArrowRight" || e.key === "ArrowUp") setRating((r) => Math.min(5, r + 1));
                          }}
                          style={{
                            color: isFilled ? "var(--color-brown60)" : "var(--color-gray50)",
                            background: isFilled ? "rgba(174,155,132,0.06)" : "transparent",
                            border: "1px solid rgba(255,255,255,0.03)",
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden style={{ verticalAlign: "middle", color: isFilled ? "var(--color-brown60)" : "var(--color-gray50)" }}>
                            <path
                              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.174L12 18.896l-7.336 3.876 1.402-8.174L.132 9.21l8.2-1.192L12 .587z"
                              fill={isFilled ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="0.9"
                            />
                          </svg>
                          <span className="text-sm" style={{ color: isFilled ? "white" : "var(--color-gray50)" }}>{i}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "white" }}>Comment</label>
                  <textarea
                    ref={textareaRef}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    className="w-full rounded-xl border p-3 resize-none focus:ring-2 focus:ring-opacity-40 focus:ring-white/30"
                    placeholder="Write what you liked (or didn't) about our product/service..."
                    required
                    aria-label="Review comment"
                    disabled={submitting}
                    style={{
                      borderColor: "rgba(255,255,255,0.04)",
                      background: "rgba(255,255,255,0.03)", /* slightly lighter than black12 */
                      color: "white",
                    }}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="text-sm" style={{ color: "#FFB4B4", background: "rgba(255,20,20,0.04)", padding: "8px", borderRadius: 8 }}>
                    {error}
                  </div>
                )}

                {/* actions */}
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Reviews are moderated by our team before appearing publicly.</div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => !submitting && startClose()}
                      className="px-4 py-2 rounded-md border text-white bg-transparent"
                      disabled={submitting}
                      style={{
                        borderColor: "rgba(255,255,255,0.06)",
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-md text-white bg-brown60"
                      disabled={submitting}
                      style={{
                        boxShadow: "0 6px 18px rgba(174,155,132,0.12)",
                        opacity: submitting ? 0.85 : 1,
                      }}
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ---------------------------
   Main TestimonialSection
   --------------------------- */
export default function TestimonialSection(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ApiReview[]>("http://localhost:3000/api/dashboard/webReview", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const approved = (res.data || [])
          .filter((r) => r.isApproved)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setReviews(approved);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [token]);

  const alwaysVisible = reviews.slice(0, 3);
  const expandable = reviews.slice(3);
  const borderVariants = ["border1", "border2", "border3", "border4", "border5", "border6"];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitted = (review: ApiReview | null) => {
    if (review) {
      setReviews((prev) => [review, ...prev]);
      setNotice("Thanks! Your review was posted.");
    } else {
      setNotice("Thanks! Your review is submitted and pending approval.");
    }
    setTimeout(() => setNotice(null), 6000);
  };

  return (
    <section className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      <div className="rounded-t-[20px] overflow-hidden border-2 border-dashed border-black15 relative">
        <img
          src={"/assets/imgs/Testimonials/Abstract Design.png"}
          alt=""
          aria-hidden
          className="hidden md:block pointer-events-none absolute top-0 right-0 translate-x-[10%] -translate-y-[5%] max-w-[18rem] md:max-w-[22rem]"
        />
        <div className="p-6">
          <TitleComponent desc={"At StyleLoom, our customers are the heartbeat of our brand."} title={"The StyleLoom Testimonial Collection."} />
        </div>
      </div>

      <div className="flex flex-wrap border-t-0 rounded-b-[20px] overflow-hidden border-2 border-dashed border-black15">
        {loading ? (
          <div className="w-full flex justify-center items-center p-12">
            <LoadingWave />
          </div>
        ) : reviews.length === 0 ? (
          <div className="w-full p-12 text-center text-gray50">No testimonials yet.</div>
        ) : (
          <>
            {alwaysVisible.map((rev, idx) => (
              <div key={rev.id} className="w-full md:w-1/2 xl:w-1/3">
                <TestimonialCard
                  description={rev.comment}
                  personName={`${rev.user?.first_name ?? ""} ${rev.user?.last_name ?? ""}`.trim()}
                  personCity={rev.user?.email ?? ""}
                  rating={rev.rating}
                  border={borderVariants[idx % borderVariants.length]}
                />
              </div>
            ))}

            {expandable.map((rev, idx) => (
              <div key={rev.id} className={`${isExpanded ? "block" : "hidden"} md:block w-full md:w-1/2 xl:w-1/3`}>
                <TestimonialCard
                  description={rev.comment}
                  personName={`${rev.user?.first_name ?? ""} ${rev.user?.last_name ?? ""}`.trim()}
                  personCity={rev.user?.email ?? ""}
                  rating={rev.rating}
                  border={borderVariants[(idx + alwaysVisible.length) % borderVariants.length]}
                />
              </div>
            ))}

            <div className="w-full px-4">
              <div className="flex items-center justify-between gap-3 py-4">
                <div className="flex-1">
                  {expandable.length > 0 && (
                    <>
                      {!isExpanded ? (
                        <button onClick={() => setIsExpanded(true)} className="block md:hidden w-full py-6 text-base bg-transparent border-t border-dashed" style={{ borderColor: "var(--color-gray90)" }}>
                          <div className="flex items-center justify-center gap-3 text-gray50">
                            <span>View All</span>
                            <img src={"/assets/imgs/Icons/arrow.png"} alt="arrow" className="w-5 h-5 ml-3" />
                          </div>
                        </button>
                      ) : (
                        <button onClick={() => setIsExpanded(false)} className="block md:hidden w-full py-6 text-base bg-transparent border-t border-dashed" style={{ borderColor: "var(--color-gray90)" }}>
                          <div className="flex items-center justify-center">View Less</div>
                        </button>
                      )}
                    </>
                  )}
                </div>
                <div className="md:hidden w-36" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex justify-center py-8">
        <button onClick={handleOpenModal} className="px-6 py-3 rounded-full shadow-sm" style={{ background: "var(--color-brown60)", color: "white" }}>
          Add Review
        </button>
      </div>

      {notice && (
        <div className="fixed right-6 bottom-6 z-50 rounded-md shadow-lg p-4" style={{ background: "var(--color-black12)", color: "white" }}>
          <p className="text-sm">{notice}</p>
        </div>
      )}

      <AddReviewModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmitted={handleSubmitted} />
    </section>
  );
}
