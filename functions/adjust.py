import cv2
import numpy as np

def brightness(image , factor):
    return cv2.add(image, int(factor))

def darkness(image, factor):
    image_float = image.astype(np.float32)
    factor = np.float32(factor)
    darkened_image = image_float - factor
    darkened_image = np.clip(darkened_image, 0, 255)
    darkened_image = darkened_image.astype(np.uint8)
    return darkened_image

def exposure(image, factor):
    factor = float(factor)
    adjusted_image = cv2.convertScaleAbs(image, alpha=factor, beta=0)
    return adjusted_image

def contrast(image, factor):
    factor = float(factor)
    adjusted_image = cv2.convertScaleAbs(image, alpha=factor, beta=0)
    return adjusted_image

def saturation(image, factor):
    factor = float(factor)
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv_image[:, :, 1] = np.clip(hsv_image[:, :, 1] * factor, 0, 255)
    adjusted_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)
    return adjusted_image

def hue(image, factor):
    factor = float(factor)
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv_image[:, :, 0] = (hsv_image[:, :, 0] + factor) % 180
    adjusted_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)
    return adjusted_image
