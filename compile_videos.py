import os
import subprocess
import imageio_ffmpeg

def compile_video(frames_dir, output_path, frame_pattern, resolution=None):
    exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    # We use -g 1 to force keyframe on every single frame. This is crucial for scroll seeking.
    # We use -movflags +faststart to make the video seekable before downloading the full file.
    cmd = [
        exe, '-y',
        '-framerate', '30',
        '-i', os.path.join(frames_dir, frame_pattern)
    ]
    
    if resolution:
        cmd.extend(['-vf', f'scale={resolution}'])
        
    cmd.extend([
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-crf', '28',
        '-g', '1',
        '-movflags', '+faststart',
        output_path
    ])
    
    print(f"Compiling video for {frames_dir}...")
    print("Command:", " ".join(cmd))
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode == 0:
        print(f"Successfully compiled: {output_path}")
        print(f"File size: {os.path.getsize(output_path) / (1024*1024):.2f} MB")
    else:
        print(f"Failed to compile {output_path}")
        print("Error:", result.stderr)

if __name__ == '__main__':
    desk_dir = r'D:\HK WEBSITE\media\images\frames'
    mob_dir = r'D:\HK WEBSITE\media\images\frames_mobile'
    
    os.makedirs(r'D:\HK WEBSITE\media\videos', exist_ok=True)
    
    # 720p for desktop and 576x1024 for mobile at CRF 28 for optimal preloading speed
    compile_video(desk_dir, r'D:\HK WEBSITE\media\videos\hero_scroll.mp4', 'frame_%04d.jpg', '1280:720')
    compile_video(mob_dir, r'D:\HK WEBSITE\media\videos\hero_scroll_mobile.mp4', 'frame_%04d.jpg', '576:1024')
