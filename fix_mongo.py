import os
import sys
import json
from dotenv import load_dotenv

sys.path.append(r'd:\HK WEBSITE\backend')
from pymongo import MongoClient

load_dotenv()
uri = os.getenv("MONGODB_URI")
client = MongoClient(uri)
db = client["hk_digiverse"]

def fix_strings(d):
    changed = False
    if isinstance(d, dict):
        for k, v in d.items():
            if isinstance(v, str):
                new_v = v.replace('/media/images/media/uploads/', '/media/images/uploads/')
                if new_v != v:
                    d[k] = new_v
                    changed = True
            elif isinstance(v, (dict, list)):
                if fix_strings(v):
                    changed = True
    elif isinstance(d, list):
        for i, v in enumerate(d):
            if isinstance(v, str):
                new_v = v.replace('/media/images/media/uploads/', '/media/images/uploads/')
                if new_v != v:
                    d[i] = new_v
                    changed = True
            elif isinstance(v, (dict, list)):
                if fix_strings(v):
                    changed = True
    return changed

collections = db.list_collection_names()
for coll_name in collections:
    collection = db[coll_name]
    docs = list(collection.find({}))
    updated = 0
    for doc in docs:
        if fix_strings(doc):
            collection.replace_one({'_id': doc['_id']}, doc)
            updated += 1
    if updated > 0:
        print(f"Fixed {updated} in {coll_name}")
        
print("MongoDB fix complete.")
