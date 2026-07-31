import os
import sys
import json
import re
from dotenv import load_dotenv

sys.path.append(r'd:\HK WEBSITE\backend')

try:
    from pymongo import MongoClient
except ImportError:
    print("pymongo not found")
    sys.exit(1)

load_dotenv()
uri = os.getenv("MONGODB_URI")
if not uri:
    print("MONGODB_URI not found.")
    sys.exit(1)

client = MongoClient(uri)
db = client["hk_digiverse"]

def replace_strings(d):
    changed = False
    if isinstance(d, dict):
        for k, v in d.items():
            if isinstance(v, str):
                new_v = v.replace('/images/', '/media/images/').replace('/uploads/', '/media/uploads/')
                if new_v != v:
                    d[k] = new_v
                    changed = True
            elif isinstance(v, (dict, list)):
                if replace_strings(v):
                    changed = True
    elif isinstance(d, list):
        for i, v in enumerate(d):
            if isinstance(v, str):
                new_v = v.replace('/images/', '/media/images/').replace('/uploads/', '/media/uploads/')
                if new_v != v:
                    d[i] = new_v
                    changed = True
            elif isinstance(v, (dict, list)):
                if replace_strings(v):
                    changed = True
    return changed

collections = db.list_collection_names()
for coll_name in collections:
    collection = db[coll_name]
    docs = list(collection.find({}))
    updated_count = 0
    for doc in docs:
        if replace_strings(doc):
            collection.replace_one({'_id': doc['_id']}, doc)
            updated_count += 1
    if updated_count > 0:
        print(f"Updated {updated_count} documents in '{coll_name}'")

print("MongoDB full update complete.")
