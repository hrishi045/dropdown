import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Fuse from "fuse.js";
import cx from "classnames";

export interface DropdownOption {
  id: string;
  text: string;
}

interface Props {
  options: DropdownOption[];
  onChange: (selected: DropdownOption[]) => void;
  max: number;
}

const Dropdown = (props: Props) => {
  const [selected, setSelected] = useState<DropdownOption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DropdownOption[]>([]);
  const [page, setPage] = useState(1);
  const [keyboardSelected, setKeyboardSelected] = useState(-1);
  const [collapsed, setCollapsed] = useState(true);
  const searchField = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const { onChange } = props;

  // Could also be modified to asynchronously fetch options
  const fuse = useMemo(
    () =>
      new Fuse(props.options, {
        keys: ["text"],
      }),
    [props.options]
  );

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  // Handle mouse option selections
  const onSelected = (event: MouseEvent<HTMLElement>) => {
    const opt = props.options.filter(
      (opt) => opt.id === (event.target as HTMLElement).id
    )[0];
    if (
      selected.filter((x) => x.id === opt.id).length === 0 &&
      selected.length < props.max
    )
      setSelected((cur) => [...cur, opt]);
  };

  // fuzzy search over the options
  useEffect(() => {
    setSearchResults(
      searchTerm.trim() === ""
        ? props.options
        : fuse.search(searchTerm).map((x) => x.item)
    );
  }, [searchTerm, props.options, fuse]);

  // Pagination helpers
  const goPrevPage = () => {
    setPage((page) => (page === 1 ? 1 : page - 1));
  };
  const goNextPage = () => {
    setPage((page) =>
      Math.ceil(searchResults.length / 10) > page ? page + 1 : page
    );
  };

  // Handle key events when focused
  const handleKeyEvent = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "ArrowUp") {
      if (keyboardSelected === (page - 1) * 10) goPrevPage();

      setKeyboardSelected((cur) => (cur <= 0 ? cur : cur - 1));
    }
    if (e.key === "ArrowDown") {
      if (keyboardSelected === page * 10 - 1) goNextPage();

      setKeyboardSelected((cur) =>
        cur < searchResults.length - 1 ? cur + (1 % 10) : cur
      );
    }
    if (e.key === "ArrowLeft") goPrevPage();
    if (e.key === "ArrowRight") goNextPage();
    if (e.key === "Enter") {
      const opt = searchResults.slice(10 * (page - 1), 10 * page)[
        keyboardSelected
      ];
      if (
        selected.filter((x) => x.id === opt.id).length === 0 &&
        selected.length < props.max
      ) {
        setSelected((cur) => [...cur, opt]);
        setSearchTerm("");
      }
    }
    if (e.key === "Backspace") {
      if (searchTerm === "" && selected.length > 0) {
        setSelected((cur) => cur.slice(0, cur.length - 1));
      }
    }
  };

  console.log(focused);
  console.log("keyboardFocused", keyboardSelected);

  return (
    <div
      className="text-sm font-medium"
      tabIndex={-1}
      onBlur={(e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget?.contains(e.relatedTarget as Node)) {
          setCollapsed(true);
        }
      }}
    >
      <div
        className={cx(
          "rounded border-2 border-gray-400 p-4 flex gap-2 flex-wrap font-semibold cursor-text",
          {
            "bg-gray-50 border-blue-500": focused,
          }
        )}
        onClick={() => searchField.current?.focus()}
      >
        {selected.map((selection, i) => (
          <div className="bg-gray-300 rounded-sm px-2 py-1" key={selection.id}>
            {selection.text}
          </div>
        ))}
        <input
          className="bg-transparent focus:outline-none"
          ref={searchField}
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyEvent}
          onFocus={() => {
            if (collapsed) setCollapsed(false);
            setFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              if (searchField.current !== document.activeElement)
                setFocused(false);
            }, 100);
          }}
          role="searchbox"
          type="text"
          name="searchterm"
          id="searchterm"
        />
      </div>
      {!collapsed && (
        <div
          className="rounded mt-1 border-2 border-gray-300 shadow"
          onClick={() => searchField.current?.focus()}
        >
          <div>
            {searchResults
              .slice(10 * (page - 1), 10 * page)
              .map((option, i) => (
                <div
                  className={cx("px-4 py-2 hover:bg-gray-300 cursor-pointer", {
                    "bg-gray-400 hover:text-gray-800":
                      keyboardSelected % 10 === i,
                  })}
                  key={i}
                  onClick={onSelected}
                  id={option.id}
                >
                  {option.text}
                </div>
              ))}
          </div>
          <div className="flex gap-2 mx-4 my-2 text-xs font-bold text-gray-600">
            <button
              className="px-2 py-1 hover:bg-gray-300 rounded-sm"
              onClick={goPrevPage}
            >
              &lt;
            </button>
            <div className="py-1">
              {page} of {Math.ceil(searchResults.length / 10)}
            </div>
            <button
              className="px-2 py-1 hover:bg-gray-300 rounded-sm"
              onClick={goNextPage}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
