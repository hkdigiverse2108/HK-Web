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
    Generates a premium, responsive HTML confirmation email for the applicant
    who submitted the franchise enquiry form.
    Email subject: "Your Inquiry Has Been Submitted — HK DigiVerse LLP"
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
    designation = doc.get("designation", "")
    company = doc.get("company", "")
    strengths = doc.get("strengths", [])
    if isinstance(strengths, list):
        strengths_str = ", ".join(strengths) if strengths else "Technology & Growth"
    else:
        strengths_str = str(strengths)

    ref_short = reference_id[:12] if len(reference_id) > 12 else reference_id
    current_year = datetime.datetime.now().year
    submitted_date = doc.get("created_at", datetime.datetime.now().strftime("%d %b %Y, %I:%M %p"))
    if isinstance(submitted_date, str) and "T" in submitted_date:
        try:
            dt = datetime.datetime.fromisoformat(submitted_date.replace("Z", "+00:00"))
            submitted_date = dt.strftime("%d %b %Y, %I:%M %p")
        except Exception:
            pass

    return f"""<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Inquiry Has Been Submitted — HK DigiVerse LLP</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    /* Reset */
    body, table, td, a {{ -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }}
    table, td {{ mso-table-lspace: 0pt; mso-table-rspace: 0pt; }}
    img {{ -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }}
    body {{
      margin: 0 !important;
      padding: 0 !important;
      background-color: #05080d;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }}
    @media only screen and (max-width: 620px) {{
      .email-container {{ width: 100% !important; max-width: 100% !important; }}
      .responsive-table {{ width: 100% !important; }}
      .mobile-pad {{ padding-left: 20px !important; padding-right: 20px !important; }}
      .mobile-stack {{ display: block !important; width: 100% !important; }}
    }}
  </style>
</head>
<body style="margin:0; padding:0; background-color:#05080d;">

  <!-- Background wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#05080d;">
    <tr>
      <td align="center" style="padding: 30px 12px 50px;">

        <!-- Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="max-width:600px; width:100%; background-color:#0d1117; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.06); box-shadow: 0 20px 60px rgba(0,0,0,0.5);">

          <!-- ===== TOP ACCENT BAR ===== -->
          <tr>
            <td style="height:5px; background: linear-gradient(90deg, #10b981 0%, #06b6d4 35%, #3b82f6 70%, #8b5cf6 100%);"></td>
          </tr>

          <!-- ===== HEADER ===== -->
          <tr>
            <td style="background: linear-gradient(145deg, #0c1524 0%, #111d2e 50%, #0a1628 100%); padding: 36px 32px 30px; border-bottom: 1px solid rgba(255,255,255,0.05);" class="mobile-pad">

              <!-- Success Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; padding: 5px 14px;">
                    <span style="font-size:11px; font-weight:800; color:#34d399; letter-spacing:1.5px; text-transform:uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace;">&#10003; Inquiry Submitted Successfully</span>
                  </td>
                </tr>
              </table>

              <!-- Title -->
              <h1 style="margin:16px 0 0; font-size:24px; font-weight:800; color:#ffffff; letter-spacing:-0.5px; line-height:1.2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                HK DigiVerse LLP — Franchise
              </h1>
              <p style="margin:8px 0 0; font-size:13px; color:#64748b; line-height:1.5;">
                360&deg; Tech &amp; Digital Venture Expansion Network
              </p>
            </td>
          </tr>

          <!-- ===== MAIN CONTENT ===== -->
          <tr>
            <td style="padding: 32px 32px 8px;" class="mobile-pad">

              <!-- Greeting -->
              <p style="margin:0 0 6px; font-size:18px; font-weight:700; color:#f1f5f9;">
                Dear {full_name},
              </p>
              <p style="margin:0 0 28px; font-size:14px; line-height:1.7; color:#94a3b8;">
                Thank you for your interest in the <strong style="color:#e2e8f0;">HK DigiVerse Franchise</strong> program. Your inquiry has been <strong style="color:#34d399;">successfully received</strong> and registered in our system. Our franchise partnership team will review your profile within <strong style="color:#e2e8f0;">24–48 business hours</strong>.
              </p>

              <!-- ===== INQUIRY SUMMARY CARD ===== -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#080d14; border:1px solid rgba(255,255,255,0.07); border-radius:12px; overflow:hidden; margin-bottom:28px;">
                <!-- Card Header -->
                <tr>
                  <td style="padding:14px 20px; background:rgba(56,189,248,0.06); border-bottom:1px solid rgba(255,255,255,0.05);">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td>
                          <span style="font-size:11px; font-weight:800; color:#38bdf8; letter-spacing:1px; text-transform:uppercase; font-family: monospace;">Inquiry Summary</span>
                        </td>
                        <td align="right">
                          <span style="font-size:11px; font-weight:600; color:#475569; font-family:monospace;">Ref: #{ref_short}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Card Body -->
                <tr>
                  <td style="padding:16px 20px 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:8px 0; font-size:13px; color:#64748b; width:40%; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Applicant Name</td>
                        <td style="padding:8px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{full_name}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; font-size:13px; color:#64748b; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Target Territory</td>
                        <td style="padding:8px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{city}, {state} ({market_type})</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; font-size:13px; color:#64748b; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Planned Investment</td>
                        <td style="padding:8px 0; font-size:13px; color:#34d399; font-weight:700; border-bottom:1px solid rgba(255,255,255,0.04);">{investment}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; font-size:13px; color:#64748b; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Launch Timeline</td>
                        <td style="padding:8px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{timeline}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; font-size:13px; color:#64748b; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Registered Email</td>
                        <td style="padding:8px 0; font-size:13px; color:#38bdf8; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{email}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; font-size:13px; color:#64748b; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Mobile Number</td>
                        <td style="padding:8px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{phone}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; font-size:13px; color:#64748b; font-weight:500;">Focus Areas</td>
                        <td style="padding:8px 0; font-size:13px; color:#f1f5f9; font-weight:600;">{strengths_str}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ===== NEXT STEPS ===== -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(15,23,42,0.6); border-left:4px solid #3b82f6; border-radius:0 10px 10px 0; margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 14px; font-size:12px; font-weight:800; color:#60a5fa; letter-spacing:1px; text-transform:uppercase;">What Happens Next?</p>

                    <!-- Step 1 -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:12px;">
                      <tr>
                        <td valign="top" style="padding-right:12px;">
                          <div style="width:24px; height:24px; background:linear-gradient(135deg,#3b82f6,#2563eb); border-radius:50%; text-align:center; line-height:24px; font-size:11px; font-weight:800; color:#ffffff;">1</div>
                        </td>
                        <td style="font-size:13px; color:#cbd5e1; line-height:1.6;">
                          <strong style="color:#e2e8f0;">Profile Review</strong> — Our business team will evaluate your application and territory viability within 24-48 hours.
                        </td>
                      </tr>
                    </table>

                    <!-- Step 2 -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:12px;">
                      <tr>
                        <td valign="top" style="padding-right:12px;">
                          <div style="width:24px; height:24px; background:linear-gradient(135deg,#3b82f6,#2563eb); border-radius:50%; text-align:center; line-height:24px; font-size:11px; font-weight:800; color:#ffffff;">2</div>
                        </td>
                        <td style="font-size:13px; color:#cbd5e1; line-height:1.6;">
                          <strong style="color:#e2e8f0;">Discovery Call</strong> — If qualified, we'll schedule a 1-on-1 strategic briefing with our operations leadership.
                        </td>
                      </tr>
                    </table>

                    <!-- Step 3 -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="top" style="padding-right:12px;">
                          <div style="width:24px; height:24px; background:linear-gradient(135deg,#3b82f6,#2563eb); border-radius:50%; text-align:center; line-height:24px; font-size:11px; font-weight:800; color:#ffffff;">3</div>
                        </td>
                        <td style="font-size:13px; color:#cbd5e1; line-height:1.6;">
                          <strong style="color:#e2e8f0;">Onboarding &amp; Agreement</strong> — Review franchise documentation, projected ROI, and territorial exclusivity terms.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Contact note -->
              <p style="margin:0 0 8px; font-size:13px; color:#94a3b8; line-height:1.6;">
                Have questions? Reply directly to this email or reach us at
                <a href="mailto:hkdigiverse@gmail.com" style="color:#38bdf8; text-decoration:none; font-weight:600;">hkdigiverse@gmail.com</a>
              </p>

            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="background:#060a10; border-top:1px solid rgba(255,255,255,0.05); padding:28px 32px; text-align:center;" class="mobile-pad">

              <!-- Company Name -->
              <p style="margin:0 0 6px; font-size:14px; font-weight:800; color:#e2e8f0; letter-spacing:0.5px;">
                HariKrushn Digiverse LLP
              </p>
              <p style="margin:0 0 14px; font-size:12px; color:#64748b; line-height:1.5;">
                Empowering Modern Enterprises with Digital, Tech &amp; Creative Ecosystems.
              </p>

              <!-- Links -->
              <p style="margin:0 0 16px; font-size:12px; color:#475569;">
                <a href="https://hkdigiverse.com" target="_blank" style="color:#38bdf8; text-decoration:none;">hkdigiverse.com</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:hkdigiverse@gmail.com" style="color:#38bdf8; text-decoration:none;">hkdigiverse@gmail.com</a>
              </p>

              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="80" style="margin:0 auto 14px;">
                <tr><td style="height:1px; background:rgba(255,255,255,0.08);"></td></tr>
              </table>

              <p style="margin:0; font-size:11px; color:#374151;">
                &copy; {current_year} HariKrushn Digiverse LLP. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Email Container -->

      </td>
    </tr>
  </table>

</body>
</html>"""


def get_admin_notification_html(doc: dict) -> str:
    """
    Generates a detailed executive notification email sent to the HK DigiVerse Admin Team.
    Email subject: "New Franchise Inquiry Arrived — [Applicant Name] ([City])"
    Sent to: hrmangukiya3494@gmail.com
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

    # Format date nicely
    display_date = created_at
    if isinstance(created_at, str) and "T" in created_at:
        try:
            dt = datetime.datetime.fromisoformat(created_at.replace("Z", "+00:00"))
            display_date = dt.strftime("%d %b %Y, %I:%M %p")
        except Exception:
            display_date = created_at

    current_year = datetime.datetime.now().year

    designation_line = f"{designation}"
    if company and company != "Not Specified":
        designation_line += f" at {company}"

    return f"""<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Franchise Inquiry Arrived — {full_name}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    body, table, td, a {{ -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }}
    table, td {{ mso-table-lspace: 0pt; mso-table-rspace: 0pt; }}
    img {{ -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }}
    body {{
      margin: 0 !important;
      padding: 0 !important;
      background-color: #030712;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }}
    @media only screen and (max-width: 670px) {{
      .email-container {{ width: 100% !important; max-width: 100% !important; }}
      .mobile-pad {{ padding-left: 18px !important; padding-right: 18px !important; }}
      .mobile-stack {{ display: block !important; width: 100% !important; }}
      .mobile-center {{ text-align: center !important; }}
    }}
  </style>
</head>
<body style="margin:0; padding:0; background-color:#030712;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#030712;">
    <tr>
      <td align="center" style="padding: 25px 12px 45px;">

        <!-- Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="650" class="email-container" style="max-width:650px; width:100%; background-color:#111827; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,0.06); box-shadow: 0 16px 50px rgba(0,0,0,0.6);">

          <!-- ===== URGENT TOP BAR ===== -->
          <tr>
            <td style="height:6px; background: linear-gradient(90deg, #ef4444 0%, #f97316 40%, #eab308 80%, #ef4444 100%);"></td>
          </tr>

          <!-- ===== HEADER ===== -->
          <tr>
            <td style="background:#0f1729; padding:26px 30px 22px; border-bottom:1px solid rgba(255,255,255,0.06);" class="mobile-pad">

              <!-- Alert Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:14px;">
                <tr>
                  <td style="background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:5px 14px;">
                    <span style="font-size:11px; font-weight:800; color:#f87171; letter-spacing:1.2px; text-transform:uppercase; font-family:monospace;">&#128680; New Franchise Inquiry Arrived</span>
                  </td>
                </tr>
              </table>

              <!-- Title -->
              <h1 style="margin:0 0 4px; font-size:22px; font-weight:800; color:#ffffff; letter-spacing:-0.3px; line-height:1.3;">
                {full_name}
              </h1>
              <p style="margin:0; font-size:12px; color:#9ca3af;">
                Received: {display_date} &bull; Ref ID: #{reference_id}
              </p>
            </td>
          </tr>

          <!-- ===== HIGHLIGHT CARD ===== -->
          <tr>
            <td style="padding:24px 30px 0;" class="mobile-pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:linear-gradient(135deg, rgba(30,58,138,0.25), rgba(15,23,42,0.5)); border:1px solid rgba(59,130,246,0.2); border-radius:12px; overflow:hidden;">
                <tr>
                  <td style="padding:18px 22px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-size:16px; font-weight:700; color:#ffffff;">
                          {full_name}
                          <span style="color:#94a3b8; font-weight:400; font-size:13px;"> &mdash; {city}, {state}</span>
                        </td>
                        <td align="right" style="font-size:16px; font-weight:800; color:#34d399;">
                          {investment}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:12px; color:#93c5fd; padding-top:6px;">
                          {designation_line}
                        </td>
                        <td align="right" style="font-size:12px; color:#cbd5e1; padding-top:6px;">
                          Timeline: <strong>{timeline}</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== QUICK ACTIONS ===== -->
          <tr>
            <td align="center" style="padding:22px 30px 4px;" class="mobile-pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="mailto:{email}?subject=HK%20DigiVerse%20Franchise%20Application%20Follow-up" style="display:inline-block; background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#ffffff !important; padding:11px 22px; border-radius:8px; font-size:13px; font-weight:700; text-decoration:none; letter-spacing:0.3px;">
                      &#9993; Reply to {full_name}
                    </a>
                  </td>
                  <td>
                    <a href="tel:{phone}" style="display:inline-block; background:linear-gradient(135deg,#059669,#047857); color:#ffffff !important; padding:11px 22px; border-radius:8px; font-size:13px; font-weight:700; text-decoration:none; letter-spacing:0.3px;">
                      &#128222; Call {phone}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== SECTION 1: CONTACT DETAILS ===== -->
          <tr>
            <td style="padding:26px 30px 0;" class="mobile-pad">

              <!-- Section Header -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                <tr>
                  <td>
                    <span style="font-size:11px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:#60a5fa; font-family:monospace;">01 &mdash; Applicant &amp; Contact Details</span>
                  </td>
                </tr>
              </table>

              <!-- Data Table -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; width:38%; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Full Name</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{full_name}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Designation</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{designation}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Company / Business</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{company}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Email Address</td>
                  <td style="padding:9px 0; font-size:13px; border-bottom:1px solid rgba(255,255,255,0.04);">
                    <a href="mailto:{email}" style="color:#38bdf8; text-decoration:none; font-weight:600;">{email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; font-weight:500;">Mobile Number</td>
                  <td style="padding:9px 0; font-size:13px;">
                    <a href="tel:{phone}" style="color:#34d399; text-decoration:none; font-weight:600;">{phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== SECTION 2: LOCATION & SETUP ===== -->
          <tr>
            <td style="padding:26px 30px 0;" class="mobile-pad">

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                <tr>
                  <td>
                    <span style="font-size:11px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:#60a5fa; font-family:monospace;">02 &mdash; Target Location &amp; Setup</span>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; width:38%; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Target City &amp; State</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{city}, {state}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Market Classification</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{market_type}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; font-weight:500;">Office Infrastructure</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600;">{office}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== SECTION 3: PROFILE & STRENGTHS ===== -->
          <tr>
            <td style="padding:26px 30px 0;" class="mobile-pad">

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                <tr>
                  <td>
                    <span style="font-size:11px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:#60a5fa; font-family:monospace;">03 &mdash; Business Profile &amp; Strengths</span>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; width:38%; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Years of Experience</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{experience}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Current Team Size</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{team}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; font-weight:500;">Core Strengths</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600;">{strengths_str}</td>
                </tr>
              </table>

              <!-- Background Box -->
              <p style="margin:16px 0 4px; font-size:11px; font-weight:700; color:#94a3b8; letter-spacing:0.5px; text-transform:uppercase;">Professional Background:</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background:#080d14; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:14px 16px; font-size:13px; color:#cbd5e1; line-height:1.6;">
                    {background}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== SECTION 4: INVESTMENT & GOALS ===== -->
          <tr>
            <td style="padding:26px 30px 0;" class="mobile-pad">

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
                <tr>
                  <td>
                    <span style="font-size:11px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:#60a5fa; font-family:monospace;">04 &mdash; Investment &amp; Business Goals</span>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; width:38%; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Investment Capacity</td>
                  <td style="padding:9px 0; font-size:13px; color:#34d399; font-weight:700; border-bottom:1px solid rgba(255,255,255,0.04);">{investment}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; border-bottom:1px solid rgba(255,255,255,0.04); font-weight:500;">Launch Timeline</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04);">{timeline}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; font-size:13px; color:#94a3b8; font-weight:500;">Acquisition Source</td>
                  <td style="padding:9px 0; font-size:13px; color:#f1f5f9; font-weight:600;">{source}</td>
                </tr>
              </table>

              <!-- Goals Box -->
              <p style="margin:16px 0 4px; font-size:11px; font-weight:700; color:#94a3b8; letter-spacing:0.5px; text-transform:uppercase;">Applicant's Goals &amp; Vision:</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background:#080d14; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:14px 16px; font-size:13px; color:#cbd5e1; line-height:1.6;">
                    {goals}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="padding:30px 30px 24px; background:#080c14; border-top:1px solid rgba(255,255,255,0.05); text-align:center; margin-top:24px;" class="mobile-pad">
              <p style="margin:0 0 4px; font-size:11px; color:#6b7280;">
                Internal automated alert &bull; <strong style="color:#9ca3af;">HariKrushn Digiverse LLP Platform</strong>
              </p>
              <p style="margin:0; font-size:11px; color:#4b5563;">
                Record ID: {reference_id} &bull; {display_date}
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="60" style="margin:12px auto 0;">
                <tr><td style="height:1px; background:rgba(255,255,255,0.06);"></td></tr>
              </table>
              <p style="margin:10px 0 0; font-size:10px; color:#374151;">
                &copy; {current_year} HariKrushn Digiverse LLP. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Email Container -->

      </td>
    </tr>
  </table>

</body>
</html>"""


def handle_franchise_submission_emails(doc: dict):
    """
    Orchestrates sending both franchise emails:
    1. Confirmation email to the applicant → "Your Inquiry Has Been Submitted"
    2. Notification email to admin (hrmangukiya3494@gmail.com) → "New Franchise Inquiry Arrived"
    
    Only for the Franchise form — no other forms send emails.
    Sends both concurrently in parallel for maximum speed.
    """
    import threading

    applicant_email = (doc.get("email") or "").strip()
    admin_email = os.getenv("ADMIN_NOTIFICATION_EMAIL") or getattr(settings, "ADMIN_NOTIFICATION_EMAIL", "hrmangukiya3494@gmail.com") or "hrmangukiya3494@gmail.com"
    full_name = doc.get("fullName") or doc.get("name") or "Prospective Partner"
    city = doc.get("city") or "New Territory"

    def _send_applicant():
        """Send confirmation email to the person who filled up the franchise form."""
        try:
            if applicant_email and "@" in applicant_email:
                applicant_subject = f"Your Inquiry Has Been Submitted — HK DigiVerse LLP"
                applicant_html = get_applicant_confirmation_html(doc)
                result = send_smtp_email(to_email=applicant_email, subject=applicant_subject, html_body=applicant_html)
                if result:
                    print(f"[Franchise Email] ✓ Applicant confirmation sent to: {applicant_email}")
                else:
                    print(f"[Franchise Email] ✗ Failed to send applicant confirmation to: {applicant_email}")
            else:
                print(f"[Franchise Email] No valid applicant email found in submission: '{applicant_email}'")
        except Exception as e:
            print(f"[Franchise Email Error] Applicant confirmation email failed: {e}")

    def _send_admin():
        """Send notification email to hrmangukiya3494@gmail.com about new franchise inquiry."""
        try:
            if admin_email and "@" in admin_email:
                admin_subject = f"New Franchise Inquiry Arrived — {full_name} ({city})"
                admin_html = get_admin_notification_html(doc)
                result = send_smtp_email(to_email=admin_email, subject=admin_subject, html_body=admin_html)
                if result:
                    print(f"[Franchise Email] ✓ Admin notification sent to: {admin_email}")
                else:
                    print(f"[Franchise Email] ✗ Failed to send admin notification to: {admin_email}")
            else:
                print(f"[Franchise Email] No valid admin notification email configured: '{admin_email}'")
        except Exception as e:
            print(f"[Franchise Email Error] Admin notification email failed: {e}")

    # Send both emails in parallel
    t1 = threading.Thread(target=_send_applicant, daemon=True)
    t2 = threading.Thread(target=_send_admin, daemon=True)
    t1.start()
    t2.start()
    t1.join(timeout=25)
    t2.join(timeout=25)
    print(f"[Franchise Email] Email dispatch complete for: {full_name} ({applicant_email})")
