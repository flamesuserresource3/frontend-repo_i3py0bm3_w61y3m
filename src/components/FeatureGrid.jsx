import { Cpu, BadgeDollarSign, Sparkles, ShieldCheck, Bot, Camera, Mic } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Personalized Recommendations',
    desc: 'Hybrid AI engine blends your needs with specs and real-world feedback to surface the perfect match.'
  },
  {
    icon: BadgeDollarSign,
    title: 'Real-time Price Comparison',
    desc: 'Track best deals across Amazon, Flipkart, Croma, and Reliance Digital with direct links.'
  },
  {
    icon: Cpu,
    title: 'Deep Spec Intelligence',
    desc: 'Clear guidance on CPU, GPU, RAM, refresh rate, battery and more—no jargon overwhelm.'
  },
  {
    icon: ShieldCheck,
    title: 'Investment & Sustainability Scores',
    desc: 'Know longevity, repairability and eco impact before you buy.'
  },
  {
    icon: Camera,
    title: 'AR Product View',
    desc: 'Spin, zoom and place 3D models in your space. See size and design in context.'
  },
  {
    icon: Bot,
    title: 'Conversational Assistant',
    desc: 'Ask anything. Get guided, step-by-step selection help and review summaries.'
  },
  {
    icon: Mic,
    title: 'Voice Input',
    desc: 'Use speech-to-text to fill the form quickly and naturally.'
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Why SpecBud</h2>
      <p className="mt-2 max-w-2xl text-slate-300">Built for clarity, speed and confidence—so your next gadget is a win today and tomorrow.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
            <div className="mb-4 inline-flex rounded-xl bg-cyan-500/10 p-3 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
