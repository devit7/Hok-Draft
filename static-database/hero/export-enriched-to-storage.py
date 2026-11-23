import re
import json

enriched_path = r"c:\Users\Administrator\Documents\Project\Hok-Draft\static-database\main\hero-list-enriched.ts"

with open(enriched_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Tag mapping
tags_map = {
    "Burst Damage": 1,
    "Poke Damage": 2,
    "Low Crowd Control": 3,
    "Hard Crowd Control": 4,
    "Sustain": 5,
    "Mobility": 6,
    "Tanky/Durability": 7,
    "Engage/Initiation": 9,
    "Split Push": 10,
    "Team Fight": 11,
    "Escape/Disengage": 12,
    "Wave Clear": 13,
    "DPS/Sustained Damage": 14,
    "Healing": 15,
    "Shield/Barrier": 16,
    "Buff/Debuff": 17,
    "Objective Control": 18,
    "Vision Control": 19,
    "Counter Engage": 20,
    "Dive/Backline Access": 21,
    "Area of Effect (AOE)": 22,
    "Single Target": 23,
    "Kill Steal": 24,
    "Jungle Control": 25,
    "Stealth": 26,
    "Bush Traps": 27,
    "All Role": 28,
    "Annoying": 29,
    "One Shot Kill": 30,
    "Tower Eater": 31,
}

# Role mapping
role_map = {
    1: 1, # Class Lane
    2: 2, # Jungle
    3: 3, # Mid Lane
    4: 4, # Farm Lane
    5: 5, # Roamer
}

# Experience mapping
exp_map = {
    "Easy": 1,
    "Intermediate": 2,
    "Advanced": 3,
}

# Power Spike mapping
ps_map = {
    "Early": 1,
    "Mid": 2,
    "Late": 3,
}

# Extract hero blocks from hero-list-enriched.ts
pattern = re.compile(r'\{\s*heroId:\s*(\d+)[\s\S]*?\n  \},')
blocks = pattern.findall(content)
print(f"Total heroId found in enriched: {len(blocks)}")

enrichments = {}
hero_order = []

for match in pattern.finditer(content):
    block = match.group(0)
    hid = int(re.search(r'heroId:\s*(\d+)', block).group(1))
    hero_order.append(hid)
    
    # Experience
    exp_m = re.search(r'heroExperience:\s*"([^"]*)"', block)
    exp_str = exp_m.group(1) if exp_m else ""
    exp_id = exp_map.get(exp_str, None)
    
    # Roles
    # find all `id: (\d+)` inside role: [...]
    role_block_m = re.search(r'role:\s*\[([\s\S]*?)\]', block)
    role_ids = []
    if role_block_m:
        role_ids = [int(r) for r in re.findall(r'id:\s*(\d+)', role_block_m.group(1))]
    
    # Tags
    tag_block_m = re.search(r'tags:\s*\[([\s\S]*?)\]', block)
    tag_ids = []
    if tag_block_m:
        tags_raw = re.findall(r'"([^"]+)"', tag_block_m.group(1))
        for t in tags_raw:
            if t in tags_map:
                tag_ids.append(tags_map[t])
            else:
                print(f"Warning: Unknown tag '{t}' on hero {hid}")
                
    # Power Spike
    ps_block_m = re.search(r'powerSpike:\s*\[([\s\S]*?)\]', block)
    ps_ids = []
    if ps_block_m:
        ps_raw = re.findall(r'"([^"]+)"', ps_block_m.group(1))
        for p in ps_raw:
            if p in ps_map:
                ps_ids.append(ps_map[p])
            else:
                print(f"Warning: Unknown powerSpike '{p}' on hero {hid}")
                
    enrichments[hid] = {
        "experienceId": exp_id,
        "tagIds": tag_ids,
        "roleIds": role_ids,
        "powerSpikeIds": ps_ids,
    }

print(f"Enrichments created: {len(enrichments)} heroes")
print(f"Hero order created: {len(hero_order)} heroes")

# Save to a json file and a js script
out_data = {
    "STORAGE_KEY": "hero-generator-data",
    "ORDER_STORAGE_KEY": "hero-generator-order",
    "enrichments": enrichments,
    "heroOrder": hero_order
}

with open(r"c:\Users\Administrator\Documents\Project\Hok-Draft\static-database\hero\web-generator-import.json", "w", encoding="utf-8") as f:
    json.dump(out_data, f, indent=2)

js_code = f"""// Buka browser di http://localhost:3000/web-generator
// Buka Console (F12 -> Console), lalu copy-paste kode di bawah ini dan tekan Enter:

localStorage.setItem("hero-generator-data", JSON.stringify({json.dumps(enrichments)}));
localStorage.setItem("hero-generator-order", JSON.stringify({json.dumps(hero_order)}));
location.reload();
"""

with open(r"c:\Users\Administrator\Documents\Project\Hok-Draft\static-database\hero\apply-to-web-generator.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print("Saved apply-to-web-generator.js successfully!")

