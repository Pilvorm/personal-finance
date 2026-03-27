import Image from "next/image";

export default function TransactionItem({ image, name, amount, date, className }) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <Image
          src="/assets/images/avatars/emma-richardson.jpg"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm font-bold">Emma Richardson</span>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm text-green font-bold">+$75.50</div>
        <span className="mt-1 text-xs text-grey-500">19 Aug 2024</span>
      </div>
    </div>
  );
}
