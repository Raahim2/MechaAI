import cv2
import numpy as np
import math
import random

def adjust_brightness(image , factor):
    return cv2.add(image, int(factor))

def adjust_darkness(image, factor):
    image_float = image.astype(np.float32)
    factor = np.float32(factor)
    darkened_image = image_float - factor
    darkened_image = np.clip(darkened_image, 0, 255)
    darkened_image = darkened_image.astype(np.uint8)
    return darkened_image

def adjust_exposure(image, factor):
    factor = float(factor)
    adjusted_image = cv2.convertScaleAbs(image, alpha=factor, beta=0)
    return adjusted_image

def adjust_contrast(image, factor):
    factor = float(factor)
    adjusted_image = cv2.convertScaleAbs(image, alpha=factor, beta=0)
    return adjusted_image

def adjust_saturation(image, factor):
    factor = float(factor)
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv_image[:, :, 1] = np.clip(hsv_image[:, :, 1] * factor, 0, 255)
    adjusted_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)
    return adjusted_image

def adjust_hue(image, factor):
    factor = float(factor)
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv_image[:, :, 0] = (hsv_image[:, :, 0] + factor) % 180
    adjusted_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)
    return adjusted_image




def create_collage(images, output_size=(800, 800)):
    n = len(images)

    grid_size = math.ceil(math.sqrt(n))
    

    cell_size = (output_size[0] // grid_size, output_size[1] // grid_size)

    collage = np.zeros((output_size[1], output_size[0], 3), dtype=np.uint8)
    
    # Resize and place each image in the collage
    for i, img in enumerate(images):
        # Resize image to fit in a cell
        img_resized = cv2.resize(img, cell_size)
        
        # Calculate position in the grid
        row = i // grid_size
        col = i % grid_size
        
        # Calculate position in the collage
        x = col * cell_size[0]
        y = row * cell_size[1]
        
        # Place the image in the collage
        collage[y:y + cell_size[1], x:x + cell_size[0]] = img_resized
    
    return collage

    height, width = image.shape[:2]
    polaroid_height = height // num_polaroids
    collage = np.zeros_like(image)

    for i in range(num_polaroids):
        y_offset = random.randint(0, height - polaroid_height)
        polaroid = image[y_offset:y_offset + polaroid_height, :]
        collage[y_offset:y_offset + polaroid_height, :] = polaroid

    return collage

def resize_images(images, size):
    return [cv2.resize(img, size) for img in images]

def collage_1_layout_1(image):
    collage = np.zeros((400, 400, 3), dtype=np.uint8)
    resized_image = resize_images(image, (400, 400))
    collage[:400, :400] = resized_image
    return collage

def collage_1_layout_2(image):
    collage = np.zeros((800, 400, 3), dtype=np.uint8)
    resized_image = resize_images(image, (400, 400))
    collage[:400, :] = resized_image
    collage[400:, :] = resized_image
    return collage

def collage_1_layout_3(image):
    collage = np.zeros((400, 800, 3), dtype=np.uint8)
    resized_image = resize_images(image, (400, 400))
    collage[:, :400] = resized_image
    collage[:, 400:] = resized_image
    return collage

def collage_1_layout_4(image):
    collage = np.zeros((400, 400, 3), dtype=np.uint8)
    resized_image = resize_images(image, (200, 200))
    collage[0:200, 0:200] = resized_image
    collage[200:400, 200:400] = resized_image
    collage[0:200, 200:400] = resized_image
    collage[200:400, 0:200] = resized_image
    return collage

def collage_2_layout_1(images):
    collage = np.zeros((400, 800, 3), dtype=np.uint8)
    images = resize_images(images, (400, 400))
    collage[:, :400] = images[0]
    collage[:, 400:] = images[1]
    return collage

def collage_2_layout_2(images):
    collage = np.zeros((800, 400, 3), dtype=np.uint8)
    images = resize_images(images, (400, 400))
    collage[:400, :] = images[0]
    collage[400:, :] = images[1]
    return collage

def collage_2_layout_3(images):
    collage = np.zeros((400, 400, 3), dtype=np.uint8)
    images = resize_images(images, (400, 400))
    mask = np.tri(400, 400, dtype=bool)
    collage[mask] = images[0][mask]
    collage[np.flip(mask, axis=0)] = images[1][np.flip(mask, axis=0)]
    return collage

def collage_2_layout_4(images):
    collage = np.zeros((400, 400, 3), dtype=np.uint8)
    images = resize_images(images, (200, 200))
    collage[0:200, 0:200] = images[0]
    collage[200:400, 200:400] = images[0]
    collage[0:200, 200:400] = images[1]
    collage[200:400, 0:200] = images[1]
    return collage

