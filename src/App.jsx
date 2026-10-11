import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import MassSacraments from './pages/MassSacraments'
import NotFound from './pages/NotFound'
import ParishNews from './pages/ParishNews'
import Societies from './pages/Societies'

// Defines the website routes inside the shared layout.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="mass-sacraments" element={<MassSacraments />} />
          <Route path="parish-news" element={<ParishNews />} />
          <Route path="societies" element={<Societies />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
