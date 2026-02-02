import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchText: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ searchText, onSearch }: SearchBoxProps) {
  const handleGhange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      defaultValue={searchText}
      onChange={handleGhange}
    />
  );
}
