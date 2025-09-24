// PoliciesData.tsx
export const policiesData = [
  {
    title: "RETURN POLICY",
    btn: "Read Return Policy",
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-2 border-dashed border-black15 rounded-b-2xl overflow-hidden">
        {/* Card 1 */}
        <div className="
          flex items-center gap-4 py-[40px] px-[20px] lg:py-[50px] lg:px-[30px] xl:py-[60px] xl:px-[40px] rounded-lg
          border-b border-dashed border-black15 last:border-b-0
          sm:border-x-2 sm:border-dashed sm:border-black15 lg:border-x-0 lg:border-b-0 lg:border-r-2 lg:border-dashed lg:border-black15
        ">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-black15 bg-black12">
              <img src="/assets/imgs/Contact/Eligibility.png" alt="icon" />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white text-lg">Eligibility</h4>
            <p className="text-sm text-gray40 mt-2">
              Items must be unused, with tags attached, and returned within 30 days of delivery.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="
          flex items-center gap-4 py-[40px] px-[20px] lg:py-[50px] lg:px-[30px] xl:py-[60px] xl:px-[40px] rounded-lg
          border-b border-dashed border-black15 last:border-b-0
          sm:border-x-2 sm:border-dashed sm:border-black15 lg:border-x-0 lg:border-b-0 lg:border-r-2 lg:border-dashed lg:border-black15
        ">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-black15 bg-black12">
              <img src="/assets/imgs/Contact/Process.png" alt="icon" />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white text-lg">Process</h4>
            <p className="text-sm text-gray40 mt-2">
              Initiate returns through our Return Center for a smooth and efficient process.
            </p>
          </div>
        </div>

        {/* Card 3 (يأخذ عرض العمودين في sm) */}
        <div className="
          flex items-center gap-4 py-[40px] px-[20px] lg:py-[50px] lg:px-[30px] xl:py-[60px] xl:px-[40px] rounded-lg
          border-b border-dashed border-black15 last:border-b-0
          lg:border-b-0
          sm:col-span-2 lg:col-span-1
          sm:border-t-2 sm:border-dashed sm:border-black15 lg:border-t-0
        ">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-black15 bg-black12">
              <img src="/assets/imgs/Contact/Refund.png" alt="icon" />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white text-lg">Refund</h4>
            <p className="text-sm text-gray40 mt-2">
              Expect a refund to your original payment method within 7-10 business days.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    title: "CANCELLATION POLICY",
    btn: "Read Cancellation Policy",
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-2 border-dashed border-black15 rounded-b-2xl overflow-hidden">
        {/* Card 1 */}
        <div className="
          flex items-center gap-4 py-[40px] px-[20px] lg:py-[50px] lg:px-[30px] xl:py-[60px] xl:px-[40px] rounded-lg
          border-b border-dashed border-black15 last:border-b-0
          sm:border-x-2 sm:border-dashed sm:border-black15 lg:border-x-0 lg:border-b-0 lg:border-r-2 lg:border-dashed lg:border-black15
        ">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-black15 bg-black12">
              <img src="/assets/imgs/Contact/CancellationWindow.png" alt="icon" />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white text-lg">Cancellation Window</h4>
            <p className="text-sm text-gray40 mt-2">
              Orders can be canceled within 24 hours of placement for a full refund.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="
          flex items-center gap-4 py-[40px] px-[20px] lg:py-[50px] lg:px-[30px] xl:py-[60px] xl:px-[40px] rounded-lg
          border-b border-dashed border-black15 last:border-b-0
          sm:border-x-2 sm:border-dashed sm:border-black15 lg:border-x-0 lg:border-b-0 lg:border-r-2 lg:border-dashed lg:border-black15
        ">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-black15 bg-black12">
              <img src="/assets/imgs/Contact/CancellationProcess.png" alt="icon" />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white text-lg">Cancellation Process</h4>
            <p className="text-sm text-gray40 mt-2">
              Visit our Order Management section to cancel your order effortlessly.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="
          flex items-center gap-4 py-[40px] px-[20px] lg:py-[50px] lg:px-[30px] xl:py-[60px] xl:px-[40px] rounded-lg
          border-b border-dashed border-black15 last:border-b-0
          lg:border-b-0
          sm:col-span-2 lg:col-span-1
          sm:border-t-2 sm:border-dashed sm:border-black15 lg:border-t-0
        ">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-black15 bg-black12">
              <img src="/assets/imgs/Contact/RefundTimeline.png" alt="icon" />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white text-lg">Refund Timeline</h4>
            <p className="text-sm text-gray40 mt-2">
              Refunds for canceled orders are processed within 5-7 business days.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];
