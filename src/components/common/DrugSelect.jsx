"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api-interceptor";

const DrugSelect = ({
  value,
  onChange,
  placeholder = "Search and select...",
  className,
  error,
  name,
  id,
  minSearchLength = 3,
  debounceMs = 300,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  const debouncedSearch = useCallback(
    (term) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        if (term.length >= minSearchLength) {
          setLoading(true);
          try {
            const response = await api.get(
              `/api/v1/drugs/search`,
              {
                params: { query: term },
              }
            );
            setOptions(response.data?.data || []);
          } catch (error) {
            console.error("Error searching drugs:", error);
            setOptions([]);
          } finally {
            setLoading(false);
          }
        } else {
          setOptions([]);
        }
      }, debounceMs);
    },
    [minSearchLength, debounceMs]
  );

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.drugName);
    onChange(option.drugName);
    setIsOpen(false);
    // Ensure focus returns to input for mobile keyboards
    setTimeout(() => {
      inputRef.current?.blur();
    }, 100);
  };

  const handleClear = () => {
    setSelectedOption(null);
    setSearchTerm("");
    onChange("");
    setOptions([]);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsOpen(true);
    if (searchTerm.length >= minSearchLength) {
      debouncedSearch(searchTerm);
    }
  };

  const handleBlur = (e) => {
    // Don't close if clicking on dropdown
    if (dropdownRef.current?.contains(e.relatedTarget)) {
      return;
    }
    // Add delay for mobile devices to allow touch events to complete
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleTouchOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleTouchOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, []);

  useEffect(() => {
    if (value && !selectedOption) {
      setSearchTerm(value);
    }
  }, [value, selectedOption]);

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-3 border rounded-md text-sm",
            "bg-[#F8F9FB] border-gray-300 text-gray-900",
            "placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          style={{
            WebkitAppearance: "none",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "text",
            touchAction: "manipulation",
          }}
          name={name}
          id={id}
          autoComplete="off"
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "manipulation",
          }}
        >
          {loading ? (
            <div className="px-3 py-2 text-sm text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Searching...
            </div>
          ) : options.length > 0 ? (
            options.map((option, i) => (
              <button
                key={option.id || i}
                type="button"
                onClick={() => handleOptionSelect(option)}
                onTouchStart={(e) => {
                  // Prevent default to avoid double-tap zoom on iOS
                  e.preventDefault();
                }}
                onTouchEnd={(e) => {
                  // Handle touch selection
                  e.preventDefault();
                  handleOptionSelect(option);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none touch-manipulation"
                style={{
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <div className="font-medium text-gray-900">
                  {option.drugName}
                </div>
              </button>
            ))
          ) : searchTerm.length >= minSearchLength ? (
            <div className="px-3 py-2 text-sm text-gray-500">
              No drugs found for "{searchTerm}"
            </div>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              Type at least {minSearchLength} characters to search
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DrugSelect;
