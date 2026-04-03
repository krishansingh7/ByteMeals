import React from 'react';

const SearchBar = ({ value, onChange, placeholder, onSubmit }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 mt-2">
      <form 
        onSubmit={(e) => { e.preventDefault(); if (onSubmit) onSubmit(); }} 
        className="relative flex items-center w-full h-14 rounded-2xl shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500/50 focus-within:border-orange-500 transition-all"
      >
        <div className="grid place-items-center h-full w-14 text-slate-400 dark:text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          className="peer h-full w-full outline-none text-base text-slate-800 dark:text-slate-200 bg-transparent placeholder-slate-400 dark:placeholder-slate-500 pr-4"
          type="text"
          id="search"
          placeholder={placeholder || "Search for restaurants and food"}
          value={value}
          onChange={onChange}
        />
        
        {onSubmit && (
           <button 
             type="submit" 
             className="h-full px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold transition-colors border-l border-orange-600 dark:border-transparent outline-none"
           >
             Search
           </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
