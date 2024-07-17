import cv2
# cropping

def crop_1_2(image):
    height, width, _ = image.shape
    if width >= 2 * height:
        crop_width = 2 * height
        crop_height = height
    else:
        crop_width = width
        crop_height = width // 2
    start_x = (width - crop_width) // 2
    start_y = (height - crop_height) // 2
    crop = image[start_y:start_y + crop_height, start_x:start_x + crop_width]
    return crop

def crop_16_9(image):
    target_width = int(image.shape[1] * (9 / 16))
    start_x = (image.shape[1] - target_width) // 2
    crop = image[:, start_x:start_x + target_width]
    return crop

def crop_9_16(image):
    target_height = int(image.shape[0] * (9 / 16))
    start_y = (image.shape[0] - target_height) // 2
    crop = image[start_y:start_y + target_height, :]
    return crop

def crop_3_4(image):
    target_height = int(image.shape[1] * (3 / 4))
    start_y = (image.shape[0] - target_height) // 2
    crop = image[start_y:start_y + target_height, :]
    return crop

def crop_4_3(image):
    target_width = int(image.shape[1] * (4 / 3))
    start_x = (image.shape[1] - target_width) // 2
    crop = image[:, start_x:start_x + target_width]
    return crop

