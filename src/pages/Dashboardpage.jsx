import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getPoojas } from "../api/dashboardsApi";
import { motion } from "framer-motion";

const PoojaCard = ({ pooja }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-[#fff7ed] border border-orange-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="relative">
                <img src={pooja.image_url} alt={pooja.name} className="w-full h-40 object-cover" />
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                ₹{pooja.base_price}
                </span>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{pooja.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{pooja.description}</p>
                <div className="flex items-center text-orange-600 mt-3 text-sm">
                    <svg
                        className="w-4 h-4 mr-1 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 9H9V5h2v6z" />
                    </svg>
                    {pooja.duration}
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"  onClick={() => navigate(`/pooja/${pooja.id}`)}>
                    Book Pooja
                </button>
            </div>
        </div>
    );
}

const DashboardPage = () => {
    const [poojas, setPoojas] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPoojas = async () => {
            try {
                const data = await getPoojas();
                setPoojas(data);
            } catch (error) {
                console.error("Error fetching poojas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPoojas();
    }, []);
    return (
        <>
            <div className="mt-2 text-orange-800 overflow-hidden whitespace-nowrap relative">
                <div className="animate-marquee inline-block">
                    📢 New update: Book your pooja today and get a free consultation! &nbsp;&nbsp;&nbsp; 📅 Festival bookings are now open! &nbsp;&nbsp;&nbsp; 🙏 Invite divine blessings with Satyanarayana Pooja!
                </div>
            </div>
            {/* Header */}
            {/* <div className="max-w-4xl mx-auto mt-5 text-center mb-10 border bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition p-6 rounded-xl bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-white-700 mb-2">
                    🙏  Welcome to Agraharam 🙏
                </h2>
                <p className="text-white-700 text-sm">
                where you’ll find all your Pooja services and the best Pandits in one place.
                    <br />
                    Book your pooja today and invite divine blessings into your life.
                </p>
            </div> */}
            <motion.div
      className="max-w-4xl mx-auto mt-5 text-center mb-10 border bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-white mb-2">
        🙏 Welcome to Agraharam 🙏
      </h2>
      <p className="text-white text-sm">
        where you’ll find all your Pooja services and the best Pandits in one place.
        <br />
        Book your pooja today and invite divine blessings into your life.
      </p>
    </motion.div>

            {/* Cards Grid */}
            <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {poojas.map((pooja) => (
                    <PoojaCard key={pooja.id} pooja={pooja} />
                ))}
            </div>
        </>
    );
};


export default DashboardPage