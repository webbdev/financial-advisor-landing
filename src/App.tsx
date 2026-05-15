import { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom"
import { ScrollToTop } from './components/ScrollToTop'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import { Footer } from './sections/Footer'

// Lazy-load the booking page so the home bundle stays light. It's a
// distinct user journey and most visitors will never hit it.
const BookCallPage = lazy(() => import('./pages/BookCallPage'))
const WealthManagementPage = lazy(() => import('./pages/WealthManagementPage'),)
const SavingsInvestmentsPage = lazy(() => import('./pages/SavingsInvestmentsPage'),)

const PrivacyPage = lazy(() => import('./pages/PrivacyPage'),)

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="relative">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookCallPage />} />
            <Route path="/services/wealth-management" element={<WealthManagementPage />} />
            <Route path="/services/savings-investments" element={<SavingsInvestmentsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}