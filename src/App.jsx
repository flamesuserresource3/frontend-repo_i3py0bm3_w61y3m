import { useState } from 'react';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import InteractiveForm from './components/InteractiveForm';
import Recommendations from './components/Recommendations';

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-white">
        <div className="text-lg font-semibold">SpecBud</div>
        <div className="hidden gap-6 text-sm text-slate-300 sm:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#form" className="hover:text-white">Start</a>
        </div>
      </nav>
    </header>
  );
}

export default function App() {
  const [query, setQuery] = useState(null);
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero onGetStarted={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} />
      <FeatureGrid />
      <div id="form">
        <InteractiveForm onSubmit={(q) => setQuery(q)} />
      </div>
      <Recommendations query={query} />
      <footer className="border-t border-white/10 py-10 text-center text-slate-400">
        © {new Date().getFullYear()} SpecBud — Built for smarter gadget decisions.
      </footer>
    </div>
  );
}
