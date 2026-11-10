import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import Opportunities from './pages/Opportunities'
import OpportunityDetail from './pages/OpportunityDetail'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunities/:slug" element={<OpportunityDetail />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
