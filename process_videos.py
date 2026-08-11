import imageio_ffmpeg
import subprocess
import os

exe = imageio_ffmpeg.get_ffmpeg_exe()

# Ensure directories exist
desk_out = r'D:\HK WEBSITE\media\images\frames'
mob_out = r'D:\HK WEBSITE\media\images\frames_mobile'
os.makedirs(desk_out, exist_ok=True)
os.makedirs(mob_out, exist_ok=True)

# Delete old frames
for f in os.listdir(desk_out):
    os.remove(os.path.join(desk_out, f))
for f in os.listdir(mob_out):
    os.remove(os.path.join(mob_out, f))

# Process Desktop Video (11.mp4)
print("Extracting desktop frames...")
# we can limit to 500-600 frames or keep original framerate. Let's keep 30fps and scale
subprocess.run([exe, '-y', '-i', r'D:\HK WEBSITE\11.mp4', '-vf', 'scale=1920:-1', '-q:v', '5', os.path.join(desk_out, 'frame_%04d.jpg')])
print("Desktop frames extracted.")

# Process Mobile Video (12.mp4)
print("Extracting mobile frames...")
subprocess.run([exe, '-y', '-i', r'D:\HK WEBSITE\12.mp4', '-vf', 'scale=720:-1', '-q:v', '5', os.path.join(mob_out, 'frame_%04d.jpg')])
print("Mobile frames extracted.")

print("Counting frames...")
desk_count = len(os.listdir(desk_out))
mob_count = len(os.listdir(mob_out))

print(f"Desktop Frames: {desk_count}")
print(f"Mobile Frames: {mob_count}")
