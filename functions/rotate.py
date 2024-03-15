import cv2

def flip_vert(file):
    file=cv2.flip(file , 0)
    return file

def flip_hor(file):
    file = cv2.flip(file  ,1)
    return file

def rotate_r(image):
    height, width = image.shape[:2]
    center = (width / 2, height / 2)

    rotation_matrix = cv2.getRotationMatrix2D(center,270, 1.0)
    rotated_image = cv2.warpAffine(image, rotation_matrix, (width, height))
    return rotated_image

def rotate_l(image):
    height, width = image.shape[:2]
    center = (width / 2, height / 2)

    rotation_matrix = cv2.getRotationMatrix2D(center,90, 1.0)
    rotated_image = cv2.warpAffine(image, rotation_matrix, (width, height))
    return rotated_image

def zoom_in(image):
    height, width = image.shape[:2]

    new_width = int(width * 2)
    new_height = int(height * 2)

    zoomed_in_image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_LINEAR)

    return zoomed_in_image
