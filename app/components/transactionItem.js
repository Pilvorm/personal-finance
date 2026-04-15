import Image from "next/image";
import { formatUSD } from "../lib/helper";

export default function TransactionItem({
  avatar,
  name,
  amount,
  date,
  className,
}) {

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <Image
          src={`/assets/images/avatars/${avatar}`}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm font-bold">{name}</span>
      </div>
      <div className="flex flex-col items-end">
        <div className={`text-sm font-bold`}>
          {formatUSD(amount)}
        </div>
        <span className="mt-1 text-xs text-grey-500">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
