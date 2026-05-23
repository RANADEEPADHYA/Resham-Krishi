import io
import sys
import requests
from PIL import Image

# Reconfigure stdout to support UTF-8 printing on Windows
sys.stdout.reconfigure(encoding='utf-8')

def test_api():
    # 1. Create a dummy RGB image
    img = Image.new("RGB", (224, 224), color="green")
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format="JPEG")
    img_byte_arr.seek(0)
    
    files = {"file": ("test.jpg", img_byte_arr, "image/jpeg")}
    
    # 2. Test Stage 1: Leaf
    print("Testing Stage 1: Leaf...")
    r1 = requests.post("http://127.0.0.1:8000/api/predict/leaf", files=files)
    print("Status code:", r1.status_code)
    print("Response json keys:", list(r1.json().keys()))
    print("Disease:", r1.json().get("disease"))
    print("Demo Mode:", r1.json().get("demo_mode"))
    print("-" * 50)
    
    # 3. Test Stage 2: Silkworm
    img_byte_arr.seek(0)
    files = {"file": ("test.jpg", img_byte_arr, "image/jpeg")}
    print("Testing Stage 2: Silkworm...")
    r2 = requests.post("http://127.0.0.1:8000/api/predict/silkworm", files=files)
    print("Status code:", r2.status_code)
    print("Response json keys:", list(r2.json().keys()))
    print("Disease:", r2.json().get("disease"))
    print("Demo Mode:", r2.json().get("demo_mode"))
    print("-" * 50)

if __name__ == "__main__":
    test_api()
