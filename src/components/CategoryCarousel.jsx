import React, { useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BASE_IMG_URL } from '../utils/constants';

const CategoryCarousel = ({ categories }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [categories]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) return null;

    const btnBase =
      "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200";
    const btnActive =
      "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer";
    const btnDisabled =
      "bg-slate-100 dark:bg-slate-900 opacity-30 cursor-not-allowed pointer-events-none";

  return (
    <div className="w-full relative mb-10 pb-10 border-b border-gray-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4 mt-8 px-4 sm:px-0">
        <h2 className="text-[22px] sm:text-2xl font-bold text-[#02060C] dark:text-gray-100">
          What's on your mind?
        </h2>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`${btnBase} ${canScrollLeft ? btnActive : btnDisabled}`}
          >
            <ChevronLeft
              size={20}
              className="text-slate-800 dark:text-slate-200"
            />
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`${btnBase} ${canScrollRight ? btnActive : btnDisabled}`}
          >
            <ChevronRight
              size={20}
              className="text-slate-800 dark:text-slate-200"
            />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth px-4 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => {
          const catName = category.action?.text?.toLowerCase() || "category";
          return (
            <Link
              to={`/category/${catName}`}
              key={category.id}
              className="min-w-[124px] cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={BASE_IMG_URL + category.imageId}
                alt={catName}
                className="w-32 h-32 object-contain"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCarousel;
