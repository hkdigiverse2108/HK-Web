import os
import json
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
uri = os.getenv("MONGODB_URI")
if not uri:
    print("MONGODB_URI not found.")
    exit(1)

client = MongoClient(uri)
db = client.get_database() # or client.get_default_database()
if 'content_main' not in db.list_collection_names():
    print("Collection 'content_main' not found.")
    exit(1)

def update_collection(collection_name):
    collection = db[collection_name]
    doc = collection.find_one({})
    if not doc:
        print(f"No doc in {collection_name}")
        return
    
    doc_str = json.dumps(doc, default=str)
    doc_str = doc_str.replace('/images/', '/media/images/')
    doc_str = doc_str.replace('/uploads/', '/media/uploads/')
    
    # Needs to handle ObjectIds when loading back, so let's just do an update query
    # Instead of json dumps, let's write a recursive dict updater
    def replace_strings(d):
        if isinstance(d, dict):
            for k, v in d.items():
                if isinstance(v, str):
                    d[k] = v.replace('/images/', '/media/images/').replace('/uploads/', '/media/uploads/')
                else:
                    replace_strings(v)
        elif isinstance(d, list):
            for i, v in enumerate(d):
                if isinstance(v, str):
                    d[i] = v.replace('/images/', '/media/images/').replace('/uploads/', '/media/uploads/')
                else:
                    replace_strings(v)
    
    replace_strings(doc)
    collection.replace_one({'_id': doc['_id']}, doc)
    print(f"Updated {collection_name}")

update_collection('content_main')
update_collection('content_drafts')
print("MongoDB update complete.")
