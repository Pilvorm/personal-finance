
export default function PotCardSkeleton() {
  return (
    <div className="card flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 bg-grey-100 rounded-full`}></div>
        {/* Card Name */}
        <div className="w-34 h-7 bg-grey-100 rounded-sm" />
      </div>

      <div className="">
        <div className="flex items-center justify-between">
            {/* Total Saved */}
          <div className="w-18 h-5 bg-grey-100 rounded-sm" />
          <div className="w-30 h-12 bg-grey-100 rounded-sm" />
        </div>

        <div className="mt-4">
          {/* Bar */}
          <div className="w-full h-2 bg-beige-100 rounded-sm">
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-grey-500">
            <div className="w-10 h-4 bg-grey-100 rounded-sm" />
            <div className="w-24 h-5 bg-grey-100 rounded-sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className="h-13 bg-beige-100 rounded-lg"
        >
          
        </div>
        <div
          className="h-13 bg-beige-100 rounded-lg"
        >
        </div>
      </div>
    </div>
  );
}
