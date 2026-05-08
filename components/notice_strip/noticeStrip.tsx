export default function NoticeStrip() {
  return (
    <div className="flex w-full overflow-hidden bg-primary py-2.5 text-sm font-medium text-primary-foreground sm:text-base">
      <div className="flex w-max min-w-full shrink-0 animate-scroll items-center whitespace-nowrap">
        
        {/* --- FIRST SET --- */}
        <span className="mx-8 md:mx-16">
          Affiliated by AKTU, Lucknow Approval: AICTE, New Delhi.
        </span>
        <span className="mx-8 md:mx-16">
          Enroll Now in MBA MCA BBA BCA | 100% Placement Guaranteed and 100% Finance/Loan Assistance.
        </span>

        {/* --- SECOND SET (Exact Duplicate for Seamless Looping) --- */}
        <span className="mx-8 md:mx-16">
          Affiliated by AKTU, Lucknow Approval: AICTE, New Delhi.
        </span>
        <span className="mx-8 md:mx-16">
          Enroll Now in MBA MCA BBA BCA | 100% Placement Guaranteed and 100% Finance/Loan Assistance.
        </span>
        
      </div>
    </div>
  );
}