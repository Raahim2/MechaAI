import cv2
import numpy as np
# filters
def grayscale(file):
    img_grey = cv2.cvtColor(file, cv2.COLOR_BGR2GRAY)
    return img_grey

def blur(file):
    img_blur = cv2.GaussianBlur(file , (15,15) , 0)
    return img_blur

def canny(file):
    img_canny = cv2.Canny(file , 100,100)
    return img_canny

def dilate(file):
    kernal = np.ones((5,5) , np.uint8)
    file = canny(file)
    dilated = cv2.dilate(file ,kernal , iterations=1)
    return dilated

def erode(file):
    kernel = np.ones((5,5), np.uint8)
    eroded_img = cv2.erode(file, kernel, iterations=6)
    return eroded_img

def threshold(image):
    _, thresholded_image = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)
    return thresholded_image

def translate_image(image):
    rows, cols = image.shape[:2]
    translation_matrix = cv2.getRotationMatrix2D((cols / 2, rows / 2), 100, 1)
    translated_image = cv2.warpAffine(image, translation_matrix, (cols, rows))
    return translated_image

def cartoon(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray_blur = cv2.medianBlur(gray, 9)
    edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 9, 2)
    color = cv2.bilateralFilter(image, 9, 300, 300)
    cartoon = cv2.bitwise_and(color, color, mask=edges)
    return cartoon


def vignette(image):
    rows, cols = image.shape[:2]
    mask = np.zeros((rows, cols), dtype=np.uint8)
    cv2.circle(mask, (cols // 2, rows // 2), min(rows, cols) // 2, 255, -1, cv2.LINE_AA)
    vignette = cv2.bitwise_and(image, image, mask=mask)
    return vignette

def invert_colors(image):
    inverted_image = cv2.bitwise_not(image)
    return inverted_image

def posterize(image, num_bits=4):
    shift = 8 - num_bits
    posterized_image = cv2.bitwise_and(image, (2**num_bits - 1) << shift)
    return posterized_image
