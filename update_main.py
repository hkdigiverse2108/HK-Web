import re
content = open(r'd:\HK WEBSITE\main.py', 'r', encoding='utf-8').read()
content = content.replace('"/images/', '"/media/images/')
content = content.replace("'/images/", "'/media/images/")
content = content.replace('"/uploads/', '"/media/uploads/')
content = content.replace("'/uploads/", "'/media/uploads/")
open(r'd:\HK WEBSITE\main.py', 'w', encoding='utf-8').write(content)
print("Updated main.py")
