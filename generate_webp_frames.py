import os
import shutil
import subprocess
import imageio_ffmpeg

def generate_frames():
    exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    desk_input = r"D:\HK WEBSITE\media\videos\hero_scroll.mp4"
    mob_input = r"D:\HK WEBSITE\media\videos\hero_scroll_mobile.mp4"
    
    desk_out = r"D:\HK WEBSITE\media\images\frames_webp"
    mob_out = r"D:\HK WEBSITE\media\images\frames_webp_mobile"
    
    # 1. Clear and recreate folders
    for folder in [desk_out, mob_out]:
        shutil.rmtree(folder, ignore_errors=True)
        os.makedirs(folder, exist_ok=True)
        
    print("Extracting Desktop WebP frames (1280x720, 10 FPS, q=65)...")
    cmd_desk = [
        exe, '-y',
        '-i', desk_input,
        '-vf', 'fps=10,scale=1280:-1',
        '-q:v', '65',
        '-vcodec', 'libwebp',
        os.path.join(desk_out, 'frame_%04d.webp')
    ]
    subprocess.run(cmd_desk, check=True)
    
    print("Extracting Mobile WebP frames (576x1024, 10 FPS, q=65)...")
    cmd_mob = [
        exe, '-y',
        '-i', mob_input,
        '-vf', 'fps=10,scale=576:-1',
        '-q:v', '65',
        '-vcodec', 'libwebp',
        os.path.join(mob_out, 'frame_%04d.webp')
    ]
    subprocess.run(cmd_mob, check=True)
    
    desk_files = os.listdir(desk_out)
    mob_files = os.listdir(mob_out)
    
    desk_size = sum(os.path.getsize(os.path.join(desk_out, f)) for f in desk_files) / (1024 * 1024)
    mob_size = sum(os.path.getsize(os.path.join(mob_out, f)) for f in mob_files) / (1024 * 1024)
    
    print("=" * 50)
    print(f"Desktop: {len(desk_files)} frames | Total Size: {desk_size:.2f} MB")
    print(f"Mobile:  {len(mob_files)} frames | Total Size: {mob_size:.2f} MB")
    print("=" * 50)
    
    # Clean test directory if present
    shutil.rmtree(r"D:\HK WEBSITE\media\images\test_webp", ignore_errors=True)

if __name__ == "__main__":
    generate_frames()
