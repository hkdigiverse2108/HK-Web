import imageio_ffmpeg
import subprocess
import os

exe = imageio_ffmpeg.get_ffmpeg_exe()

# Desktop
desk_out = r'D:\HK WEBSITE\media\images\frames'
if not os.path.exists(desk_out): os.makedirs(desk_out)
subprocess.run([exe, '-y', '-i', r'D:\HK WEBSITE\media\videos\011.mp4', '-vf', 'scale=1920:-1', '-q:v', '5', os.path.join(desk_out, 'frame_%04d.jpg')])

# Mobile
mob_out = r'D:\HK WEBSITE\media\images\frames_mobile'
if not os.path.exists(mob_out): os.makedirs(mob_out)
subprocess.run([exe, '-y', '-i', r'D:\HK WEBSITE\media\videos\022.mp4', '-vf', 'scale=720:-1', '-q:v', '5', os.path.join(mob_out, 'frame_%04d.jpg')])

print("Compression done!")
