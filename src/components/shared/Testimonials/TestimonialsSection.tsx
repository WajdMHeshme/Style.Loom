import { useEffect, useState, type JSX } from "react";
import TestimonialCard from "../../shared/Testimonials/TestimonalCard";
import TitleComponent from "../TitleComponent/TitleComponent";
import LoadingWave from "../../../utils/Loader";
import { fetchReviews } from "../../../redux/slices/reviewsSlice";
import type { MappedReview } from "../../../redux/slices/reviewsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import AddReviewModal from "./AddReviewModal";

export default function TestimonialSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const { items: reviews, loading } = useAppSelector((s) => s.reviews);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const approved = reviews.filter((r) => r.isApproved);
  const alwaysVisible = approved.slice(0, 3);
  const expandable = approved.slice(3);

  const borderVariants = [
    "border1",
    "border2",
    "border3",
    "border4",
    "border5",
    "border6",
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitted = (created: MappedReview | null) => {
    if (created) setNotice("Thanks! Your review was posted.");
    else setNotice("Thanks! Your review is submitted and pending approval.");
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
          <TitleComponent
            desc={"At StyleLoom, our customers are the heartbeat of our brand."}
            title={"The StyleLoom Testimonial Collection."}
          />
        </div>
      </div>

      <div className="flex flex-wrap border-t-0 rounded-b-[20px] overflow-hidden border-2 border-dashed border-black15">
        {loading ? (
          <div className="w-full flex justify-center items-center p-12">
            <LoadingWave />
          </div>
        ) : approved.length === 0 ? (
          <div className="w-full p-12 text-center text-gray50">
            No testimonials yet.
          </div>
        ) : (
          <>
            {alwaysVisible.map((rev, idx) => (
              <div key={rev.id} className="w-full md:w-1/2 xl:w-1/3">
                <TestimonialCard
                  description={rev.comment}
                  personName={`${rev.user?.first_name ?? ""} ${
                    rev.user?.last_name ?? ""
                  }`.trim()}
                  personCity={rev.user?.email ?? ""}
                  rating={rev.rating}
                  border={borderVariants[idx % borderVariants.length]}
                />
              </div>
            ))}

            {expandable.map((rev, idx) => (
              <div
                key={rev.id}
                className={`${
                  isExpanded ? "block" : "hidden"
                } md:block w-full md:w-1/2 xl:w-1/3`}
              >
                <TestimonialCard
                  description={rev.comment}
                  personName={`${rev.user?.first_name ?? ""} ${
                    rev.user?.last_name ?? ""
                  }`.trim()}
                  personCity={rev.user?.email ?? ""}
                  rating={rev.rating}
                  border={
                    borderVariants[
                      (idx + alwaysVisible.length) % borderVariants.length
                    ]
                  }
                />
              </div>
            ))}

            <div className="w-full px-4">
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="flex-1">
                  {expandable.length > 0 && (
                    <>
                      {!isExpanded ? (
                        <button
                          onClick={() => setIsExpanded(true)}
                          className="block md:hidden w-full py-6 text-base bg-transparent"
                        >
                          <div className="flex items-center justify-center gap-3 text-gray50">
                            <span>View All</span>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsExpanded(false)}
                          className="block md:hidden w-full py-6 text-base bg-transparent border-t border-dashed border-black15"
                        >
                          <div className="flex items-center justify-center text-gray50">
                            View Less
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex justify-center py-8">
        <button
          onClick={handleOpenModal}
          className="px-6 py-3 rounded-full shadow-sm"
          style={{ background: "var(--color-brown60)", color: "white" }}
        >
          Add Review
        </button>
      </div>

      {notice && (
        <div
          className="fixed right-6 bottom-6 z-50 rounded-md shadow-lg p-4"
          style={{ background: "var(--color-black12)", color: "white" }}
        >
          <p className="text-sm">{notice}</p>
        </div>
      )}

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmitted={handleSubmitted}
      />
    </section>
  );
}
