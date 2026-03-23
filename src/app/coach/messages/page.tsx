export default function CoachMessages() {
  const threads = [
    { name: 'Marcus', lastMsg: 'Just finished Day 1. The overhead press felt heavy but good.', time: '2h ago', unread: true },
    { name: 'James', lastMsg: 'Can we move our call to Thursday?', time: '5h ago', unread: true },
    { name: 'Thomas', lastMsg: 'Thanks for adjusting the meal plan. Much better.', time: '1 day ago', unread: false },
    { name: 'Daniel', lastMsg: 'Sorry for the late check-in. Work has been crazy.', time: '3 days ago', unread: false },
  ]

  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-6">Messages</h1>
      <div className="space-y-2">
        {threads.map((t) => (
          <a key={t.name} href="#" className="flex items-center gap-4 p-4 bg-brand-card border border-brand-slate rounded-lg hover:border-brand-bronze/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-brand-bronze/10 border border-brand-bronze/30 flex items-center justify-center text-sm font-headline font-bold text-brand-bronze shrink-0">
              {t.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-headline font-semibold text-sm">{t.name}</p>
                <span className="text-[10px] text-brand-cream/40 font-body">{t.time}</span>
              </div>
              <p className="text-xs text-brand-cream/50 font-body truncate">{t.lastMsg}</p>
            </div>
            {t.unread && <div className="w-2 h-2 rounded-full bg-brand-bronze shrink-0" />}
          </a>
        ))}
      </div>
    </div>
  )
}
