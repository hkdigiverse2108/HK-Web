import cv2
import os

def extract_frames(video_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    cap = cv2.VideoCapture(video_path)
    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        out_path = os.path.join(output_dir, f"frame_{count:04d}.jpg")
        cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 85])
        count += 1
    
    cap.release()
    print(f"Extracted {count} frames from {video_path}")

extract_frames(r"D:\HK WEBSITE\media\videos\011.mp4", r"D:\HK WEBSITE\media\images\frames")
extract_frames(r"D:\HK WEBSITE\media\videos\022.mp4", r"D:\HK WEBSITE\media\images\frames_mobile")
