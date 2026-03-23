'use client'

import { useState, useEffect, useCallback } from 'react'
import { useReveal } from '@/lib/useReveal'

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
    question: 'What\'s your primary objective over the next 16 weeks?',
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
      '2-4 hours — I\'m time-constrained but committed',
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
   MAIN PAGE COMPONENT
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

  // Disable body scroll when quiz is open
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

    // Auto-advance after 400ms for option-based steps
    if (!quizSteps[quizStep].freeText) {
      setTimeout(() => {
        if (quizStep < 6) {
          setQuizStep(quizStep + 1)
        } else {
          calculateResult(next)
        }
      }, 400)
    }
  }

  const advanceFreeText = () => {
    if (quizStep < 6) {
      setQuizStep(quizStep + 1)
    } else {
      calculateResult(quizAnswers)
    }
  }

  const calculateResult = (answers: (string | null)[]) => {
    const budget = answers[6] || ''
    if (budget.startsWith('$3,500')) setQuizResult('elite')
    else if (budget.startsWith('$1,500')) setQuizResult('community')
    else if (budget.startsWith('$500')) setQuizResult('soft-disqualify')
    else setQuizResult('hard-disqualify')
  }

  return (
    <>
      {/* ====== HEADER ====== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        headerScrolled
          ? 'bg-brand-black/95 backdrop-blur-lg border-b border-brand-card'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-headline font-bold text-xl tracking-widest uppercase text-brand-cream">
            <span className="text-brand-bronze">EMSAKYI</span>FITNESS
          </div>
          <button onClick={openQuiz} className="btn-primary !py-3 !px-6 !text-sm hidden sm:inline-flex">
            Apply Now
          </button>
        </div>
      </header>

      <main>
        {/* ====== HERO ====== */}
        <section id="vsl" className="relative min-h-screen flex items-center pt-24 pb-20">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-bronze/5 blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <h1 className="font-headline text-[clamp(2.4rem,5.5vw,3.6rem)] font-bold leading-[1.08] mb-6 reveal">
                  The People Who Command{' '}
                  <span className="text-brand-bronze">Every Room They Enter.</span>
                </h1>

                <p className="font-accent italic text-xl text-brand-cream/70 mb-8 reveal reveal-delay-1">
                  They didn&apos;t get lucky. They engineered their presence.
                </p>

                <div className="text-lg text-brand-cream/80 leading-relaxed mb-10 space-y-4 reveal reveal-delay-2">
                  <p>Most people are background noise in their own lives. Their physique doesn&apos;t match their ambition. Their frame doesn&apos;t carry the weight of who they actually are.</p>
                  <p><strong className="text-brand-cream">The Presence Protocol changes that — permanently.</strong></p>
                </div>

                <button onClick={openQuiz} className="btn-primary text-lg !py-5 !px-10 reveal reveal-delay-3">
                  Watch the Full Breakdown →
                </button>
              </div>

              {/* Right: VSL placeholder */}
              <div className="reveal reveal-delay-2">
                <div className="relative rounded-lg overflow-hidden border border-brand-slate bg-brand-surface shadow-2xl">
                  {/* Bronze corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-bronze z-10" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-bronze z-10" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-bronze z-10" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-bronze z-10" />

                  <div className="aspect-video bg-gradient-to-br from-brand-black to-brand-surface flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-brand-bronze/20 border-2 border-brand-bronze flex items-center justify-center mb-4 hover:scale-110 hover:bg-brand-bronze/30 transition-all duration-300 cursor-pointer">
                      <svg className="w-8 h-8 fill-brand-bronze ml-1" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                    </div>
                    <span className="text-sm text-brand-cream/50 font-body">Watch the full breakdown</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 reveal reveal-delay-4">
              {[
                ['47+', 'Lives Transformed'],
                ['16', 'Week Protocol'],
                ['Elite', '1-on-1 Coaching'],
                ['100%', 'Bespoke'],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="font-headline font-bold text-2xl text-brand-bronze">{num}</div>
                  <div className="text-sm text-brand-cream/50 font-body">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== VSL SECTION ====== */}
        <section className="py-24 border-t border-brand-card">
          <div className="max-w-[880px] mx-auto px-6">
            <p className="text-xs font-headline font-semibold tracking-[3px] uppercase text-brand-bronze mb-8 text-center reveal">
              The Presence Protocol — Full Breakdown
            </p>

            <p className="font-accent italic text-center text-lg text-brand-cream/60 mb-12 max-w-xl mx-auto reveal reveal-delay-1">
              &ldquo;Watch this before you apply. Everything you need to know about what we do, who it&apos;s for, and why it works — is in here.&rdquo;
            </p>

            <div className="text-center reveal reveal-delay-2">
              <button onClick={openQuiz} className="btn-primary text-lg">
                Check If You Qualify →
              </button>
            </div>
          </div>
        </section>

        {/* ====== WHO IS THIS FOR ====== */}
        <section className="py-24 border-t border-brand-card">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-headline text-h2 mb-16 text-center reveal">
              Is The Presence Protocol For You?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Pain column */}
              <div className="reveal">
                <h3 className="font-headline font-semibold text-lg text-brand-cream/60 mb-6 uppercase tracking-wider">Where you are now</h3>
                <div className="space-y-4">
                  {[
                    "You're putting in work but the results don't match",
                    'You walk into rooms and blend into the background',
                    "Your physique doesn't reflect who you know you are",
                    "You're training for aesthetics. You should be training for authority.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 bg-brand-surface rounded border border-brand-card">
                      <span className="text-red-500/70 mt-0.5">✕</span>
                      <span className="text-brand-cream/70 font-body text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gain column */}
              <div className="reveal reveal-delay-2">
                <h3 className="font-headline font-semibold text-lg text-brand-bronze mb-6 uppercase tracking-wider">Where you&apos;ll be</h3>
                <div className="space-y-4">
                  {[
                    'A frame that commands respect before you say a word',
                    'Athletic power built for real life, not just the gym',
                    'A nutrition protocol that fuels performance, not bulk',
                    'A lifestyle operating system you actually own',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 bg-brand-surface rounded border border-brand-card hover:border-brand-bronze/30 transition-colors">
                      <span className="text-brand-bronze mt-0.5">✓</span>
                      <span className="text-brand-cream font-body text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Identity statement */}
            <div className="bg-brand-card border-l-[6px] border-brand-bronze p-8 md:p-10 rounded-r-lg reveal">
              <p className="font-accent italic text-xl md:text-2xl text-brand-cream leading-relaxed">
                &ldquo;I&apos;m not a trainer. I&apos;m the architect of your new presence.
                We don&apos;t count reps. We engineer identity.&rdquo;
              </p>
              <p className="mt-4 text-sm text-brand-bronze font-headline font-semibold tracking-wider">— EMIN</p>
            </div>
          </div>
        </section>

        {/* ====== THREE-PHASE PROTOCOL ====== */}
        <section className="py-24 border-t border-brand-card">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="section-divider section-divider-center reveal">
              <h2 className="font-headline text-h2 text-center mb-4">The Three-Phase Protocol</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  phase: '01',
                  title: 'The Audit',
                  tagline: 'Strip the noise. Set the foundation.',
                  body: 'Audit your lifestyle, nutrition, training, and mindset. Remove the friction. Establish the non-negotiables that mark the beginning of your main character shift.',
                },
                {
                  phase: '02',
                  title: 'The Forge',
                  tagline: 'Build visual authority.',
                  body: 'Heavy, athletic programming targeting the visual keys of authority: shoulders, posture, lean powerful core. Boxing-informed. Hybrid athlete programming. Athletic hypertrophy nutrition.',
                },
                {
                  phase: '03',
                  title: 'The Operating System',
                  tagline: 'Own the identity permanently.',
                  body: 'Transition the high-performance habits from protocol to default. This is the lifestyle operating system — making your new character sustainable, not seasonal.',
                },
              ].map((p, i) => (
                <div key={p.phase} className={`relative bg-brand-card border border-brand-slate rounded-lg p-8 overflow-hidden hover:border-brand-bronze/30 transition-all duration-300 reveal reveal-delay-${i + 1}`}>
                  {/* Large background number */}
                  <span className="absolute top-4 right-4 font-headline font-bold text-[80px] leading-none text-brand-cream/[0.04] select-none">
                    {p.phase}
                  </span>
                  <div className="relative z-10">
                    <p className="text-xs font-headline font-semibold tracking-[3px] uppercase text-brand-bronze mb-3">Phase {p.phase}</p>
                    <h3 className="font-headline font-bold text-xl mb-2">{p.title}</h3>
                    <p className="font-accent italic text-brand-cream/60 mb-4">{p.tagline}</p>
                    <p className="font-body text-sm text-brand-cream/70 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== OFFER OVERVIEW ====== */}
        <section className="py-24 border-t border-brand-card">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Elite */}
              <div className="relative bg-brand-card border-2 border-brand-bronze rounded-lg p-8 reveal shadow-lg shadow-brand-bronze/5">
                <span className="absolute -top-3 left-6 bg-brand-bronze text-brand-black text-xs font-headline font-bold px-3 py-1 rounded tracking-wider uppercase">
                  Most Transformation
                </span>
                <h3 className="font-headline font-bold text-2xl mt-2 mb-1">The Presence Protocol</h3>
                <p className="text-xs text-brand-cream/50 font-body uppercase tracking-wider mb-4">Elite</p>
                <div className="font-headline font-bold text-3xl text-brand-bronze mb-1">$3,497</div>
                <p className="text-sm text-brand-cream/50 mb-6">16-Week Commitment</p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Weekly Command Sessions (1-on-1 strategy calls)',
                    'Identity & Presence Architecture',
                    'Frictionless Implementation Support',
                    'Bespoke Performance Protocols',
                    'Priority "Cornerman" Access (direct line)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm font-body text-brand-cream/80">
                      <span className="text-brand-bronze mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={openQuiz} className="btn-primary w-full">Apply for Elite →</button>
              </div>

              {/* Community */}
              <div className="bg-brand-card border border-brand-slate rounded-lg p-8 reveal reveal-delay-1">
                <h3 className="font-headline font-bold text-2xl mb-1">The Inner Circle</h3>
                <p className="text-xs text-brand-cream/50 font-body uppercase tracking-wider mb-4">Community</p>
                <div className="font-headline font-bold text-3xl text-brand-cream mb-1">$1,449</div>
                <p className="text-sm text-brand-cream/50 mb-6">Ongoing Membership</p>
                <ul className="space-y-3 mb-8">
                  {[
                    'The Presence Blueprint (full vault access)',
                    'Inner Circle Community',
                    'Bi-Weekly Group Command Calls',
                    'Community Leaderboards',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm font-body text-brand-cream/80">
                      <span className="text-brand-bronze mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={openQuiz} className="btn-secondary w-full">Join the Inner Circle →</button>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TESTIMONIALS ====== */}
        <section className="py-24 border-t border-brand-card">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-headline text-h2 text-center mb-16 reveal">
              From Background. <span className="text-brand-bronze">To Main Character.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Sarah, 31',
                  role: 'Entrepreneur',
                  quote: "I walked into a pitch meeting after 12 weeks and my business partner said 'What happened to you?' That's when I knew the protocol was real.",
                },
                {
                  name: 'James, 29',
                  role: 'Software Engineer',
                  quote: "I spent 3 years at the gym with nothing to show for it. Emin restructured everything in week one. By week 8, I didn't recognise myself.",
                },
                {
                  name: 'Priya, 35',
                  role: 'Creative Director',
                  quote: "The Presence Protocol isn't a fitness programme. It's an identity upgrade. My confidence, my frame, my energy — everything shifted.",
                },
              ].map((t, i) => (
                <div key={t.name} className={`brand-card reveal reveal-delay-${i + 1}`}>
                  <div className="text-brand-bronze text-sm mb-3">★★★★★</div>
                  <p className="font-accent italic text-brand-cream/80 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-headline font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-brand-cream/50">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section className="py-24 border-t border-brand-card">
          <div className="max-w-[720px] mx-auto px-6">
            <h2 className="font-headline text-h2 text-center mb-16 reveal">Questions</h2>
            <FAQSection />
          </div>
        </section>

        {/* ====== FINAL CTA ====== */}
        <section className="py-24 border-t border-brand-card bg-brand-card">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <h2 className="font-headline text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight mb-4 reveal">
              Stop being background noise.<br />
              <span className="text-brand-bronze">Start commanding every room you enter.</span>
            </h2>
            <p className="font-accent italic text-brand-cream/60 mb-10 reveal reveal-delay-1">
              Applications are reviewed manually. Not everyone is accepted.
            </p>
            <button onClick={openQuiz} className="btn-primary text-lg reveal reveal-delay-2">
              Apply to The Presence Protocol →
            </button>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="py-8 border-t border-brand-card text-center text-xs text-brand-cream/30 font-body">
        © 2026 emsakyifitness · Privacy · Terms
      </footer>

      {/* ====== QUIZ OVERLAY ====== */}
      {quizOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-black/[0.96] flex flex-col">
          {/* Progress bar */}
          <div className="h-0.5 bg-brand-card w-full">
            <div
              className="h-full bg-brand-bronze transition-all duration-500 ease-out"
              style={{ width: quizResult ? '100%' : `${((quizStep + 1) / 7) * 100}%` }}
            />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            {quizStep > 0 && !quizResult ? (
              <button
                onClick={() => setQuizStep(quizStep - 1)}
                className="text-brand-cream/50 hover:text-brand-cream transition-colors text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>
            ) : (
              <div />
            )}
            {!quizResult && (
              <span className="text-xs text-brand-cream/40 font-headline tracking-wider uppercase">
                Step {quizStep + 1} of 7
              </span>
            )}
            {(quizStep < 3 || quizResult) && (
              <button
                onClick={() => setQuizOpen(false)}
                className="text-brand-cream/40 hover:text-brand-cream transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
            <div className="max-w-[640px] w-full py-8">
              {!quizResult ? (
                /* Question step */
                <div key={quizStep} className="animate-fade-in">
                  <h2 className={`font-headline font-bold text-2xl md:text-3xl mb-3 leading-tight ${
                    quizSteps[quizStep].highlight ? 'border-l-4 border-brand-bronze pl-4' : ''
                  }`}>
                    {quizSteps[quizStep].question}
                  </h2>
                  <p className="font-accent italic text-sm text-brand-cream/40 mb-8">
                    {quizSteps[quizStep].micro}
                  </p>

                  {quizSteps[quizStep].freeText ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        className="brand-input text-lg"
                        placeholder={quizSteps[quizStep].placeholder}
                        value={quizAnswers[quizStep] || ''}
                        onChange={(e) => {
                          const next = [...quizAnswers]
                          next[quizStep] = e.target.value
                          setQuizAnswers(next)
                        }}
                        autoFocus
                      />
                      <button
                        onClick={advanceFreeText}
                        className="btn-primary w-full"
                      >
                        Next →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {quizSteps[quizStep].options!.map((option) => (
                        <button
                          key={option}
                          onClick={() => selectAnswer(option)}
                          className={`w-full text-left p-5 rounded-lg border transition-all duration-200 font-body text-[15px] ${
                            quizAnswers[quizStep] === option
                              ? 'border-brand-bronze bg-brand-bronze/[0.08] text-brand-cream'
                              : 'border-brand-slate bg-brand-card hover:border-brand-bronze/40 hover:bg-brand-surface text-brand-cream/80'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Result state */
                <div className="animate-fade-in text-center">
                  {quizResult === 'elite' && (
                    <>
                      <div className="w-16 h-16 rounded-full bg-brand-bronze/10 border-2 border-brand-bronze flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-brand-bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <h2 className="font-headline font-bold text-2xl md:text-3xl mb-4">
                        You&apos;re a strong fit for <span className="text-brand-bronze">The Presence Protocol</span>.
                      </h2>
                      <p className="font-body text-brand-cream/60 mb-8 max-w-md mx-auto leading-relaxed">
                        Emin reviews all applications personally. Book your Strategy Call below — this is a no-pressure conversation to see if the fit is right on both sides.
                      </p>
                      {/* Calendly placeholder */}
                      <div className="bg-brand-surface border border-brand-card rounded-lg p-8 mb-6">
                        <p className="font-headline font-semibold mb-2">Book Your Presence Strategy Call</p>
                        <p className="text-sm text-brand-cream/50 mb-4">30-minute private call with Emin. Not a sales pitch — a strategy session.</p>
                        <div className="bg-brand-card rounded h-[400px] flex items-center justify-center text-brand-cream/30 text-sm">
                          [Calendly Embed Placeholder]
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 text-xs text-brand-cream/40">
                        <span>🔒 Limited spots — reviewed weekly</span>
                        <span>🔒 Your info is private</span>
                      </div>
                    </>
                  )}

                  {quizResult === 'community' && (
                    <>
                      <h2 className="font-headline font-bold text-2xl md:text-3xl mb-4">
                        The Inner Circle sounds like the right starting point.
                      </h2>
                      <p className="font-body text-brand-cream/60 mb-8 max-w-md mx-auto">
                        Join a community of driven individuals who are serious about presence.
                      </p>
                      <button className="btn-primary text-lg">Join the Inner Circle →</button>
                    </>
                  )}

                  {(quizResult === 'soft-disqualify' || quizResult === 'hard-disqualify') && (
                    <>
                      <h2 className="font-headline font-bold text-2xl mb-4">
                        {quizResult === 'soft-disqualify'
                          ? 'We appreciate your honesty.'
                          : "Right now might not be the moment — and that's okay."}
                      </h2>
                      <p className="font-body text-brand-cream/60 mb-8 max-w-md mx-auto leading-relaxed">
                        {quizResult === 'soft-disqualify'
                          ? "The Presence Protocol is a significant commitment — and we'd rather connect when the timing is right for you. Drop your email and we'll send you some high-value resources."
                          : "We never want someone to overextend financially. We'll send you some free resources to start building your foundation."}
                      </p>
                      {!nurture.submitted ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            setNurture({ ...nurture, submitted: true })
                          }}
                          className="max-w-sm mx-auto space-y-3"
                        >
                          <input
                            type="email"
                            className="brand-input"
                            placeholder="Your email address"
                            value={nurture.email}
                            onChange={(e) => setNurture({ ...nurture, email: e.target.value })}
                            required
                          />
                          <button type="submit" className="btn-primary w-full">
                            Send Me Free Resources →
                          </button>
                        </form>
                      ) : (
                        <div className="text-brand-bronze font-headline font-semibold">
                          ✓ You&apos;re in. Check your inbox.
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ============================================================
   FAQ COMPONENT
   ============================================================ */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: "Is this for me if I'm not a beginner?",
      a: "Absolutely. Most of our clients have some training experience — they just haven't had programming designed for presence and authority. We meet you where you are and build from there.",
    },
    {
      q: "What does 'elite 1-on-1' actually mean day-to-day?",
      a: 'It means you have direct access to Emin. Weekly strategy calls, real-time plan adjustments, and a communication channel for questions between sessions. This is hands-on coaching, not a PDF and a prayer.',
    },
    {
      q: 'How is this different from a normal online coach?',
      a: "Most online coaches give you a template and check in weekly. The Presence Protocol is architected around your identity transformation — not just your macros. We engineer your physique, your habits, and your operating system as one integrated protocol.",
    },
    {
      q: 'What if I travel constantly or have irregular hours?',
      a: 'The protocol is built for high-performing people with demanding schedules. We adapt training to hotel gyms, travel days, and time zones. Your plan flexes with your life — not the other way around.',
    },
    {
      q: "What's the investment and is there a payment plan?",
      a: 'The Presence Protocol (Elite) is $3,497 for the full 16-week commitment. The Inner Circle (Community) is $1,449. Payment plans are available — we discuss options on your strategy call.',
    },
    {
      q: 'How quickly will I see results?',
      a: "Most clients notice meaningful changes within 3-4 weeks — in energy, posture, and how they carry themselves. By week 8, the visual transformation is undeniable. By week 16, it's permanent.",
    },
  ]

  return (
    <div className="divide-y divide-brand-card">
      {faqs.map((faq, i) => (
        <div key={i} className="reveal">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="font-headline font-medium text-[15px] pr-4 group-hover:text-brand-bronze transition-colors">
              {faq.q}
            </span>
            <span className={`text-brand-bronze text-xl shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
            <p className="font-body text-sm text-brand-cream/60 leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
