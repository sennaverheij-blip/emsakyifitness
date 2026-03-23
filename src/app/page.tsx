'use client'

import { useState, useEffect, useCallback } from 'react'
import { useReveal } from '@/lib/useReveal'
import Image from 'next/image'

/* ============================================================
   QUIZ DATA
   ============================================================ */
const quizSteps = [
  {
    question: 'Which best describes where you are right now?',
    micro: 'There are no wrong answers. This helps Emin prepare for your call.',
    options: [
      "I'm training but results don't match my effort",
      "I'm completely out of shape and need to start from scratch",
      "I'm in decent shape but I want to level up my presence",
      "I'm already fit but something is still missing",
    ],
  },
  {
    question: "What's your primary objective over the next 16 weeks?",
    micro: 'Be honest — clarity now means better results later.',
    options: [
      'Build a physique that commands authority',
      'Lose fat and build real, functional muscle',
      'Fix my posture, frame, and overall physical presence',
      'All of the above — complete transformation',
    ],
  },
  {
    question: 'How serious are you about this?',
    micro: 'We only work with people who are ready to commit.',
    options: [
      "I'm 100% committed. I follow through on what I invest in.",
      "I'm serious but I want to understand more first",
      "I'm exploring my options right now",
      "I'm not sure yet",
    ],
  },
  {
    question: 'How many hours per week can you realistically dedicate to training?',
    micro: 'We build around your schedule — not the other way around.',
    options: [
      '4-6 hours (4-5 sessions)',
      '6-10 hours (5-6 sessions + lifestyle habits)',
      "2-4 hours — I'm time-constrained but committed",
      'Less than 2 hours',
    ],
  },
  {
    question: 'Do you have any physical limitations, injuries, or medical conditions?',
    micro: 'This stays between you and Emin. Leave blank if none.',
    freeText: true,
    placeholder: 'E.g. lower back issue, recovering from surgery — or leave blank',
  },
  {
    question: 'Which country are you based in?',
    micro: 'Used for grocery list localization in your meal plans.',
    freeText: true,
    placeholder: 'E.g. Netherlands, United Kingdom, United States',
  },
  {
    question: 'What is your investment budget for this transformation?',
    micro: 'This helps us recommend the right path for you.',
    highlight: true,
    options: [
      "$3,500+ — I'm ready to invest in the elite experience",
      "$1,500–$3,499 — community tier is more my range",
      "$500–$1,499 — I'd like to explore options",
      "Under $500 — I'm not financially ready right now",
    ],
  },
]

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function FunnelPage() {
  useReveal()

  const [quizOpen, setQuizOpen] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<(string | null)[]>(Array(7).fill(null))
  const [quizResult, setQuizResult] = useState<string | null>(null)
  const [nurture, setNurture] = useState({ email: '', submitted: false })
  const [headerScrolled, setHeaderScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = quizOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [quizOpen])

  const openQuiz = useCallback(() => {
    setQuizOpen(true)
    setQuizStep(0)
    setQuizAnswers(Array(7).fill(null))
    setQuizResult(null)
    setNurture({ email: '', submitted: false })
  }, [])

  const selectAnswer = (answer: string) => {
    const next = [...quizAnswers]
    next[quizStep] = answer
    setQuizAnswers(next)
    if (!quizSteps[quizStep].freeText) {
      setTimeout(() => {
        if (quizStep < 6) setQuizStep(quizStep + 1)
        else calculateResult(next)
      }, 400)
    }
  }

  const advanceFreeText = () => {
    if (quizStep < 6) setQuizStep(quizStep + 1)
    else calculateResult(quizAnswers)
  }

  const calculateResult = (answers: (string | null)[]) => {
    const budget = answers[6] || ''
    if (budget.startsWith('$3,500')) setQuizResult('elite')
    else if (budget.startsWith('$1,500')) setQuizResult('community')
    else if (budget.startsWith('$500')) setQuizResult('soft-disqualify')
    else setQuizResult('hard-disqualify')
  }

  return (
    <div className="noise-overlay">
      <div className="grid-bg" />

      {/* ====== HEADER ====== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        headerScrolled
          ? 'bg-brand-black/90 backdrop-blur-xl border-b border-brand-bronze/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <Image src="/assets/icon.png" alt="emsakyifitness" width={40} height={40} className="rounded" />
          <button onClick={openQuiz} className="btn-primary !py-3 !px-6 !text-sm hidden sm:inline-flex">
            Apply Now
          </button>
        </div>
      </header>

      <main>
        {/* ====== HERO ====== */}
        <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />

          <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-bronze/[0.08] border border-brand-bronze/20 mb-8 reveal">
                  <span className="w-2 h-2 rounded-full bg-brand-bronze animate-pulse" />
                  <span className="text-xs font-headline font-semibold tracking-[2px] uppercase text-brand-bronze">The Presence Protocol</span>
                </div>

                <h1 className="font-headline text-[clamp(2.6rem,6vw,4rem)] font-extrabold leading-[1.05] mb-6 reveal reveal-delay-1">
                  Transform Your Physique.{' '}
                  <span className="text-gradient-bronze">Command Your Presence.</span>
                </h1>

                <p className="font-accent italic text-xl text-brand-cream/50 mb-6 reveal reveal-delay-2">
                  They didn&apos;t get lucky. They engineered their presence.
                </p>

                <p className="text-lg text-brand-cream/70 leading-relaxed mb-10 max-w-lg reveal reveal-delay-3">
                  Most people are background noise in their own lives. Their physique doesn&apos;t match their ambition. <strong className="text-brand-cream">The Presence Protocol changes that — permanently.</strong>
                </p>

                <div className="flex flex-wrap gap-4 reveal reveal-delay-4">
                  <button onClick={openQuiz} className="btn-primary text-lg !py-5 !px-10">
                    Apply Now →
                  </button>
                  <a href="#method" className="btn-secondary !py-5 !px-8">
                    Learn More
                  </a>
                </div>
              </div>

              {/* VSL + Badge */}
              <div className="relative reveal reveal-delay-2">
                {/* Floating badge */}
                <div className="absolute -top-8 -right-4 z-20 badge-float hidden lg:block">
                  <Image src="/assets/badge.png" alt="The Presence Protocol" width={100} height={100} className="rounded-full shadow-2xl shadow-brand-bronze/20" />
                </div>

                <div className="glow-card">
                  <div className="glow-card-inner !p-0 overflow-hidden">
                    {/* Bronze corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-bronze/40 z-10 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand-bronze/40 z-10 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand-bronze/40 z-10 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-bronze/40 z-10 rounded-br-xl" />

                    <div className="aspect-video bg-gradient-to-br from-brand-black via-brand-surface to-brand-black flex flex-col items-center justify-center relative">
                      {/* Subtle radial glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,97,0.06),transparent_60%)]" />
                      <div className="w-20 h-20 rounded-full bg-brand-bronze/10 border-2 border-brand-bronze/50 flex items-center justify-center mb-4 hover:scale-110 hover:bg-brand-bronze/20 hover:border-brand-bronze transition-all duration-300 cursor-pointer group relative z-10">
                        <div className="absolute inset-0 rounded-full bg-brand-bronze/20 animate-ping opacity-30" />
                        <svg className="w-8 h-8 fill-brand-bronze ml-1 relative z-10" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                      </div>
                      <span className="text-sm text-brand-cream/40 font-body relative z-10">Watch the full breakdown</span>
                    </div>

                    <div className="px-5 py-4 flex items-center justify-between border-t border-white/5">
                      <span className="text-xs text-brand-cream/40 font-body">Watched by <strong className="text-brand-cream/60">1,200+</strong> people</span>
                      <button onClick={openQuiz} className="text-xs font-headline font-semibold text-brand-bronze hover:text-brand-gold transition-colors">
                        Apply Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust bar */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 reveal reveal-delay-5">
              {[
                ['47+', 'Lives Transformed'],
                ['16', 'Week Protocol'],
                ['Elite', '1-on-1 Coaching'],
                ['100%', 'Bespoke'],
              ].map(([num, label]) => (
                <div key={label} className="text-center group">
                  <div className="font-headline font-bold text-3xl text-gradient-bronze mb-1 group-hover:scale-105 transition-transform">{num}</div>
                  <div className="text-xs text-brand-cream/40 font-body uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== WHO IS THIS FOR ====== */}
        <section className="py-28 relative animated-line">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-headline font-semibold tracking-[4px] uppercase text-brand-bronze mb-4 reveal">Who This Is For</p>
              <h2 className="font-headline text-h2 reveal reveal-delay-1">Is The Presence Protocol <span className="text-gradient-bronze">For You?</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="reveal">
                <h3 className="font-headline font-semibold text-sm text-brand-cream/40 mb-6 uppercase tracking-[3px]">Where you are now</h3>
                <div className="space-y-3">
                  {[
                    "You're putting in work but the results don't match",
                    'You walk into rooms and blend into the background',
                    "Your physique doesn't reflect who you know you are",
                    "You're training for aesthetics. You should be training for authority.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4 p-5 rounded-xl bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/20 transition-all group">
                      <span className="text-red-400/60 mt-0.5 group-hover:text-red-400 transition-colors">✕</span>
                      <span className="text-brand-cream/60 font-body text-[15px] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal reveal-delay-2">
                <h3 className="font-headline font-semibold text-sm text-brand-bronze mb-6 uppercase tracking-[3px]">Where you&apos;ll be</h3>
                <div className="space-y-3">
                  {[
                    'A frame that commands respect before you say a word',
                    'Athletic power built for real life, not just the gym',
                    'A nutrition protocol that fuels performance, not bulk',
                    'A lifestyle operating system you actually own',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4 p-5 rounded-xl bg-brand-bronze/[0.03] border border-brand-bronze/10 hover:border-brand-bronze/30 transition-all group">
                      <span className="text-brand-bronze/60 mt-0.5 group-hover:text-brand-bronze transition-colors">✓</span>
                      <span className="text-brand-cream/80 font-body text-[15px] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Identity statement with logo */}
            <div className="relative rounded-2xl overflow-hidden reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-card via-brand-card to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-bronze/[0.04] to-transparent" />
              <div className="relative border-l-[6px] border-brand-bronze p-8 md:p-12 flex flex-col md:flex-row items-start gap-8">
                <Image src="/assets/badge.png" alt="" width={80} height={80} className="rounded-full opacity-60 hidden md:block" />
                <div>
                  <p className="font-accent italic text-xl md:text-2xl text-brand-cream/90 leading-relaxed">
                    &ldquo;I&apos;m not a trainer. I&apos;m the architect of your new presence.
                    We don&apos;t count reps. We engineer identity.&rdquo;
                  </p>
                  <p className="mt-5 text-sm text-brand-bronze font-headline font-semibold tracking-[3px] uppercase">— Emin</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== THREE PHASES ====== */}
        <section id="method" className="py-28 relative animated-line">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-headline font-semibold tracking-[4px] uppercase text-brand-bronze mb-4 reveal">The Method</p>
              <h2 className="font-headline text-h2 reveal reveal-delay-1">The Three-Phase <span className="text-gradient-bronze">Protocol</span></h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  phase: '01', title: 'The Audit', tagline: 'Strip the noise. Set the foundation.',
                  body: 'Audit your lifestyle, nutrition, training, and mindset. Remove the friction. Establish the non-negotiables that mark the beginning of your transformation.',
                  icon: '◇',
                },
                {
                  phase: '02', title: 'The Forge', tagline: 'Build visual authority.',
                  body: 'Heavy, athletic programming targeting the visual keys of authority: shoulders, posture, lean powerful core. Boxing-informed. Hybrid athlete programming.',
                  icon: '◆',
                },
                {
                  phase: '03', title: 'The Operating System', tagline: 'Own the identity permanently.',
                  body: 'Transition the high-performance habits from protocol to default. This is the lifestyle operating system — making your character sustainable, not seasonal.',
                  icon: '◈',
                },
              ].map((p, i) => (
                <div key={p.phase} className={`glow-card reveal reveal-delay-${i + 1}`}>
                  <div className="glow-card-inner relative">
                    <span className="absolute top-4 right-4 font-headline font-extrabold text-[100px] leading-none text-brand-cream/[0.02] select-none">
                      {p.phase}
                    </span>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-brand-bronze/10 border border-brand-bronze/20 flex items-center justify-center text-xl text-brand-bronze mb-5">
                        {p.icon}
                      </div>
                      <p className="text-[10px] font-headline font-semibold tracking-[3px] uppercase text-brand-bronze/60 mb-2">Phase {p.phase}</p>
                      <h3 className="font-headline font-bold text-xl mb-2">{p.title}</h3>
                      <p className="font-accent italic text-brand-cream/40 text-sm mb-4">{p.tagline}</p>
                      <p className="font-body text-sm text-brand-cream/60 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== OFFER ====== */}
        <section className="py-28 relative animated-line">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-headline font-semibold tracking-[4px] uppercase text-brand-bronze mb-4 reveal">Investment</p>
              <h2 className="font-headline text-h2 reveal reveal-delay-1">Choose Your <span className="text-gradient-bronze">Path</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Elite */}
              <div className="glow-card reveal">
                <div className="glow-card-inner relative">
                  <span className="absolute -top-[1px] left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-brand-bronze to-transparent" />
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-bronze/10 border border-brand-bronze/30 text-[10px] font-headline font-bold tracking-[2px] uppercase text-brand-bronze mb-5">
                    Most Transformation
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-1">The Presence Protocol</h3>
                  <p className="text-xs text-brand-cream/40 uppercase tracking-wider mb-4">Elite</p>
                  <div className="font-headline font-extrabold text-4xl text-gradient-bronze mb-1">$3,497</div>
                  <p className="text-sm text-brand-cream/40 mb-6">16-Week Commitment</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Weekly Command Sessions (1-on-1 strategy calls)',
                      'Identity & Presence Architecture',
                      'Frictionless Implementation Support',
                      'Bespoke Performance Protocols',
                      'Priority "Cornerman" Access (direct line)',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-body text-brand-cream/70">
                        <span className="text-brand-bronze mt-0.5 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={openQuiz} className="btn-primary w-full">Apply for Elite →</button>
                </div>
              </div>

              {/* Community */}
              <div className="glow-card reveal reveal-delay-1">
                <div className="glow-card-inner">
                  <h3 className="font-headline font-bold text-2xl mb-1">The Inner Circle</h3>
                  <p className="text-xs text-brand-cream/40 uppercase tracking-wider mb-4">Community</p>
                  <div className="font-headline font-bold text-4xl text-brand-cream mb-1">$1,449</div>
                  <p className="text-sm text-brand-cream/40 mb-6">Ongoing Membership</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'The Presence Blueprint (full vault access)',
                      'Inner Circle Community',
                      'Bi-Weekly Group Command Calls',
                      'Community Leaderboards',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-body text-brand-cream/70">
                        <span className="text-brand-bronze mt-0.5 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={openQuiz} className="btn-secondary w-full">Join the Inner Circle →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TESTIMONIALS ====== */}
        <section className="py-28 relative animated-line">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-headline font-semibold tracking-[4px] uppercase text-brand-bronze mb-4 reveal">Results</p>
              <h2 className="font-headline text-h2 reveal reveal-delay-1">From Background. <span className="text-gradient-bronze">To Main Character.</span></h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Sarah, 31', role: 'Entrepreneur', quote: "I walked into a pitch meeting after 12 weeks and my business partner said 'What happened to you?' That's when I knew the protocol was real." },
                { name: 'James, 29', role: 'Software Engineer', quote: "I spent 3 years at the gym with nothing to show for it. Emin restructured everything in week one. By week 8, I didn't recognise myself." },
                { name: 'Priya, 35', role: 'Creative Director', quote: "The Presence Protocol isn't a fitness programme. It's an identity upgrade. My confidence, my frame, my energy — everything shifted." },
              ].map((t, i) => (
                <div key={t.name} className={`brand-card reveal reveal-delay-${i + 1}`}>
                  <div className="flex gap-0.5 text-brand-bronze text-sm mb-4">{'★★★★★'}</div>
                  <p className="font-accent italic text-brand-cream/75 leading-relaxed mb-6 text-[15px]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-bronze/20 to-brand-card border border-brand-bronze/20 flex items-center justify-center text-xs font-headline font-bold text-brand-bronze">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-headline font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-brand-cream/40">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section className="py-28 relative animated-line">
          <div className="max-w-[720px] mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-headline font-semibold tracking-[4px] uppercase text-brand-bronze mb-4 reveal">FAQ</p>
              <h2 className="font-headline text-h2 reveal reveal-delay-1">Questions</h2>
            </div>
            <FAQSection />
          </div>
        </section>

        {/* ====== FINAL CTA ====== */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-card/50 to-brand-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.06),transparent_70%)]" />

          <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
            <Image src="/assets/badge.png" alt="" width={80} height={80} className="mx-auto mb-8 opacity-40 badge-float reveal" />
            <h2 className="font-headline text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold leading-tight mb-4 reveal reveal-delay-1">
              Stop being background noise.{' '}
              <span className="text-gradient-bronze">Start commanding every room you enter.</span>
            </h2>
            <p className="font-accent italic text-brand-cream/50 mb-10 reveal reveal-delay-2">
              Applications are reviewed manually. Not everyone is accepted.
            </p>
            <button onClick={openQuiz} className="btn-primary text-lg reveal reveal-delay-3">
              Apply to The Presence Protocol →
            </button>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="py-10 border-t border-brand-card/50 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Image src="/assets/logo.png" alt="emsakyifitness" width={140} height={40} className="opacity-60" />
          <p className="text-xs text-brand-cream/25 font-body">© 2026 emsakyifitness · Privacy · Terms</p>
        </div>
      </footer>

      {/* ====== QUIZ OVERLAY ====== */}
      {quizOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-black/[0.97] backdrop-blur-sm flex flex-col">
          <div className="h-[2px] bg-brand-card w-full">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: quizResult ? '100%' : `${((quizStep + 1) / 7) * 100}%`,
                background: 'linear-gradient(90deg, #C9A961, #D4AF37)',
              }}
            />
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            {quizStep > 0 && !quizResult ? (
              <button onClick={() => setQuizStep(quizStep - 1)} className="text-brand-cream/40 hover:text-brand-cream transition-colors text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>
            ) : <div />}
            {!quizResult && (
              <span className="text-[10px] text-brand-cream/30 font-headline tracking-[3px] uppercase">Step {quizStep + 1} of 7</span>
            )}
            {(quizStep < 3 || quizResult) && (
              <button onClick={() => setQuizOpen(false)} className="text-brand-cream/30 hover:text-brand-cream transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
            <div className="max-w-[640px] w-full py-8">
              {!quizResult ? (
                <div key={quizStep} className="animate-fade-in">
                  <h2 className={`font-headline font-bold text-2xl md:text-3xl mb-3 leading-tight ${
                    quizSteps[quizStep].highlight ? 'border-l-4 border-brand-bronze pl-5' : ''
                  }`}>
                    {quizSteps[quizStep].question}
                  </h2>
                  <p className="font-accent italic text-sm text-brand-cream/30 mb-8">{quizSteps[quizStep].micro}</p>

                  {quizSteps[quizStep].freeText ? (
                    <div className="space-y-4">
                      <input type="text" className="brand-input text-lg" placeholder={quizSteps[quizStep].placeholder}
                        value={quizAnswers[quizStep] || ''}
                        onChange={(e) => { const n = [...quizAnswers]; n[quizStep] = e.target.value; setQuizAnswers(n) }}
                        autoFocus
                      />
                      <button onClick={advanceFreeText} className="btn-primary w-full">Next →</button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {quizSteps[quizStep].options!.map((option) => (
                        <button key={option} onClick={() => selectAnswer(option)}
                          className={`w-full text-left p-5 rounded-xl border transition-all duration-300 font-body text-[15px] group ${
                            quizAnswers[quizStep] === option
                              ? 'border-brand-bronze bg-brand-bronze/[0.08] text-brand-cream shadow-lg shadow-brand-bronze/5'
                              : 'border-brand-slate/50 bg-brand-card/50 hover:border-brand-bronze/30 hover:bg-brand-surface text-brand-cream/70 hover:text-brand-cream'
                          }`}>
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-fade-in text-center">
                  {quizResult === 'elite' && (
                    <>
                      <div className="w-16 h-16 rounded-full bg-brand-bronze/10 border-2 border-brand-bronze flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-brand-bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <h2 className="font-headline font-bold text-2xl md:text-3xl mb-4">
                        You&apos;re a strong fit for <span className="text-gradient-bronze">The Presence Protocol</span>.
                      </h2>
                      <p className="font-body text-brand-cream/50 mb-8 max-w-md mx-auto leading-relaxed">
                        Emin reviews all applications personally. Book your Strategy Call below — a no-pressure conversation to see if the fit is right.
                      </p>
                      <div className="glow-card">
                        <div className="glow-card-inner text-center !p-0 overflow-hidden">
                          <div className="p-6 pb-2">
                            <p className="font-headline font-semibold mb-2">Book Your Presence Strategy Call</p>
                            <p className="text-sm text-brand-cream/40 mb-4">30-minute private call with Emin. Not a sales pitch — a strategy session.</p>
                          </div>
                          <iframe
                            src="https://calendly.com/d/ctnj-zk7-psy/strategy-call?hide_gdpr_banner=1&background_color=131313&text_color=F5F1E8&primary_color=C9A961"
                            width="100%"
                            height="650"
                            frameBorder="0"
                            title="Book Strategy Call"
                            className="border-t border-white/5"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 text-xs text-brand-cream/30 mt-4">
                        <span>Limited spots — reviewed weekly</span>
                        <span>·</span>
                        <span>Your information is private</span>
                      </div>
                    </>
                  )}
                  {quizResult === 'community' && (
                    <>
                      <h2 className="font-headline font-bold text-2xl md:text-3xl mb-4">The Inner Circle sounds like the right starting point.</h2>
                      <p className="font-body text-brand-cream/50 mb-8 max-w-md mx-auto">Join a community of driven individuals who are serious about presence.</p>
                      <button className="btn-primary text-lg">Join the Inner Circle →</button>
                    </>
                  )}
                  {(quizResult === 'soft-disqualify' || quizResult === 'hard-disqualify') && (
                    <>
                      <h2 className="font-headline font-bold text-2xl mb-4">
                        {quizResult === 'soft-disqualify' ? 'We appreciate your honesty.' : "Right now might not be the moment — and that's okay."}
                      </h2>
                      <p className="font-body text-brand-cream/50 mb-8 max-w-md mx-auto leading-relaxed">
                        {quizResult === 'soft-disqualify'
                          ? "Drop your email and we'll send you some high-value resources to get started."
                          : "We'll send you some free resources to start building your foundation."}
                      </p>
                      {!nurture.submitted ? (
                        <form onSubmit={(e) => { e.preventDefault(); setNurture({ ...nurture, submitted: true }) }} className="max-w-sm mx-auto space-y-3">
                          <input type="email" className="brand-input" placeholder="Your email address" value={nurture.email} onChange={(e) => setNurture({ ...nurture, email: e.target.value })} required />
                          <button type="submit" className="btn-primary w-full">Send Me Free Resources →</button>
                        </form>
                      ) : (
                        <div className="text-brand-bronze font-headline font-semibold text-lg">✓ You&apos;re in. Check your inbox.</div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    { q: "Is this for me if I'm not a beginner?", a: "Absolutely. Most of our clients have some training experience — they just haven't had programming designed for presence and authority. We meet you where you are." },
    { q: "What does 'elite 1-on-1' actually mean day-to-day?", a: 'Direct access to Emin. Weekly strategy calls, real-time plan adjustments, and a communication channel for questions between sessions. Hands-on coaching, not a PDF and a prayer.' },
    { q: 'How is this different from a normal online coach?', a: "Most online coaches give you a template and check in weekly. The Presence Protocol is architected around your identity transformation — physique, habits, and operating system as one integrated protocol." },
    { q: 'What if I travel constantly or have irregular hours?', a: 'The protocol is built for high-performing people with demanding schedules. We adapt training to hotel gyms, travel days, and time zones. Your plan flexes with your life.' },
    { q: "What's the investment and is there a payment plan?", a: 'The Presence Protocol (Elite) is $3,497 for 16 weeks. The Inner Circle is $1,449. Payment plans available — discussed on your strategy call.' },
    { q: 'How quickly will I see results?', a: "Most clients notice meaningful changes within 3-4 weeks. By week 8, the visual transformation is undeniable. By week 16, it's permanent." },
  ]

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className={`rounded-xl border transition-all duration-300 reveal ${
          open === i ? 'border-brand-bronze/20 bg-brand-card/50' : 'border-brand-card hover:border-brand-slate'
        }`}>
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left group">
            <span className="font-headline font-medium text-[15px] pr-4 group-hover:text-brand-bronze transition-colors">{faq.q}</span>
            <span className={`text-brand-bronze text-xl shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 pb-5 px-5' : 'max-h-0'}`}>
            <p className="font-body text-sm text-brand-cream/50 leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
