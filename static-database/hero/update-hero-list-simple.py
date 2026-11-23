import json
import os
import re
import shutil
from datetime import datetime

json_path = r"C:\Users\Administrator\response.json"
ts_path = r"c:\Users\Administrator\Documents\Project\Hok-Draft\static-database\hero\hero-list-simple.ts"

with open(json_path, 'r', encoding='utf-8') as f:
    resp = json.load(f)

api_heroes = {item['heroId']: item for item in resp['data']['list']}

with open(ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Backup
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup_path = f"{ts_path}.backup_{timestamp}"
shutil.copy2(ts_path, backup_path)
print(f"Backup created at: {backup_path}")

# 2. Update existing heroes' showRate, banRate, winRate
pattern = re.compile(r'  \{\n[\s\S]*?\n  \},')
updated_count = 0
matched_ids = set()

def replacer(m):
    global updated_count
    block = m.group(0)
    hid_m = re.search(r'heroId:\s*(\d+)', block)
    if not hid_m:
        return block
    hid = int(hid_m.group(1))
    if hid in api_heroes:
        matched_ids.add(hid)
        api_h = api_heroes[hid]
        updated_count += 1
        
        sr = api_h['showRate']
        br = api_h['banRate']
        wr = api_h['winRate']
        
        block = re.sub(r'showRate:\s*[0-9.eE+-]+,', f'showRate: {sr},', block)
        block = re.sub(r'banRate:\s*[0-9.eE+-]+,', f'banRate: {br},', block)
        block = re.sub(r'winRate:\s*[0-9.eE+-]+,', f'winRate: {wr},', block)
    return block

updated_content = pattern.sub(replacer, content)
print(f"Updated {updated_count} existing heroes.")

# 3. Add new heroes that are in response.json but not in hero-list-simple.ts
new_ids = [hid for hid in api_heroes if hid not in matched_ids]
print(f"Found {len(new_ids)} new heroes to add.")

# Helper to slugify name
def make_slug(name):
    clean = re.sub(r'[^\w\s-]', '', name)
    return re.sub(r'[-\s]+', '-', clean).strip('-')

new_hero_blocks = []
current_num = 116

for hid in new_ids:
    h = api_heroes[hid]
    info = h.get("heroInfo", {})
    name = info.get("heroName", f"Hero_{hid}")
    career = info.get("heroCareer", "Fighter")
    show_rate = h.get("showRate", 0.0)
    ban_rate = h.get("banRate", 0.0)
    win_rate = h.get("winRate", 0.0)
    cover = info.get("heroCover", "")
    
    slug = make_slug(name)
    body_file = f"{current_num:03d}-{slug}.jpg"
    icon_file = f"/asset/hero-icon/{current_num:03d}-{slug}-Icon.png"
    
    block = f"""  {{
    heroId: {hid},
    heroName: "{name}",
    heroCareer: "{career}",
    showRate: {show_rate},
    banRate: {ban_rate},
    winRate: {win_rate},
    media: {{
      heroCover: "{cover}",
      heroIcon: "{icon_file}",
      heroBody: "{body_file}",
    }},
  }},"""
    new_hero_blocks.append(block)
    current_num += 1

# Append before `];`
new_blocks_str = "\n".join(new_hero_blocks)
final_content = re.sub(r'\n\];\s*\nexport default HERO_LIST;', f'\n{new_blocks_str}\n];\nexport default HERO_LIST;', updated_content)

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully wrote {len(matched_ids) + len(new_ids)} heroes to {ts_path}!")

