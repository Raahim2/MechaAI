from functions import effect , crop , rotate , adjust , text 


FUNCTIONS = {
    'filters': {
        'grey': effect.grayscale,
        'blur': effect.blur,
        'canny': effect.canny,
        'dilate': effect.dilate,
        'erod': effect.erode,
        'th': effect.threshold,
        'transform': effect.translate,
        'cartoon': effect.cartoon,
        'vin': effect.vignette,
        'inv': effect.invert_colors,
        'poison': effect.posterize
    },
    'cropping': {
        'crop 1_2': crop.crop_half,
        'crop 16_9': crop.crop_16_9,
        'crop 9_6': crop.crop_9_16,
        'crop 3_4': crop.crop_3_4,
        'crop 4_3': crop.crop_4_3
    },
    'rotate': {
        'Horizontal Flip': rotate.horizontal_flip,
        'Vertical Flip': rotate.vertical_flip,
        'Rotate Right': rotate.rotate_right,
        'Rotate Left': rotate.rotate_left,
        'Zoom': rotate.zoom_in
    },
    'adjust': {
        'Bright': adjust.adjust_brightness,
        'Dark': adjust.adjust_darkness,
        'Exposure': adjust.adjust_exposure,
        'Contrast': adjust.adjust_contrast,
        'Saturation':adjust.adjust_saturation,
        'Hue': adjust.adjust_hue
    },
    'text': {
        'Rectangle': text.rectangle,
        'Line': text.line,
        'Circle': text.circle,
        'Text': text.text
    },
    # 'ai': {
    #     'Object Detection': ai.object_detection,
    #     'Face Mesh': ai.face_mesh,
    #     'Background Remover':ai.background_remover,
    #     'Enhance': ai.enhance
    # }
}

CODE_FILES = ['.py', '.js', '.java', '.c', '.cpp', '.cs', '.rb', '.php', '.html', '.css', '.ts', '.swift', '.go', '.rs', '.kt', '.sh', '.pl', '.r', '.vb', '.m', '.lua', '.json', '.xml', '.yaml', '.bat']
IMG_FILES = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.svg', '.webp', '.ico', '.heic']
EXCEL_FILES = ['.csv', '.xls', '.xlsx', '.ods', '.xlsm', '.xlsb', '.xlw']
DOCUMENT_FILES = ['.doc', '.docx', '.odt', '.rtf', '.txt', '.md' , '.pdf']
VIDEO_FILES = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.m4v']
AUDIO_FILES = ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a', '.alac']
ARCHIVE_FILES = ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.iso', '.xz']
EXECUTABLE_FILES = ['.exe', '.dll', '.bin', '.bat', '.sh', '.msi', '.apk', '.app', '.deb', '.rpm']