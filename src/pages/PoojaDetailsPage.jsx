

// const PoojaDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [pooja, setPooja] = useState(null);

//   useEffect(() => {
//     getPoojaById(id).then(setPooja);
//   }, [id]);

//   if (!pooja) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen bg-[#fffaf0] py-10 px-4">
//   <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row">

//     {/* Left: Image Section */}
//     <div className="md:w-1/2">
//       <img
//         src={pooja.image}
//         alt={pooja.name}
//         className="h-full w-full object-cover"
//       />
//     </div>

//     {/* Right: Details Section */}
//     <div className="md:w-1/2 p-6 flex flex-col justify-between">
//       <div>
//         <h2 className="text-3xl font-extrabold text-orange-800 mb-4">
//           {pooja.name}
//         </h2>
//         <p className="text-gray-700 text-base leading-relaxed">
//           {pooja.description}
//         </p>
//       </div>

//       <div className="mt-8">
//         <button
//           onClick={() => navigate(`/checkout/${pooja.id}`)}
//           className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-md w-full transition"
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default PoojaDetailsPage;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPoojaById } from "../api/dashboardsApi";

const PoojaDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pooja, setPooja] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  useEffect(() => {
    getPoojaById(Number(id)).then(setPooja);
  }, [id]);

  if (!pooja) {
    return <div className="text-center py-10 text-orange-600 font-medium">Loading Pooja Details...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fffaf0] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={pooja.image}
            alt={pooja.name}
            className="h-full w-full object-contains"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-orange-800 mb-4">
              {pooja.name}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {pooja.description}
            </p>

            {/* Pooja Items with checkboxes */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-orange-700 mb-2">Required Items:</h3>
              <ul className="space-y-2">
                {pooja.items?.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`item-${idx}`}
                      checked={selectedItems.includes(item)}
                      onChange={() => handleToggleItem(item)}
                      className="text-orange-600 focus:ring-orange-400"
                    />
                    <label htmlFor={`item-${idx}`} className="text-gray-800">{item}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-orange-700 mb-2">{pooja.price}</h3>  
          <div className="mt-6">
            <button
              onClick={() => navigate(`/checkout/${pooja.id}`)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-md w-full transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoojaDetailsPage;
