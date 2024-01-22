import { useEffect, useRef, useState } from "react";

export default function Home({ options = ["Oranges", "apple", "peaples"] }) {
  const [value, setValue] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const autoCompleteRef = useRef();
  const handler = (event) => {
    setValue(event.target.value);
  };
  const suggestions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );
  const handleSuggestion = (suggestion) => {
    setValue(suggestion);
    setShowSuggestion(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        autoCompleteRef.current &&
        !autoCompleteRef.current.contains(event.target)
      ) {
        setShowSuggestion(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="w-[200px] m-auto ">
      <input
        type="text"
        placeholder="Search"
        className="p-2 bg-black"
        value={value}
        onChange={handler}
        onFocus={() => setShowSuggestion(true)}
      />
      {showSuggestion && (
        <ul>
          {suggestions.map((suggestion) => {
            return (
              <li
                onClick={() => handleSuggestion(suggestion)}
                className="p-2 hover:bg-slate-300 border"
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
