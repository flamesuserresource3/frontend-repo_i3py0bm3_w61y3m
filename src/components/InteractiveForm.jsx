import { useEffect, useMemo, useRef, useState } from 'react';
import { Info, Mic, SlidersHorizontal } from 'lucide-react';

const TOOLTIP = {
  GPU: 'Graphics processor that handles visuals and gaming performance.',
  RAM: 'Short-term memory for multitasking. More RAM = smoother switching.',
  'Refresh Rate': 'How many times per second the screen updates. Higher feels smoother.',
};

const GADGET_TYPES = ['Laptop', 'Smartphone', 'Tablet', 'Earphones'];
const USAGE_TYPES = ['Gaming', 'Coding', 'Office', 'Education', 'Entertainment'];

export default function InteractiveForm({ onSubmit }) {
  const [gadget, setGadget] = useState('Laptop');
  const [usage, setUsage] = useState('Coding');
  const [budget, setBudget] = useState(800);
  const [freq, setFreq] = useState('Daily');
  const [env, setEnv] = useState('Home');
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recogRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = 'en-US';
      recog.interimResults = false;
      recog.continuous = false;
      recog.onresult = (e) => {
        const text = e.results[0][0].transcript.toLowerCase();
        if (text.includes('phone')) setGadget('Smartphone');
        if (text.includes('laptop')) setGadget('Laptop');
        if (text.includes('tablet')) setGadget('Tablet');
        if (text.includes('ear')) setGadget('Earphones');
        if (text.includes('game')) setUsage('Gaming');
        if (text.includes('code') || text.includes('developer')) setUsage('Coding');
        const matchBudget = text.match(/(\d{2,4})/);
        if (matchBudget) setBudget(Number(matchBudget[1]));
      };
      recog.onend = () => setListening(false);
      recogRef.current = recog;
      setVoiceSupported(true);
    }
  }, []);

  const budgetDisplay = useMemo(() => {
    if (budget < 300) return 'Entry • <$300';
    if (budget < 800) return 'Mid • $300–$800';
    if (budget < 1500) return 'Upper • $800–$1500';
    return 'Premium • $1500+';
  }, [budget]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({ gadget, usage, budget, freq, env });
  };

  const toggleVoice = () => {
    if (!voiceSupported) return;
    if (listening) {
      recogRef.current && recogRef.current.stop();
      setListening(false);
    } else {
      setListening(true);
      recogRef.current && recogRef.current.start();
    }
  };

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Tell us what you need</h2>
          <button
            type="button"
            onClick={toggleVoice}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
              listening ? 'bg-cyan-500 text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'
            } disabled:opacity-50`}
            disabled={!voiceSupported}
            aria-pressed={listening}
          >
            <Mic className="h-4 w-4" /> {listening ? 'Listening…' : voiceSupported ? 'Voice input' : 'Voice not supported'}
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Gadget type</label>
            <select value={gadget} onChange={(e) => setGadget(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-white">
              {GADGET_TYPES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-300">Primary usage</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {USAGE_TYPES.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUsage(u)}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    usage === u ? 'bg-cyan-500 text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <SlidersHorizontal className="h-4 w-4" /> Budget range
              <span className="ml-2 rounded-lg bg-white/10 px-2 py-0.5 text-xs text-white">{budgetDisplay}</span>
            </label>
            <input
              type="range"
              min={100}
              max={3000}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Usage frequency</label>
            <select value={freq} onChange={(e) => setFreq(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-white">
              {['Daily', 'Weekly', 'Occasional'].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-300">Environment</label>
            <select value={env} onChange={(e) => setEnv(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-white">
              {['Home', 'Office', 'Travel'].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              {Object.entries(TOOLTIP).map(([k, v]) => (
                <span key={k} className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1">
                  <Info className="h-3.5 w-3.5 text-cyan-300" />
                  <span className="text-white/90">{k}:</span> {v}
                </span>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:brightness-110">
              Get AI Recommendations
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
