import cv2
import numpy as np
import math

def brightness(image , factor):
    return cv2.add(image, int(factor))

def create_collage(image_path1, image_path2, image_path3, image_path4, output_path='/static/collage.jpg', size=(300, 300)):
    # Function to resize images to the same dimensions
    def resize_image(image, size):
        return cv2.resize(image, size)

    # Load your images
    image1 = cv2.imread(image_path1)
    image2 = cv2.imread(image_path2)
    image3 = cv2.imread(image_path3)
    image4 = cv2.imread(image_path4)

    # Ensure images are loaded
    if image1 is None or image2 is None or image3 is None or image4 is None:
        print("Error: One or more images were not loaded properly.")
        return

    # Resize images
    image1 = resize_image(image1, size)
    image2 = resize_image(image2, size)
    image3 = resize_image(image3, size)
    image4 = resize_image(image4, size)

    # Create the collage
    top_row = np.hstack((image1, image2))
    bottom_row = np.hstack((image3, image4))
    collage = np.vstack((top_row, bottom_row))

    # Save the collage
    cv2.imwrite(output_path, collage)

def create_collagen(images, output_size=(800, 800)):
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


