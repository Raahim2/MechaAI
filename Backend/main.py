from flask import Flask,jsonify,request
import pymongo
import cv2
import variables
from  flask_cors import CORS
import os
import numpy as np
import pandas as pd


app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['Users']
collection = db['UserInfo']




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

@app.route('/uploadFile', methods=['POST' , 'GET'])
def upload_file():
    print(request.files)  

    file = request.files['file']

    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            file_extension = os.path.splitext(file.filename)[1] 
            print(file_extension) 
            if(file_extension in variables.IMG_FILES):
                file_path = f'Frontend/public/Uploads/Image/{file.filename}'
            elif(file_extension in variables.DOCUMENT_FILES):
                file_path = f'Frontend/public/Uploads/Document/{file.filename}'
            elif(file_extension in variables.CODE_FILES):
                file_path = f'Frontend/public/Uploads/Code/{file.filename}'
            elif(file_extension in variables.EXCEL_FILES):
                file_path = f'Frontend/public/Uploads/Excel/{file.filename}'
            else:
                file_path = f'Frontend/public/Uploads/{file.filename}'



            file.save(file_path)
            print(f"File saved to {file_path}")
            return jsonify({'message': 'File successfully uploaded', 'file_path': file_path}), 200
        except Exception as e:
            print(f"Error saving file: {e}")
            return jsonify({'error': str(e)}), 500

def truncate_text(text, max_length=100):
    if isinstance(text, str) and len(text) > max_length:
        return text[:max_length] + '...'
    return text

def clean_data(data):
    return [
        {key: truncate_text(value) for key, value in row.items()}
        for row in data
    ]

@app.route('/fetchCSV/<string:filename>', methods=['POST' , 'GET'])
def csv_data(filename):
    print(filename)
    df = pd.read_csv(f'Frontend/public/Uploads/Excel/{filename}')
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    df = df.fillna('NaN')

    columns = df.columns.tolist()
    data = df.head(50).to_dict(orient='records')

    data = clean_data(data)

    return jsonify({'columns': columns, 'data':data})

@app.route('/fetchUploads', methods=['POST', 'GET'])
def fetchUploads():
    docs = os.listdir('Frontend/public/Uploads/Document')
    imgs = os.listdir('Frontend/public/Uploads/Image')
    excel = os.listdir('Frontend/public/Uploads/Excel')
    code = os.listdir('Frontend/public/Uploads/Code')

    return jsonify(docs=docs, imgs=imgs, excel=excel, code=code)

@app.route('/editor/<string:task>' ,methods=['POST' , 'GET'])
def imageEditor(task):
    data = request.get_json()  

    image_path = data.get('path', '')
    im = cv2.imread(f'Frontend/public/{image_path}')
    for category, tasks in variables.FUNCTIONS.items():
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

@app.route('/saveCroppedImage', methods=['POST'])
def save_cropped_image():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    
    if file:
        # Save the file to the specified path
        save_path = "Frontend/public/Output/output.png"
        file.save(save_path)
        return jsonify({'message': 'File saved successfully'}), 200


@app.route('/CSVEditor/<string:task>' ,methods=['POST' , 'GET'])
def CSVEditor(task):
    path = request.form.get('filepath')
    col = int(request.form.get('selected'))
    path = path.split('?')[0]
    df= pd.read_csv(f'Frontend/public/{path}')

    print(path)

    columns = df.columns.tolist()
    selected_col = columns[col]

    if(task=='Fill NA'):
        fillwith = request.form.get('input')
        method = request.form.get('checkbox')

        if(str(method)!="null"):
            print("mean")
            try:
                if method == 'Mean':
                    df[selected_col] = df[selected_col].fillna(df[selected_col].mean())
                elif method == 'Median':
                    df[selected_col] = df[selected_col].fillna(df[selected_col].median())
                elif method == 'Mode':
                    df[selected_col] = df[selected_col].fillna(df[selected_col].mode()[0])
            except Exception as e:
                print("Kuch garbar hai")
                return jsonify("ERROR")
        else:
            print("not mean")
            df[selected_col] = df[selected_col].fillna(fillwith)

    
        df.to_csv(f"Frontend/public{path}" , index=False)

        return jsonify("SUCCESS")
   
    elif(task=='Drop'):
        df = df.drop(columns=[selected_col]) 
        df.to_csv(f"Frontend/public{path}" , index=False)
        

        return jsonify("SUCCESS")
    
    elif(task=='Replace'):
        find = request.form.get('input1')
        replace = request.form.get('input2')
        print(find)
        print(replace)

        df[selected_col] = df[selected_col].replace(find , replace)

        df.to_csv(f"Frontend/public{path}" , index=False)

        return jsonify("SUCCESS")
   
    
    return jsonify("ERROR")

@app.route('/UpdateInitial', methods=['POST', 'GET'])
def UpdateInitial():
    data = request.get_json()  
    image_path = 'Frontend/public/' + data.get('path', '')
    Updatedpath = 'Frontend/public/Output/output.png' 
    im = cv2.imread(Updatedpath)
    cv2.imwrite(image_path , im)

    return jsonify('SUCCESS')

    
@app.route('/db', methods=['POST', 'GET'])
def db():
    data = collection.find({})  # Fetch all documents from the collection
    data_list = list(data)  

    for item in data_list:
        item['_id'] = str(item['_id'])

    return jsonify(data_list)

if __name__ =="__main__":
    app.run(debug=True)