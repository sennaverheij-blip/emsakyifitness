'use client'

import { useState } from 'react'

const demoMessages = [
  { from: 'coach', text: "Welcome to The Presence Protocol, Marcus. I've reviewed your onboarding — let's build something exceptional.", time: 'Mon 09:14' },
  { from: 'client', text: "Thanks Emin, I'm ready. When do I get my training plan?", time: 'Mon 09:22' },
  { from: 'coach', text: "Your plans are live now. Check your Workout and Nutrition tabs. Let me know if any exercises feel unfamiliar — I'll send technique cues.", time: 'Mon 10:01' },
  { from: 'client', text: "Just finished Day 1. The overhead press felt heavy but good. Boxing rounds at the end were killer.", time: 'Mon 18:45' },
  { from: 'coach', text: "That's exactly the response I want. The boxing conditioning will improve fast — your body will adapt within 2 weeks. Keep logging everything.", time: 'Mon 19:12' },
]

export default function MessagesPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(demoMessages)

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { from: 'client', text: input, time: 'Now' }])
    setInput('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-brand-card mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-bronze/10 border border-brand-bronze/30 flex items-center justify-center text-sm font-headline font-bold text-brand-bronze">
          E
        </div>
        <div>
          <p className="font-headline font-semibold text-sm">Emin</p>
          <p className="text-xs text-brand-cream/40 font-body">Your Coach</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-lg px-4 py-3 ${
              msg.from === 'client'
                ? 'bg-brand-bronze/10 border border-brand-bronze/20'
                : 'bg-brand-card border border-brand-slate'
            }`}>
              <p className="text-sm font-body text-brand-cream/90">{msg.text}</p>
              <p className="text-[10px] text-brand-cream/30 font-body mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 pt-4 border-t border-brand-card">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          className="brand-input flex-1"
          placeholder="Type a message..."
        />
        <button onClick={send} className="btn-primary !px-6">Send</button>
      </div>
    </div>
  )
}
