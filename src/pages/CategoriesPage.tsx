import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-6 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            All <span className="text-gold-glow">Categories</span>
          </motion.h1>
        </div>
        <CategoryGrid />
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
