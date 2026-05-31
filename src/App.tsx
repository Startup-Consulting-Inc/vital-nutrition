import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FooterSection from './sections/FooterSection';
import Home from './pages/Home';
import Nutrients from './pages/Nutrients';
import Analyzer from './pages/Analyzer';
import Research from './pages/Research';
import Compare from './pages/Compare';
import NutrientDetail from './pages/NutrientDetail';
import AminoAcids from './pages/AminoAcids';
import Methodology from './pages/Methodology';
import MealLog from './pages/MealLog';
import SpecialPopulations from './pages/SpecialPopulations';
import NutritionChat from './pages/NutritionChat';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f6f5f1' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nutrients" element={<Nutrients />} />
            <Route path="/nutrients/:slug" element={<NutrientDetail />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/research" element={<Research />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/amino-acids" element={<AminoAcids />} />
            <Route path="/log" element={<MealLog />} />
            <Route path="/special-populations" element={<SpecialPopulations />} />
            <Route path="/chat" element={<NutritionChat />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <FooterSection />
      </div>
    </AuthProvider>
  );
}
