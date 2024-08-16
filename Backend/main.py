from flask import Flask,jsonify,request
import pymongo
import cv2
from functions import effect , crop , rotate , adjust , text 
from  flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['Users']
collection = db['UserInfo']

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

@app.route('/signup' ,methods=['POST' , 'GET'])
def signup():
    data = request.get_json()  
    username = data.get('username')
    password = data.get('password')
    confirmpassword = data.get('confirmpassword')
    
    
    if(password==confirmpassword):
        collection.insert_one({'name': username, 'password': password})
        return jsonify(error="FALSE" , messege = "Account Creeted Succesfully" ,username=username , password=password , confirmpassword=confirmpassword)
    else:
        return jsonify(error="TRUE" , messege = "Password Does Not Match" , username=username , password=password , confirmpassword=confirmpassword)

@app.route('/login' ,methods=['POST' , 'GET'])
def login():
    data = request.get_json()  
    username = data.get('username')
    password = data.get('password')
    user = collection.find_one({'name':username,'password':password})
    if(user):
        return jsonify("SUCCESS")
    else:
        return jsonify("FAIL")

@app.route('/upload', methods=['POST' , 'GET'])
def upload_image():
    print(request.files)  # Debugging: print the files received
    if 'image' not in request.files:
        print("No image part in the request")
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['image']

    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            file_path = 'Frontend/public/Output/output.png'
            file.save(file_path)
            print(f"File saved to {file_path}")
            return jsonify({'message': 'File successfully uploaded', 'file_path': file_path}), 200
        except Exception as e:
            print(f"Error saving file: {e}")
            return jsonify({'error': str(e)}), 500



@app.route('/editor/<string:task>' ,methods=['POST' , 'GET'])
def imageEditor(task):
    im = cv2.imread('Frontend/public/Output/output.png')
    for category, tasks in FUNCTIONS.items():
        if task in tasks:
            print(task , category)
            func = tasks[task]
            if func:
                if(category=="adjust"):
                    im= func(im , 50)
                else:
                    im = func(im)
                cv2.imwrite("Frontend/public/Output/output.png", im)
                return jsonify("SUCCESS")
            else:
                return jsonify("Task not implemented")
    
    return jsonify("fail")
       
    


@app.route('/db', methods=['POST', 'GET'])
def db():
    data = collection.find({})  # Fetch all documents from the collection
    data_list = list(data)  

    for item in data_list:
        item['_id'] = str(item['_id'])

    return jsonify(data_list)

if __name__ =="__main__":
    app.run(debug=True)