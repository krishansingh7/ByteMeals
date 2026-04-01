import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import MenuCategory from '../components/MenuCategory';
import { ArrowLeft } from 'lucide-react';

const CategoryItems = () => {
  const { name } = useParams();
  
  // Decoding the name from URL
  const decodedName = decodeURIComponent(name).replace(/-/g, ' ');

  // Create some dummy items conditionally wrapped in useMemo to avoid pure-component lint errors
  const dummyItems = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      card: {
        info: {
          id: `mock-${decodedName.toLowerCase()}-${i}`,
          name: `${decodedName} Delight ${i + 1}`,
          price: (150 + i * 15) * 100, // paise
          description: `Experience the finest ${decodedName} prepared by top chefs with premium ingredients.`,
          imageId: "bdcd233971b7c81bf77e1fa4471280eb", // Generic placeholder
          isVeg: i % 2 === 0 ? 1 : 0
        }
      }
    }));
  }, [decodedName]);

  const mockCategory = {
    card: {
      card: {
        title: `${decodedName} Specials`,
        itemCards: dummyItems
      }
    }
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 min-h-screen">
      
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition">
        <ArrowLeft size={20} />
        <span className="font-semibold text-sm uppercase tracking-wider">Back to Home</span>
      </Link>

      <h1 className="text-3xl font-extrabold text-[#282c3f] dark:text-white mb-2 capitalize">
        Best {decodedName}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Discover the most delicious {decodedName} selections specifically curated for you.
      </p>

      {/* Render the accordion category mapped with our mock items */}
      <div className="flex flex-col gap-4">
        <MenuCategory category={mockCategory} />
      </div>
      
    </div>
  );
};

export default CategoryItems;
