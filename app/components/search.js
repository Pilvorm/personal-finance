import { SearchIcon } from "./icons";

export default function Search({ placeholder, searchTerm, setSearchTerm }) {
  return (
    <div className="btn-basic w-fit md:w-[320px] px-5 py-3 flex items-center justify-between">
      <input
        type="text"
        placeholder={placeholder}
        className="w-fit focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon />
    </div>
  );
}
