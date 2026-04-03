'use client'

import React, { useState, useRef, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'email' | 'password' | 'success'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true)
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === 'password') {
      setTimeout(() => passwordRef.current?.focus(), 400)
    }
  }, [step])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setError('')
      setStep('password')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError(res.error === 'CredentialsSignin' ? 'Invalid email or password' : res.error)
      setLoading(false)
      return
    }

    // Trigger success animation
    setReverseCanvasVisible(true)
    setTimeout(() => setInitialCanvasVisible(false), 50)
    setTimeout(() => setStep('success'), 1500)

    // Redirect after animation
    const session = await fetch('/api/auth/session').then(r => r.json())
    const role = session?.user?.role

    setTimeout(() => {
      if (role === 'main-coach') router.push('/admin/dashboard')
      else if (role === 'coach') router.push('/coach/dashboard')
      else router.push('/client/dashboard')
    }, 2500)
  }

  return (
    <div className="flex w-full flex-col min-h-screen bg-brand-black relative">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        {initialCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-brand-black"
              colors={[[201, 169, 97], [212, 175, 55]]}
              dotSize={5}
              reverse={false}
            />
          </div>
        )}
        {reverseCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-brand-black"
              colors={[[201, 169, 97], [212, 175, 55]]}
              dotSize={5}
              reverse={true}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,10,10,1)_0%,_transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-brand-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Logo bar */}
        <div className="flex items-center justify-center pt-10 pb-4">
          <div className="font-headline font-bold text-lg tracking-[0.25em] uppercase">
            <span className="text-brand-bronze">EMSAKYI</span>
            <span className="text-brand-cream/70">FITNESS</span>
          </div>
        </div>

        {/* Form container */}
        <div className="flex-1 flex flex-col justify-center items-center px-6">
          <div className="w-full max-w-sm">
            <AnimatePresence mode="wait">
              {step === 'email' && (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-8 text-center"
                >
                  <div className="space-y-2">
                    <h1 className="text-[2.2rem] font-headline font-bold leading-[1.1] tracking-tight text-brand-cream">
                      Enter The Protocol
                    </h1>
                    <p className="text-lg text-brand-cream/40 font-accent italic">
                      Your transformation starts here
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full backdrop-blur-sm bg-brand-cream/[0.03] text-brand-cream border border-brand-cream/10 rounded-full py-3.5 pl-5 pr-14 focus:outline-none focus:border-brand-bronze/40 text-center font-body transition-colors"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-brand-cream w-10 h-10 flex items-center justify-center rounded-full bg-brand-cream/10 hover:bg-brand-bronze/20 transition-colors group overflow-hidden"
                      >
                        <span className="relative w-full h-full block overflow-hidden">
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full text-brand-bronze">
                            &rarr;
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0 text-brand-bronze">
                            &rarr;
                          </span>
                        </span>
                      </button>
                    </div>
                  </form>

                  <p className="text-xs text-brand-cream/20 pt-8 font-body">
                    First time? Your coach will send you an invite with your credentials.
                  </p>
                </motion.div>
              )}

              {step === 'password' && (
                <motion.div
                  key="password-step"
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="space-y-8 text-center"
                >
                  <div className="space-y-2">
                    <h1 className="text-[2.2rem] font-headline font-bold leading-[1.1] tracking-tight text-brand-cream">
                      Welcome back
                    </h1>
                    <p className="text-base text-brand-cream/40 font-body">
                      {email}
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                      <input
                        ref={passwordRef}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full backdrop-blur-sm bg-brand-cream/[0.03] text-brand-cream border border-brand-cream/10 rounded-full py-3.5 pl-5 pr-14 focus:outline-none focus:border-brand-bronze/40 text-center font-body transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-brand-cream/40 w-10 h-10 flex items-center justify-center rounded-full hover:text-brand-cream/60 transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400/80 font-body"
                      >
                        {error}
                      </motion.p>
                    )}

                    <div className="flex w-full gap-3 pt-2">
                      <motion.button
                        type="button"
                        onClick={() => { setStep('email'); setPassword(''); setError('') }}
                        className="rounded-full bg-brand-cream/10 text-brand-cream font-headline font-semibold text-sm px-6 py-3.5 hover:bg-brand-cream/15 transition-colors uppercase tracking-wider"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-full font-headline font-semibold text-sm py-3.5 uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-brand-bronze to-brand-gold text-brand-black hover:shadow-[0_0_24px_rgba(201,169,97,0.3)] disabled:opacity-60"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading ? 'Authenticating...' : 'Enter'}
                      </motion.button>
                    </div>
                  </form>

                  <p className="text-xs text-brand-cream/20 pt-4 font-body">
                    Forgot your password? Contact your coach.
                  </p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success-step"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                  className="space-y-6 text-center"
                >
                  <div className="space-y-2">
                    <h1 className="text-[2.2rem] font-headline font-bold leading-[1.1] tracking-tight text-brand-cream">
                      You&apos;re in.
                    </h1>
                    <p className="text-base text-brand-cream/40 font-accent italic">
                      The protocol is active
                    </p>
                  </div>

                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="py-8"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-brand-bronze to-brand-gold flex items-center justify-center">
                      <svg className="h-8 w-8 text-brand-black" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-brand-cream/30 font-body"
                  >
                    Redirecting to your portal...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-[11px] text-brand-cream/15 font-body tracking-wider">
            &copy; {new Date().getFullYear()} EMSAKYI FITNESS &middot; The Presence Protocol
          </p>
        </div>
      </div>
    </div>
  )
}
