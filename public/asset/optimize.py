"""
Script untuk compress dan optimize gambar hero
Mengurangi ukuran file sambil mempertahankan kualitas visual yang baik

Input: folder 'hero'
Output: folder 'hero-optimized' (original files preserved)

Requirements:
    pip install Pillow

Usage:
    python optimize.py
"""

from PIL import Image
import os
import glob

# Konfigurasi
TARGET_FILE_SIZE_KB = 150  # Target max size per file (KB)
INITIAL_QUALITY = 85       # Starting quality, will be reduced if needed
MAX_WIDTH = 400            # Max width in pixels (for 4:5 ratio, height will be 500)
MAX_HEIGHT = 500           # Max height in pixels
MIN_QUALITY = 40           # Minimum quality threshold

def optimize_image(input_path, output_path, target_size_kb=TARGET_FILE_SIZE_KB):
    """
    Compress dan optimize single image dengan target size
    Akan reduce quality sampai mencapai target size
    """
    
    try:
        # Buka gambar
        img = Image.open(input_path)
        
        # Simpan original size
        original_size = os.path.getsize(input_path) / 1024  # KB
        
        # Convert RGBA ke RGB jika perlu (untuk JPEG)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        
        # Resize untuk maintain aspect ratio 4:5 atau lebih kecil
        # Calculate target size maintaining aspect ratio
        aspect_ratio = img.width / img.height
        
        if aspect_ratio > (4/5):  # Wider than 4:5
            # Limit by width
            if img.width > MAX_WIDTH:
                new_width = MAX_WIDTH
                new_height = int(new_width / aspect_ratio)
            else:
                new_width = img.width
                new_height = img.height
        else:  # Taller than or equal to 4:5
            # Limit by height
            if img.height > MAX_HEIGHT:
                new_height = MAX_HEIGHT
                new_width = int(new_height * aspect_ratio)
            else:
                new_width = img.width
                new_height = img.height
        
        if new_width != img.width or new_height != img.height:
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Ensure output directory exists
        output_dir = os.path.dirname(output_path)
        if output_dir:
            os.makedirs(output_dir, exist_ok=True)
        
        # Ensure output path is .jpg
        if not output_path.lower().endswith(('.jpg', '.jpeg')):
            base = os.path.splitext(output_path)[0]
            output_path = base + '.jpg'
        
        # Iteratively reduce quality until target size is reached
        output_format = 'JPEG'
        quality = INITIAL_QUALITY
        
        while quality >= MIN_QUALITY:
            img.save(output_path, output_format, quality=quality, optimize=True)
            file_size_kb = os.path.getsize(output_path) / 1024
            
            if file_size_kb <= target_size_kb:
                # Target reached, use this version
                break
            
            # Reduce quality for next iteration
            quality -= 5
        
        # Hitung compression ratio
        new_size = os.path.getsize(output_path) / 1024  # KB
        saved = original_size - new_size
        ratio = (saved / original_size * 100) if original_size > 0 else 0
        
        status = "✓" if new_size <= target_size_kb else "⚠"
        print(f"{status} {os.path.basename(input_path):35s} | {original_size:7.1f}KB → {new_size:7.1f}KB | Saved: {saved:7.1f}KB ({ratio:.1f}%) | Q:{quality}")
        
        return True
    except Exception as e:
        print(f"✗ Error processing {input_path}: {str(e)}")
        return False

def optimize_folder(input_folder_path, output_folder_path):
    """
    Optimize semua gambar di folder dan simpan ke folder output
    """
    # Create output folder if not exists
    os.makedirs(output_folder_path, exist_ok=True)
    
    # Get semua file gambar
    image_extensions = ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG', '*.png', '*.PNG']
    image_files = []
    
    for ext in image_extensions:
        image_files.extend(glob.glob(os.path.join(input_folder_path, ext)))
    
    if not image_files:
        print(f"Tidak ada gambar ditemukan di {input_folder_path}")
        return
    
    print(f"\n{'='*90}")
    print(f"🔧 Optimizing {len(image_files)} images")
    print(f"   Input folder: {input_folder_path}")
    print(f"   Output folder: {output_folder_path}")
    print(f"   Target size: ≤ {TARGET_FILE_SIZE_KB}KB per file")
    print(f"   Max dimensions: {MAX_WIDTH}x{MAX_HEIGHT}px (maintaining aspect ratio)")
    print(f"   Quality range: {MIN_QUALITY}-{INITIAL_QUALITY}")
    print(f"{'='*90}\n")
    
    total_original = 0
    total_new = 0
    success_count = 0
    under_target_count = 0
    
    for img_path in image_files:
        original_size = os.path.getsize(img_path) / 1024
        total_original += original_size
        
        # Determine output path
        filename = os.path.basename(img_path)
        # Convert extension to .jpg
        base_name = os.path.splitext(filename)[0]
        output_filename = base_name + '.jpg'
        output_path = os.path.join(output_folder_path, output_filename)
        
        if optimize_image(img_path, output_path):
            success_count += 1
            if os.path.exists(output_path):
                new_size = os.path.getsize(output_path) / 1024
                total_new += new_size
                if new_size <= TARGET_FILE_SIZE_KB:
                    under_target_count += 1
    
    # Summary
    total_saved = total_original - total_new
    ratio = (total_saved / total_original * 100) if total_original > 0 else 0
    avg_size_before = total_original / len(image_files) if len(image_files) > 0 else 0
    avg_size_after = total_new / success_count if success_count > 0 else 0
    
    print(f"\n{'='*90}")
    print(f"📊 Summary:")
    print(f"   Files processed: {success_count}/{len(image_files)}")
    print(f"   Files under target ({TARGET_FILE_SIZE_KB}KB): {under_target_count}/{success_count}")
    print(f"   Average size before: {avg_size_before:.1f} KB")
    print(f"   Average size after: {avg_size_after:.1f} KB")
    print(f"   Total size before: {total_original:.1f} KB ({total_original/1024:.2f} MB)")
    print(f"   Total size after: {total_new:.1f} KB ({total_new/1024:.2f} MB)")
    print(f"   Total saved: {total_saved:.1f} KB ({total_saved/1024:.2f} MB) - {ratio:.1f}% reduction")
    print(f"{'='*90}\n")

if __name__ == "__main__":
    # Define input and output folders
    base_folder = os.path.dirname(__file__)
    hero_input = os.path.join(base_folder, "hero")
    hero_output = os.path.join(base_folder, "hero-optimized")
    
    if os.path.exists(hero_input):
        optimize_folder(hero_input, hero_output)
        print(f"\n✅ Optimization complete! Check results in: {hero_output}")
        print(f"   Original files preserved in: {hero_input}")
    else:
        print(f"❌ Folder tidak ditemukan: {hero_input}")
    
    # Optional: optimize folder lain
    # feature_input = os.path.join(base_folder, "feature")
    # feature_output = os.path.join(base_folder, "feature-optimized")
    # if os.path.exists(feature_input):
    #     optimize_folder(feature_input, feature_output)
