import os
import re

src_dir = r"d:\HK WEBSITE\frontend\src"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(".jsx"):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace('"/images/', '"/media/images/')
            new_content = new_content.replace("'/images/", "'/media/images/")
            new_content = new_content.replace('"/uploads/', '"/media/uploads/')
            new_content = new_content.replace("'/uploads/", "'/media/uploads/")
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file}")

print("JSX update complete.")
