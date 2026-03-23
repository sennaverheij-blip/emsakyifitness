import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not set')
  return new Resend(key)
}

const FROM = process.env.EMAIL_FROM || 'The Presence Protocol <onboarding@resend.dev>'

export async function sendOnboardingEmail(to: string, clientName: string, onboardingUrl: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Your Presence Protocol begins here, ${clientName}`,
    html: `
      <div style="background:#0A0A0A;color:#F5F1E8;font-family:'Helvetica Neue',Arial,sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:24px;font-weight:700;letter-spacing:2px;margin:0;">
            <span style="color:#C9A961;">EMSAKYI</span>FITNESS
          </h1>
          <p style="color:#C9A961;font-style:italic;margin-top:4px;font-size:14px;">The Presence Protocol</p>
        </div>

        <div style="background:#1A1A1A;border-left:4px solid #C9A961;border-radius:0 8px 8px 0;padding:32px;margin-bottom:32px;">
          <h2 style="font-size:20px;margin:0 0 12px;">Welcome, ${clientName}.</h2>
          <p style="color:#F5F1E8CC;line-height:1.7;margin:0 0 20px;">
            Your transformation starts now. Before we build your personalised protocol, we need to understand exactly where you are — physically, mentally, and in your lifestyle.
          </p>
          <p style="color:#F5F1E8CC;line-height:1.7;margin:0 0 24px;">
            Complete the onboarding form below. It takes about 15 minutes. Be honest — the more we know, the better your protocol will be.
          </p>
          <a href="${onboardingUrl}" style="display:inline-block;background:linear-gradient(135deg,#C9A961,#D4AF37);color:#0A0A0A;font-weight:700;text-decoration:none;padding:16px 32px;border-radius:50px;font-size:16px;letter-spacing:0.5px;">
            COMPLETE YOUR ONBOARDING →
          </a>
        </div>

        <div style="background:#1A1A1A;border-radius:8px;padding:24px;margin-bottom:32px;">
          <p style="color:#C9A961;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">What happens next</p>
          <ol style="color:#F5F1E899;line-height:1.8;margin:0;padding-left:20px;">
            <li>Complete the onboarding form (15 min)</li>
            <li>Emin reviews your responses personally</li>
            <li>Your bespoke training & nutrition plans are built</li>
            <li>You receive access to the portal within 24 hours</li>
          </ol>
        </div>

        <p style="color:#F5F1E866;font-size:12px;text-align:center;">
          Please complete this within 48 hours. If you have questions, reply to this email.
        </p>

        <div style="border-top:1px solid #2A2A2A;margin-top:32px;padding-top:20px;text-align:center;">
          <p style="color:#F5F1E833;font-size:11px;margin:0;">© ${new Date().getFullYear()} emsakyifitness · The Presence Protocol</p>
        </div>
      </div>
    `,
  })
}

export async function sendPlanReadyEmail(to: string, clientName: string, loginUrl: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Your protocol is ready. ${clientName}, enter the system.`,
    html: `
      <div style="background:#0A0A0A;color:#F5F1E8;font-family:'Helvetica Neue',Arial,sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:24px;font-weight:700;letter-spacing:2px;margin:0;">
            <span style="color:#C9A961;">EMSAKYI</span>FITNESS
          </h1>
        </div>
        <div style="background:#1A1A1A;border-left:4px solid #C9A961;border-radius:0 8px 8px 0;padding:32px;">
          <h2 style="font-size:20px;margin:0 0 12px;">Your protocol is live, ${clientName}.</h2>
          <p style="color:#F5F1E8CC;line-height:1.7;margin:0 0 24px;">
            Your personalised training and nutrition plans are ready. Log in to the portal to see your full protocol.
          </p>
          <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#C9A961,#D4AF37);color:#0A0A0A;font-weight:700;text-decoration:none;padding:16px 32px;border-radius:50px;font-size:16px;">
            ENTER THE PROTOCOL →
          </a>
        </div>
        <div style="border-top:1px solid #2A2A2A;margin-top:32px;padding-top:20px;text-align:center;">
          <p style="color:#F5F1E833;font-size:11px;margin:0;">© ${new Date().getFullYear()} emsakyifitness</p>
        </div>
      </div>
    `,
  })
}

export async function sendCheckInReminder(to: string, clientName: string, logUrl: string) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Quick check-in — 5 minutes, ${clientName}`,
    html: `
      <div style="background:#0A0A0A;color:#F5F1E8;font-family:'Helvetica Neue',Arial,sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="font-size:20px;font-weight:700;letter-spacing:2px;margin:0;">
            <span style="color:#C9A961;">EMSAKYI</span>FITNESS
          </h1>
        </div>
        <div style="background:#1A1A1A;border-left:4px solid #C9A961;border-radius:0 8px 8px 0;padding:24px;">
          <p style="color:#F5F1E8CC;line-height:1.7;margin:0 0 16px;">
            Hey ${clientName} — we haven't heard from you today. A quick check-in keeps your coach informed and your momentum going.
          </p>
          <a href="${logUrl}" style="display:inline-block;background:linear-gradient(135deg,#C9A961,#D4AF37);color:#0A0A0A;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:50px;font-size:14px;">
            LOG TODAY'S CHECK-IN →
          </a>
        </div>
        <p style="color:#F5F1E844;font-size:11px;text-align:center;margin-top:24px;">Takes less than 5 minutes.</p>
      </div>
    `,
  })
}
