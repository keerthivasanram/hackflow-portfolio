import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Organizers from './pages/Organizers'
import Participants from './pages/Participants'
import Judging from './pages/Judging'
import MasterDashboard from './pages/MasterDashboard'
import Support from './pages/Support'
import RolesAndTasks from './pages/RolesAndTasks'
import About from './pages/About'
import ScrollToTop from './components/ScrollToTop'
import BackgroundEffects from './components/BackgroundEffects'

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <ScrollToTop />
      <BackgroundEffects />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<MasterDashboard />} />
              <Route path="/organizers" element={<Organizers />} />
              <Route path="/participants" element={<Participants />} />
              <Route path="/judging" element={<Judging />} />
              <Route path="/roles-tasks" element={<RolesAndTasks />} />
              <Route path="/support" element={<Support />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
