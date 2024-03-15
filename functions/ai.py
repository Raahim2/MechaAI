
from ultralytics import YOLO
import cv2
import cvzone
import math
import base64
import numpy as np



model=YOLO('models/detect.pt')
CLASSES = model.names
CLR= [
    (255, 0, 0),
    (0, 255, 0),
    (0, 0, 255),
    (255, 255, 0),
    (255, 0, 255),
    (0, 255, 255),
    (128, 0, 0),
    (0, 128, 0),
    (0, 0, 128),
    (128, 128, 0),
    (128, 0, 128),
    (0, 128, 128),
    (255, 128, 0),
    (255, 0, 128),
    (128, 255, 0),
    (128, 0, 255),
    (0, 128, 255),
    (255, 128, 128),
    (0, 64, 0),
    (0, 0, 64),
    (64, 64, 0),
    (64, 0, 64),
    (0, 64, 64),
    (128, 64, 0),
    (128, 0, 64),
    (64, 128, 0),
    (64, 0, 128),
    (0, 128, 64),
    (0, 64, 128),
    (64, 128, 128),
    (128, 64, 128),
    (128, 128, 64),
    (64, 64, 128),
    (128, 128, 128),
    (64, 64, 64),
    (192, 0, 0),
    (0, 192, 0),
    (0, 0, 192),
    (192, 192, 0),
    (192, 0, 192),
    (0, 192, 192),
    (192, 192, 192),
    (96, 0, 0),
    (0, 96, 0),
    (0, 0, 96),
    (96, 96, 0),
    (96, 0, 96),
    (0, 96, 96),
    (192, 96, 0),
    (192, 0, 96),
    (96, 192, 0),
    (96, 0, 192),
    (0, 192, 96),
    (0, 96, 192),
    (96, 192, 192),
    (192, 96, 192),
    (192, 192, 96),
    (96, 96, 192),
    (192, 192, 192),
    (96, 96, 96),
    (255, 64, 64),
    (64, 255, 64),
    (64, 64, 255),
    (255, 255, 64),
    (255, 64, 255),
    (64, 255, 255),
    (192, 64, 64),
    (64, 192, 64),
    (64, 64, 192),
    (192, 192, 64),
    (192, 64, 192),
    (64, 192, 192),
    (255, 192, 64),
    (255, 64, 192),
    (192, 255, 64),
    (192, 64, 255),
    (64, 192, 255),
    (255, 192, 192),
    (64, 128, 64),
    (250, 64, 250)
    
]


def process(img):
    count = 0

    results = model(img , show=False)
    for result in results:
        for box in result.boxes:
            #xy cordinates
            x1 , y1 , x2 , y2 =  box.xyxy[0]
            x1 , y1 , x2 , y2 = int(x1),int(y1),int(x2),int(y2) 

            #confidence
            conf = math.ceil((box.conf[0]*100))/100

            #class
            cls = box.cls[0]

            
            cv2.rectangle(img ,(x1,y1),(x2,y2),CLR[int(cls)],3)
            cvzone.putTextRect(img, f'{CLASSES[int(cls)]} {conf}', (max(0, x1), max(0, y1-5)),scale=1.4, thickness=1, offset=4,colorT=(255, 255, 255), colorR=CLR[int(cls)])
            count = count+1
            

    return img , count

def count_items(lst):
    unique_items = []
    item_counts = []
    
    for item in lst:
        if item not in unique_items:
            unique_items.append(item)
            item_counts.append(1)
        else:
            index = unique_items.index(item)
            item_counts[index] += 1
    
    return unique_items, item_counts

def detect(image):
    

    img = np.array(image) 
    
    #model working
    results = model(img , show=False)
    final , count= process(img)

    _ , img_bytes = cv2.imencode('.png', final)

    img = base64.b64encode(img_bytes).decode('utf-8')

    img_data=img
    
    objects = [CLASSES[int(i)] for i in np.array(results[0].boxes.cls)] 
    unique_items, item_counts = count_items(objects)

    return img_data , count , unique_items , item_counts 

def enhance_image(image ):
    denoised_image = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)
    enhanced_image = cv2.convertScaleAbs(denoised_image, alpha=1.2, beta=0)
    return enhanced_image

def hand_gesture_recognition(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 1000: 
            cv2.drawContours(image, [cnt], 0, (0, 255, 0), 3)
            hull = cv2.convexHull(cnt)
            for point in hull:
                cv2.circle(image, tuple(point[0]), 10, (0, 0, 255), -1)
    return image

def detect_emotions(image):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    emotion_detected = False
    for (x, y, w, h) in faces:
        face_roi = image[y:y+h, x:x+w]
        # Convert the face region to HSV color space
        hsv_face = cv2.cvtColor(face_roi, cv2.COLOR_BGR2HSV)
        # Calculate the mean color values in the HSV space
        mean_hue = np.mean(hsv_face[:, :, 0])
        mean_saturation = np.mean(hsv_face[:, :, 1])
        mean_value = np.mean(hsv_face[:, :, 2])
        # Perform basic color-based emotion detection
        if mean_hue > 0 and mean_hue < 30 and mean_saturation > 50 and mean_value > 100:
            detected_emotion = "Happy"
        elif mean_hue > 30 and mean_hue < 90 and mean_saturation > 50 and mean_value > 100:
            detected_emotion = "Sad"
        elif mean_hue > 90 and mean_hue < 150 and mean_saturation > 50 and mean_value > 100:
            detected_emotion = "Angry"
        else:
            detected_emotion = "Neutral"

        cv2.putText(image, f"Emotion: {detected_emotion}", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        emotion_detected = True
    if not emotion_detected:
        cv2.putText(image, "No Emotion Detected", (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    return image

def text_detection(image):
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply adaptive thresholding
    _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
    # Find contours
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Draw bounding boxes around detected text
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
    
    return image