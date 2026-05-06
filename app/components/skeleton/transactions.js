export default function TransactionsSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 8 }).map((_, i) => {
        return (
          <tr
            key={i}
            className={`block md:table-row ${i !== 7 && "border-b border-grey-100"} animate-pulse`}
          >
            <td className="flex items-center justify-between md:table-cell">
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-10 h-10 bg-grey-100 rounded-full" />

                <div>
                  {/* Name */}
                  <div className="w-32 h-5 bg-grey-100 rounded-sm"></div>

                  {/* Category - Mobile */}
                  <div className="mt-1 md:hidden w-16 h-5 bg-grey-100 rounded-sm"></div>
                </div>
              </div>

              <div className="flex flex-col items-end md:hidden">
                {/* Amount - Mobile */}
                <div className="w-16 h-5 bg-grey-100 rounded-sm"></div>

                {/* Date - Mobile */}
                <span className="mt-1 w-30 h-5 bg-grey-100 rounded-sm"></span>
              </div>
            </td>

            {/* Category - Desktop */}
            <td className="hidden md:table-cell">
              <div className="w-30 h-5 bg-grey-100 rounded-sm"></div>
            </td>

            {/* Date - Desktop*/}
            <td className="hidden md:table-cell ">
              <div className="w-30 h-5 bg-grey-100 rounded-sm"></div>
            </td>

            {/* Amount - Desktop */}
            <td className={`hidden md:table-cell`}>
              <div className="ml-auto w-16 h-5 bg-grey-100 rounded-sm"></div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
