import asyncio
from pymongo import MongoClient
import os

client = MongoClient("mongodb+srv://princehkdigiverse_db_user:root123@cluster0.cwptqdg.mongodb.net/?appName=Cluster0")
for db_name in client.list_database_names():
    if "site_settings" in client[db_name].list_collection_names():
        db = client[db_name]
        break

services = list(db["services_subpages"].find({}))
print("SERVICES FOUND:")
for s in services:
    print(s.get("identifier"), "-", s.get("title"))

industries = list(db["industries"].find({}))
print("\nINDUSTRIES FOUND:")
for i in industries:
    print(i.get("slug"), "-", i.get("title"))

