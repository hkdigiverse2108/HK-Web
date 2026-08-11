import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
uri = os.getenv("MONGODB_URI")
if not uri:
    print("No MongoDB URI found, skipping database update.")
    sys.exit(0)

try:
    client = MongoClient(uri)
    db = client["hk_digiverse"]
    collection = db["site_content"]
    
    # In MongoDB it might be stored by identifier, like identifier="draft_content" or "published_content"
    # Let's see what documents exist
    docs = collection.find({})
    count = 0
    for doc in docs:
        if "hero" in doc:
            # Modify the hero dictionary directly
            hero_data = doc["hero"]
            hero_data["frameCount"] = 792
            hero_data["mobileFrameCount"] = 868
            
            collection.update_one(
                {"_id": doc["_id"]},
                {"$set": {"hero": hero_data}}
            )
            count += 1
            print(f"Updated document with _id: {doc['_id']}")
    
    if count == 0:
        print("No document containing 'hero' was found. Assuming DEFAULT_CONTENT will be used.")
        
except Exception as e:
    print(f"MongoDB update failed: {e}")
