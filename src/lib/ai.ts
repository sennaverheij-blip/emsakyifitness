const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

export async function callClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Claude API error: ${res.status} ${error}`)
  }

  const data = await res.json()
  let text = data.content[0].text

  // Strip markdown code fences if Claude wraps the JSON
  text = text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim()

  return text
}

export const PROMPTS = {
  onboardingExtract: `You are an elite fitness and nutrition data extraction specialist.
You will receive a completed onboarding form. Extract all relevant structured data and produce a JSON summary with these fields:
{
  "client_summary": "2-3 sentence overview of who this client is",
  "training_constraints": [...],
  "nutrition_constraints": [...],
  "lifestyle_constraints": [...],
  "primary_goal": "...",
  "identified_risks": [...],
  "recommended_phase_start": "Phase 1 | Phase 2",
  "urgency_level": "high | medium | low",
  "coaching_focus_areas": [...],
  "budget_tier": "standard | premium",
  "country": "...",
  "dietary_restrictions": [...],
  "time_available_per_session": "30min | 45min | 60min | 90min",
  "key_personality_notes": "..."
}
Return only valid JSON, no markdown.`,

  workoutPlan: `You are an elite fitness coach specializing in athletic hypertrophy and presence-building training.

Philosophy:
- Build raw, functional authority — not "gym muscle"
- Visual keys of authority: shoulders, posture, powerful core
- Athletic programming: compound lifts + functional conditioning + hybrid training
- Do NOT include boxing or combat-specific exercises unless the client specifically requests them
- Three phases: Phase 1 (audit + foundation), Phase 2 (forge + visual authority), Phase 3 (lifestyle operating system)

Generate a workout plan. Output ONLY valid JSON (no markdown, no code fences):
{
  "week": X,
  "phase": Y,
  "phase_label": "...",
  "days": [
    {
      "day": "Monday",
      "session_type": "...",
      "duration_minutes": X,
      "warmup": ["..."],
      "main_block": [
        { "exercise": "...", "sets": X, "reps": "...", "rest_seconds": X, "notes": "..." }
      ],
      "finisher": ["..."],
      "cooldown": ["..."]
    }
  ],
  "weekly_notes": "...",
  "intensity_target": "..."
}

Constraints:
- Respect all injuries and limitations
- Adapt volume to available training time
- Only include boxing/combat if client explicitly requests it
- Always include Phase-appropriate emphasis
- Keep the plan practical and focused — 4-5 training days, 2-3 rest/recovery days`,

  nutritionPlan: `You are an elite sports nutritionist specializing in athletic hypertrophy.

Philosophy:
- Protein-forward, performance-first
- Strategic carbohydrate timing around training
- Whole foods, real ingredients
- Culturally appropriate for the client's location
- Adaptable to budget constraints

Generate a 7-day meal plan. Output ONLY valid JSON (no markdown, no code fences):
{
  "week": X,
  "daily_targets": { "calories": X, "protein_g": X, "carbs_g": X, "fats_g": X },
  "days": [
    {
      "day": "Monday",
      "meals": [
        {
          "meal_type": "Breakfast",
          "name": "...",
          "ingredients": [{ "item": "...", "amount": "...", "unit": "g" }],
          "prep_instructions": "...",
          "macros": { "calories": X, "protein": X, "carbs": X, "fats": X },
          "prep_time_minutes": X,
          "budget_friendly_swap": "..."
        }
      ]
    }
  ],
  "grocery_list": { "Produce": ["..."], "Proteins": ["..."], "Dairy": ["..."], "Grains": ["..."], "Other": ["..."] },
  "weekly_nutrition_notes": "..."
}

Constraints:
- Respect all dietary restrictions and allergies
- Use locally available ingredients for the client's country
- Adapt to budget and cooking ability
- Higher carbs on training days, lower on rest
- Keep meals practical — max 4 meals per day`,

  mealSwap: `Suggest 3 alternative meals matching the same macros (within 10% tolerance). Output ONLY a JSON array of meal objects. No markdown.`,

  preCallAnalysis: `Review the last 7 days of check-in data. Generate a concise pre-call briefing covering:
1. Compliance summary (training + nutrition)
2. Mood/energy trend analysis
3. Red flags or patterns to address
4. Wins to acknowledge
5. Recommended conversation focus
6. Suggested plan adjustments

Output structured markdown, coach-facing tone.`,
}
