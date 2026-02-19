"""
Script untuk mengubah semua heroBody extension menjadi .jpg

Usage:
    python update_hero_body_extension.py
"""

import os
import re
import shutil
from datetime import datetime

# Path ke file
SCRIPT_DIR = os.path.dirname(__file__)
FILE_PATH = os.path.join(SCRIPT_DIR, "hero-list-enriched.ts")

def update_hero_body_extension():
    """
    Update all heroBody extensions to .jpg
    """
    print(f"🔧 Reading file: {FILE_PATH}")
    
    if not os.path.exists(FILE_PATH):
        print(f"❌ File not found: {FILE_PATH}")
        return
    
    # Read the file
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Track replacements
    replacements = []
    
    # Find all heroBody entries with non-.jpg extensions
    # Pattern: heroBody: "filename.{png|PNG|jpeg|JPEG|JPG}"
    pattern = r'heroBody:\s*"([^"]+)\.(png|PNG|jpeg|JPEG|JPG)"'
    
    def replace_extension(match):
        filename = match.group(1)
        extension = match.group(2)
        old_name = f"{filename}.{extension}"
        new_name = f"{filename}.jpg"
        replacements.append({'old': old_name, 'new': new_name})
        return f'heroBody: "{new_name}"'
    
    # Replace all matches
    updated_content = re.sub(pattern, replace_extension, content)
    
    if not replacements:
        print("✅ No changes needed - all heroBody already use .jpg extension")
        return
    
    # Create backup with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = f"{FILE_PATH}.backup_{timestamp}"
    shutil.copy2(FILE_PATH, backup_path)
    print(f"💾 Backup created: {backup_path}")
    
    # Write updated content
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    # Print summary
    print(f"\n{'='*80}")
    print("📊 Summary:")
    print(f"   Total replacements: {len(replacements)}")
    print("")
    print("📝 Changes made:")
    for i, r in enumerate(replacements, 1):
        print(f"   {i}. {r['old']} → {r['new']}")
    print('='*80)
    print("\n✅ File updated successfully!")
    print(f"   File: {FILE_PATH}")
    print(f"   Backup: {backup_path}")
    print("\n💡 Next step: Run optimize.py to create optimized .jpg images")

if __name__ == "__main__":
    try:
        update_hero_body_extension()
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
