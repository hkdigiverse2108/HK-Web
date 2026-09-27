import os
import smtplib
import datetime
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr, formatdate, make_msgid
from app.core.config import settings

def send_smtp_email(to_email: str, subject: str, html_body: str, text_body: str = None) -> bool:
    """
    Sends an email via SMTP using settings configured in .env.
    Supports secure TLS, UTF-8 encoded HTML, and fallback plain-text.
    """
    host = settings.SMTP_HOST or os.getenv("SMTP_HOST", "smtp.gmail.com")
    port = int(settings.SMTP_PORT or os.getenv("SMTP_PORT", 587))
    user = settings.SMTP_USER or os.getenv("SMTP_USER", "")
    password = settings.SMTP_PASS or os.getenv("SMTP_PASS", "")
    from_email = settings.SMTP_FROM or settings.FROM_EMAIL or os.getenv("SMTP_FROM", user)

    if not user or not password:
        print(f"[Email Error] SMTP credentials not configured (user='{user}'). Cannot send to {to_email}")
        return False

    if not to_email or "@" not in to_email:
        print(f"[Email Error] Invalid destination email: '{to_email}'")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = Header(subject, "utf-8")
        msg["From"] = formataddr((str(Header("HK DigiVerse LLP", "utf-8")), from_email))
        msg["To"] = to_email
        msg["Date"] = formatdate(localtime=True)
        msg["Message-ID"] = make_msgid(domain="hkdigiverse.com")

        # Plain text fallback
        if not text_body:
            import re
            text_body = re.sub(r"<[^>]+>", " ", html_body)
            text_body = re.sub(r"\s+", " ", text_body).strip()

        msg.attach(MIMEText(text_body, "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        # Connect and authenticate
        server = smtplib.SMTP(host, port, timeout=25)
        server.ehlo()
        if port == 587:
            server.starttls()
            server.ehlo()
        server.login(user, password)
        server.sendmail(from_email, [to_email], msg.as_bytes())
        server.quit()
        print(f"[Email Success] Successfully dispatched email to {to_email}")
        return True
    except Exception as e:
        print(f"[Email Error] Failed to send email to {to_email}: {e}")
        return False


def get_applicant_confirmation_html(doc: dict) -> str:
    """
    Generates a high-end, responsive HTML confirmation email for the applicant.
    """
    full_name = doc.get("fullName") or doc.get("name") or "Valued Partner"
    reference_id = str(doc.get("_id") or doc.get("id") or "HKF-PARTNER")
    city = doc.get("city", "N/A")
    state = doc.get("state", "N/A")
    market_type = doc.get("marketType", "N/A")
    investment = doc.get("investment", "N/A")
    timeline = doc.get("timeline", "N/A")
    phone = doc.get("phone", "N/A")
    email = doc.get("email", "N/A")
    strengths = doc.get("strengths", [])
    if isinstance(strengths, list):
        strengths_str = ", ".join(strengths) if strengths else "Technology & Growth"
    else:
        strengths_str = str(strengths)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Franchise Application Received — HK DigiVerse LLP</title>
  <style>
    body {{
      margin: 0;
      padding: 0;
      background-color: #0b0f19;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
      -webkit-font-smoothing: antialiased;
    }}
    .wrapper {{
      width: 100%;
      table-layout: fixed;
      background-color: #0b0f19;
      padding: 30px 10px 40px;
    }}
    .container {{
      max-width: 600px;
      margin: 0 auto;
      background-color: #111827;
      border: 1px solid #1f293d;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
    }}
    .header {{
      background: linear-gradient(135deg, #090d16 0%, #172554 50%, #064e3b 100%);
      padding: 32px 28px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      text-align: left;
    }}
    .badge {{
      display: inline-block;
      padding: 4px 10px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #34d399;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      border-radius: 4px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }}
    .header-title {{
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }}
    .header-sub {{
      margin: 6px 0 0;
      font-size: 13px;
      color: #94a3b8;
    }}
    .content {{
      padding: 30px 28px;
    }}
    .salutation {{
      font-size: 16px;
      font-weight: 600;
      color: #f8fafc;
      margin-bottom: 12px;
    }}
    .lead-text {{
      font-size: 14px;
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 24px;
    }}
    .card {{
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 10px;
      padding: 18px 20px;
      margin-bottom: 24px;
    }}
    .card-title {{
      font-size: 12px;
      font-weight: 700;
      color: #38bdf8;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 12px;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 8px;
    }}
    .table-details {{
      width: 100%;
      border-collapse: collapse;
    }}
    .table-details td {{
      padding: 7px 0;
      font-size: 13px;
      vertical-align: top;
    }}
    .table-details td.label {{
      color: #64748b;
      width: 42%;
      font-weight: 500;
    }}
    .table-details td.value {{
      color: #f1f5f9;
      font-weight: 600;
    }}
    .steps-box {{
      background: rgba(30, 41, 59, 0.4);
      border-left: 3px solid #38bdf8;
      border-radius: 0 8px 8px 0;
      padding: 16px 18px;
      margin-bottom: 24px;
    }}
    .step-item {{
      margin-bottom: 10px;
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.5;
    }}
    .step-item:last-child {{
      margin-bottom: 0;
    }}
    .step-num {{
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #0284c7;
      color: #ffffff;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      font-size: 11px;
      font-weight: 700;
      margin-right: 8px;
    }}
    .footer {{
      background: #090d16;
      border-top: 1px solid #1e293b;
      padding: 24px 28px;
      font-size: 12px;
      color: #64748b;
      text-align: center;
      line-height: 1.6;
    }}
    .footer a {{
      color: #38bdf8;
      text-decoration: none;
    }}
  </style>
</head>
<body>
  <table class="wrapper" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <span class="badge">Application Received</span>
            <h1 class="header-title">HK DigiVerse LLP — Franchise</h1>
            <p class="header-sub">360° Tech & Digital Venture Expansion Network</p>
          </div>

          <!-- Main Content -->
          <div class="content">
            <div class="salutation">Dear {full_name},</div>
            <p class="lead-text">
              Thank you for expressing your interest in acquiring an <strong>HK DigiVerse Franchise</strong>. We have successfully registered your application. Our franchise partnership division will review your profile to evaluate market viability for your chosen territory.
            </p>

            <!-- Application Snapshot Card -->
            <div class="card">
              <div class="card-title">Enquiry Summary [Ref: #{reference_id[:12] if len(reference_id) > 12 else reference_id}]</div>
              <table class="table-details">
                <tr>
                  <td class="label">Applicant Name</td>
                  <td class="value">{full_name}</td>
                </tr>
                <tr>
                  <td class="label">Target Territory</td>
                  <td class="value">{city}, {state} ({market_type})</td>
                </tr>
                <tr>
                  <td class="label">Planned Investment</td>
                  <td class="value">{investment}</td>
                </tr>
                <tr>
                  <td class="label">Launch Timeline</td>
                  <td class="value">{timeline}</td>
                </tr>
                <tr>
                  <td class="label">Registered Email</td>
                  <td class="value">{email}</td>
                </tr>
                <tr>
                  <td class="label">Mobile Number</td>
                  <td class="value">{phone}</td>
                </tr>
                <tr>
                  <td class="label">Focus Areas</td>
                  <td class="value">{strengths_str}</td>
                </tr>
              </table>
            </div>

            <!-- Next Steps -->
            <div class="steps-box">
              <div style="font-weight:700; color:#38bdf8; font-size:13px; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.5px;">Next Evaluation Steps</div>
              <div class="step-item"><span class="step-num">1</span> <strong>Territory & Profile Screening:</strong> Our business development committee evaluates location density and eligibility within 24-48 business hours.</div>
              <div class="step-item"><span class="step-num">2</span> <strong>Discovery Call:</strong> If qualified, our team will schedule a 1-on-1 strategic briefing session with our operations leadership.</div>
              <div class="step-item"><span class="step-num">3</span> <strong>Commercial Discussion & Onboarding:</strong> Review franchise disclosure documentation, projected ROI models, and territorial exclusivity terms.</div>
            </div>

            <p style="font-size:13px; color:#94a3b8; line-height:1.5; margin:0;">
              If you have any questions or additional business background to share in the meantime, simply reply directly to this email or reach us at <a href="mailto:hkdigiverse@gmail.com" style="color:#38bdf8; text-decoration:none;">hkdigiverse@gmail.com</a>.
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <strong>HariKrushn Digiverse LLP (HK DigiVerse)</strong><br>
            Empowering Modern Enterprises with Digital, Tech & Creative Ecosystems.<br>
            Official Website: <a href="https://hkdigiverse.com" target="_blank">hkdigiverse.com</a> | Inquiries: <a href="mailto:hkdigiverse@gmail.com">hkdigiverse@gmail.com</a><br>
            <span style="font-size:11px; color:#475569; display:inline-block; margin-top:8px;">© 2026 HariKrushn Digiverse LLP. All rights reserved.</span>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>"""


def get_admin_notification_html(doc: dict) -> str:
    """
    Generates a detailed executive notification email sent to the HK DigiVerse Admin Team (hrmangukiya3494@gmail.com).
    """
    full_name = doc.get("fullName") or doc.get("name") or "Unnamed Applicant"
    designation = doc.get("designation") or "Not Specified"
    company = doc.get("company") or "Not Specified"
    email = doc.get("email") or "Not Provided"
    phone = doc.get("phone") or "Not Provided"
    city = doc.get("city") or "Not Specified"
    state = doc.get("state") or "Not Specified"
    market_type = doc.get("marketType") or "Not Specified"
    office = doc.get("office") or "Not Specified"
    experience = doc.get("experience") or "Not Specified"
    team = doc.get("team") or "Not Specified"
    investment = doc.get("investment") or "Not Specified"
    timeline = doc.get("timeline") or "Not Specified"
    background = doc.get("background") or "No background details provided."
    goals = doc.get("goals") or "No goals provided."
    source = doc.get("source") or "Website Direct"
    created_at = doc.get("created_at") or datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    reference_id = str(doc.get("_id") or doc.get("id") or "NEW-INQUIRY")

    strengths = doc.get("strengths", [])
    if isinstance(strengths, list):
        strengths_str = ", ".join(strengths) if strengths else "None selected"
    else:
        strengths_str = str(strengths)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Franchise Enquiry Alert</title>
  <style>
    body {{
      margin: 0;
      padding: 0;
      background-color: #030712;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e5e7eb;
      -webkit-font-smoothing: antialiased;
    }}
    .wrapper {{
      width: 100%;
      background-color: #030712;
      padding: 25px 10px;
    }}
    .container {{
      max-width: 650px;
      margin: 0 auto;
      background-color: #111827;
      border: 1px solid #1f2937;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    }}
    .top-bar {{
      background: linear-gradient(90deg, #dc2626, #ea580c, #f59e0b);
      height: 6px;
      width: 100%;
    }}
    .header {{
      padding: 24px 28px 20px;
      background-color: #131d2e;
      border-bottom: 1px solid #1f2937;
    }}
    .badge {{
      display: inline-block;
      padding: 4px 10px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #f87171;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      border-radius: 4px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }}
    .title {{
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
    }}
    .meta-time {{
      font-size: 12px;
      color: #9ca3af;
      margin-top: 4px;
    }}
    .content {{
      padding: 24px 28px;
    }}
    .highlight-card {{
      background: linear-gradient(135deg, rgba(30, 58, 138, 0.3), rgba(15, 23, 42, 0.6));
      border: 1px solid #2563eb40;
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 22px;
    }}
    .section-title {{
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #60a5fa;
      margin: 20px 0 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid #1f2937;
    }}
    .data-table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }}
    .data-table td {{
      padding: 7px 0;
      font-size: 13px;
      border-bottom: 1px solid #182234;
      vertical-align: top;
    }}
    .data-table td.lbl {{
      color: #94a3b8;
      width: 38%;
      font-weight: 500;
    }}
    .data-table td.val {{
      color: #f1f5f9;
      font-weight: 600;
    }}
    .text-box {{
      background: #0b1120;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 12px 14px;
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 14px;
      white-space: pre-wrap;
    }}
    .cta-row {{
      margin: 24px 0 10px;
      text-align: center;
    }}
    .btn {{
      display: inline-block;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
      margin: 4px 6px;
    }}
    .btn-primary {{
      background: #2563eb;
      color: #ffffff !important;
    }}
    .btn-secondary {{
      background: #10b981;
      color: #ffffff !important;
    }}
    .footer {{
      padding: 18px 28px;
      background-color: #0b0f17;
      border-top: 1px solid #1f2937;
      text-align: center;
      font-size: 11px;
      color: #6b7280;
    }}
  </style>
</head>
<body>
  <table class="wrapper" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <div class="container">
          <div class="top-bar"></div>
          
          <div class="header">
            <span class="badge">🚨 Action Required &bull; New Franchise Application</span>
            <h1 class="title">New Franchise Enquiry: {full_name}</h1>
            <div class="meta-time">Received on: {created_at} &bull; Ref ID: #{reference_id}</div>
          </div>

          <div class="content">
            <!-- Key Highlight Box -->
            <div class="highlight-card">
              <table style="width:100%;">
                <tr>
                  <td style="font-size:15px; font-weight:700; color:#ffffff;">{full_name} ({city}, {state})</td>
                  <td align="right" style="font-size:14px; font-weight:800; color:#34d399;">{investment}</td>
                </tr>
                <tr>
                  <td style="font-size:13px; color:#93c5fd; padding-top:4px;">{designation} {f'at {company}' if company != 'Not Specified' else ''}</td>
                  <td align="right" style="font-size:12px; color:#cbd5e1; padding-top:4px;">Timeline: <strong>{timeline}</strong></td>
                </tr>
              </table>
            </div>

            <!-- Quick Action Buttons -->
            <div class="cta-row">
              <a href="mailto:{email}?subject=HK%20DigiVerse%20Franchise%20Application%20Follow-up" class="btn btn-primary">✉️ Reply to {full_name}</a>
              <a href="tel:{phone}" class="btn btn-secondary">📞 Call {phone}</a>
            </div>

            <!-- Contact Information -->
            <div class="section-title">01. Applicant & Contact Details</div>
            <table class="data-table">
              <tr>
                <td class="lbl">Full Name</td>
                <td class="val">{full_name}</td>
              </tr>
              <tr>
                <td class="lbl">Designation</td>
                <td class="val">{designation}</td>
              </tr>
              <tr>
                <td class="lbl">Company / Business</td>
                <td class="val">{company}</td>
              </tr>
              <tr>
                <td class="lbl">Email Address</td>
                <td class="val"><a href="mailto:{email}" style="color:#38bdf8; text-decoration:none;">{email}</a></td>
              </tr>
              <tr>
                <td class="lbl">Mobile Number</td>
                <td class="val"><a href="tel:{phone}" style="color:#34d399; text-decoration:none;">{phone}</a></td>
              </tr>
            </table>

            <!-- Territory & Market Selection -->
            <div class="section-title">02. Target Location & Setup</div>
            <table class="data-table">
              <tr>
                <td class="lbl">Target City & State</td>
                <td class="val">{city}, {state}</td>
              </tr>
              <tr>
                <td class="lbl">Market Classification</td>
                <td class="val">{market_type}</td>
              </tr>
              <tr>
                <td class="lbl">Office Infrastructure</td>
                <td class="val">{office}</td>
              </tr>
            </table>

            <!-- Profile & Strengths -->
            <div class="section-title">03. Business Profile & Strengths</div>
            <table class="data-table">
              <tr>
                <td class="lbl">Years of Experience</td>
                <td class="val">{experience}</td>
              </tr>
              <tr>
                <td class="lbl">Current Team Size</td>
                <td class="val">{team}</td>
              </tr>
              <tr>
                <td class="lbl">Core Strengths</td>
                <td class="val">{strengths_str}</td>
              </tr>
            </table>

            <div style="font-size:12px; color:#94a3b8; font-weight:600; margin:10px 0 4px;">Professional Background:</div>
            <div class="text-box">{background}</div>

            <!-- Investment & Goals -->
            <div class="section-title">04. Investment & Business Goals</div>
            <table class="data-table">
              <tr>
                <td class="lbl">Investment Capacity</td>
                <td class="val" style="color:#34d399;">{investment}</td>
              </tr>
              <tr>
                <td class="lbl">Launch Timeline</td>
                <td class="val">{timeline}</td>
              </tr>
              <tr>
                <td class="lbl">Acquisition Source</td>
                <td class="val">{source}</td>
              </tr>
            </table>

            <div style="font-size:12px; color:#94a3b8; font-weight:600; margin:10px 0 4px;">Applicant's Goals & Vision:</div>
            <div class="text-box">{goals}</div>
          </div>

          <div class="footer">
            Internal automated alert sent by <strong>HariKrushn Digiverse LLP Platform</strong>.<br>
            Database Record ID: {reference_id} &bull; Timestamp: {created_at}
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>"""


def handle_franchise_submission_emails(doc: dict):
    """
    Orchestrates sending both:
    1. Confirmation email to the applicant (if email provided).
    2. Notification email to the admin team (hrmangukiya3494@gmail.com).
    Sends both concurrently in parallel for maximum speed.
    """
    import threading

    applicant_email = (doc.get("email") or "").strip()
    admin_email = os.getenv("ADMIN_NOTIFICATION_EMAIL") or getattr(settings, "ADMIN_NOTIFICATION_EMAIL", "hrmangukiya3494@gmail.com") or "hrmangukiya3494@gmail.com"
    full_name = doc.get("fullName") or doc.get("name") or "Prospective Partner"
    city = doc.get("city") or "New Territory"

    def _send_applicant():
        try:
            if applicant_email and "@" in applicant_email:
                applicant_subject = f"Franchise Application Received — HK DigiVerse LLP"
                applicant_html = get_applicant_confirmation_html(doc)
                send_smtp_email(to_email=applicant_email, subject=applicant_subject, html_body=applicant_html)
            else:
                print(f"[Franchise Email] No valid applicant email found in submission: '{applicant_email}'")
        except Exception as e:
            print(f"[Franchise Email Error] Applicant confirmation email failed: {e}")

    def _send_admin():
        try:
            if admin_email and "@" in admin_email:
                admin_subject = f"🚨 New Franchise Enquiry: {full_name} ({city})"
                admin_html = get_admin_notification_html(doc)
                send_smtp_email(to_email=admin_email, subject=admin_subject, html_body=admin_html)
            else:
                print(f"[Franchise Email] No valid admin notification email configured: '{admin_email}'")
        except Exception as e:
            print(f"[Franchise Email Error] Admin notification email failed: {e}")

    t1 = threading.Thread(target=_send_applicant, daemon=True)
    t2 = threading.Thread(target=_send_admin, daemon=True)
    t1.start()
    t2.start()
    t1.join(timeout=25)
    t2.join(timeout=25)
