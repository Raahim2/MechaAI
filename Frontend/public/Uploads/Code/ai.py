
from ultralytics import YOLO
import cv2
import cvzone
from cvzone.FaceMeshModule import FaceMeshDetector
from cvzone.SelfiSegmentationModule import SelfiSegmentation
from deepface import DeepFace
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

def mesh(image):
    detector = FaceMeshDetector(maxFaces=10)
    im , res = detector.findFaceMesh(image)
    return im

def bgrem(image):
    remover = SelfiSegmentation()
    im=remover.removeBG(image )
    return im

def predict(image):
    im = DeepFace.analyze('/static/uplode.jpg' )
    return im

def enhance_image(image ):
    denoised_image = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)
    enhanced_image = cv2.convertScaleAbs(denoised_image, alpha=1.2, beta=0)
    return enhanced_image
 
     