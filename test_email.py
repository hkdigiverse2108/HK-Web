import os
import sys

# Setup path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "backend"))
sys.path.insert(0, backend_dir)
os.environ["PYTHONPATH"] = backend_dir

from dotenv import load_dotenv
load_dotenv(override=True)

from app.core.email import handle_franchise_submission_emails

doc = {
    "fullName": "Test User",
    "email": "test@hkdigiverse.com",
    "phone": "1234567890",
    "city": "Surat",
    "state": "Gujarat",
    "marketType": "Tier 1",
    "investment": "50L",
    "timeline": "Immediate",
    "strengths": ["Tech", "Sales"]
}

print("Testing email...")
handle_franchise_submission_emails(doc)
print("Done testing.")
