import { Rocket, Sparkles } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4k3h1bRp6m4o7WJm/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(2,6,23,0.85))]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur"
        >
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Smarter Gadget Decisions, Powered by AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Meet SpecBud
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg"
        >
          Your AI-powered companion for picking the perfect laptop, phone, tablet, or audio gear—personalized to your needs, budget, and style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
          >
            <Rocket className="h-5 w-5 transition group-hover:translate-x-0.5" />
            Get Started
          </button>
          <a
            href="#features"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Explore Features
          </a>
        </motion.div>
      </div>
    </section>
  );
}
