import re
import os
import urllib.request
import urllib.error
import time

ts_file = r"d:\Project\Hok-Draft\hok-draft\static-database\main\hero-list-enriched.ts"
out_dir = r"d:\Project\Hok-Draft\hok-draft\public\asset\hero-icon"

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

with open(ts_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Match heroIcon URL and the following heroBody name
pattern = re.compile(r'heroIcon:\s*"(https?://[^"]+)",\s*heroBody:\s*"([^"]+)"')
matches = pattern.findall(content)

print(f"Found {len(matches)} hero icons to download.")

for url, body_name in matches:
    # Example body_name: "001-Haya.jpg" -> base_name: "001-Haya"
    base_name = body_name.rsplit('.', 1)[0]
    
    # Extract extension from URL, fallback to png
    ext = url.rsplit('.', 1)[-1].split('?')[0]
    if ext.lower() not in ['png', 'jpg', 'jpeg', 'webp']:
        ext = 'png'
        
    file_name = f"{base_name}-Icon.{ext}"
    local_path = os.path.join(out_dir, file_name)
    
    print(f"Downloading {file_name} from {url}...")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    req = urllib.request.Request(url, headers=headers)
    
    retry_count = 3
    for i in range(retry_count):
        try:
            with urllib.request.urlopen(req, timeout=10) as response, open(local_path, 'wb') as out_file:
                out_file.write(response.read())
            break
        except urllib.error.URLError as e:
            print(f"  Attempt {i+1} failed: {e}")
            time.sleep(1)
    else:
        print(f"  FAILED to download {file_name}")
        continue

    # Create the replacement path
    new_path = f"/asset/hero-icon/{file_name}"
    
    # Replace the old URL with the new local path in the content string
    content = content.replace(f'"{url}"', f'"{new_path}"')

# Write the updated content back to the TypeScript file
with open(ts_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished downloading and updating the TypeScript file.")
