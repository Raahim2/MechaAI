import cv2
from flask import Flask, request, render_template , redirect
# from functions import effect , crop , rotate ,text ,ai , adjust ,collage
from functions import adjust ,collage
import matplotlib.pyplot as plt
import pandas as pd
import os
import pymongo


app = Flask(__name__)
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['Users']
collection = db['UserInfo']
currentpath = "static/dummydata.csv"
currentfile = "Dummydata.csv"

@app.route('/' )
def index():
    return render_template('index.html')

@app.route('/login' , methods=['GET' , 'POST'])
def login():
    if(request.method =='POST'):
        
        username = request.form.get('username')
        password = request.form.get('password')

        user = collection.find_one({'name':username,'password':password})

        if(user):
            return redirect(f'/{username}')
        
        else:
            error = "Incorrect Username Or password"
            return render_template('login.html' , error = error)

    return render_template('login.html')

@app.route('/signup' , methods=['GET' , 'POST'])
def signup():
    if(request.method == "POST"):
    
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_pass = request.form.get('confirm-password')

        if(password==confirm_pass):
            collection.insert_one({'name':username , 'password' : password})
        else:
            error = "Password must be same"
            return render_template('signup.html' , error=error)

    return render_template('signup.html')

@app.route('/<string:username>' )
def dash(username):
    user = collection.find_one({'name':username})
    if(not user):
        return redirect('/login')
    
    labels = ['Total Images Edited', 'Likes', 'Profile View', 'Followers']
    sizes = [3, 1678, 672, 23]
    explode = (0.1, 0, 0, 0) 
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='#393b45')
    wedges, texts, autotexts = ax.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%', shadow=True, startangle=140)
    ax.axis('equal')  
    fig.patch.set_facecolor('#393b45')
    plt.savefig('static/statistics_pie_chart.png', facecolor=fig.get_facecolor(), edgecolor='none')

    
    fig, ax = plt.subplots(figsize=(10, 6), facecolor='#393b45')
    bars = ax.bar(labels, sizes )

    for bar in bars:
        yval = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2, yval + 50, int(yval), ha='center', va='bottom', color='white')

    ax.set_xlabel('Statistics Type', color='white')
    ax.set_ylabel('Counts', color='white')
    ax.set_title('Social Media Statistics', color='white')

    fig.patch.set_facecolor('#393b45')
    ax.set_facecolor('#393b45')

    ax.tick_params(axis='x', colors='white')
    ax.tick_params(axis='y', colors='white')


    plt.savefig('static/statistics_bar_chart.png', facecolor=fig.get_facecolor(), edgecolor='none')

     
    return render_template('dashboard.html' , username=username)

@app.route('/<string:username>/editor', methods=['POST', 'GET'])
def image(username):
    
    FUNCTIONS = {
        'filters':['grey','blur','canny','dilate','erod','th','transform','cartoon','vin','inv','poison'],
        'cropping':['crop 1/2','crop 16/9','crop 9/6' ,'crop 3/4' , 'crop 4/3'],
        'rotate':['Horizontal Flip' , 'Vertical Flip' , 'Rotate Right' , 'Rotate Left' , 'Zoom'],
        'adjust':['Bright','Dark','Exposure','Contrast','Saturation','Hue'],
        'text':['Rectangle','Line','Circle','Text'],
        'ai':['Object Detection','Face Mesh','Background Remover' , 'Enhance']
    }
    uploded=False
    if request.method =='POST':
        uploded=True
        
        task = request.form.get('task')
        file =  request.files['fileInput']
        factor = request.form.get('factor')
        textt = request.form.get('textt')
        n1=request.form.get('n1')
        n2=request.form.get('n2')

       

        if file.filename != '':
            file.save('static/image.jpg')
            file_path = 'static/image.jpg'
        else:
            file_path = 'static/image.jpg'

        im = cv2.imread(file_path)
    
        
        # filters
        if task == "grey":
            im = effect.grayscale(im)
        if task == "blur":
            im= effect.blur(im)
        if task == "canny":
            im= effect.canny(im)
        if task == "dilated":
            im= effect.dilate(im)
        if task == "erod":
            im= effect.erode(im)
        if task == "th":
            im = effect.threshold(im)
        if task == "trans":
            im= effect.translate_image(im)
        if task == "cartoon":
            im= effect.cartoon(im)
        if task == "vin":
            im= effect.vignette(im)
        if task == "inv":
            im= effect.invert_colors(im)
        if task == "poison":
            im= effect.posterize(im)      

        # cropping
        if task == "crop 1/2":
            im= crop.crop_1_2(im)
        if task == "crop 16/9":
            im= crop.crop_16_9(im)
        if task == "crop 9/6":
            im= crop.crop_9_16(im)
        if task == "crop 3/4":
            im= crop.crop_3_4(im)
        if task == "crop 4/3":
            im= crop.crop_4_3(im)

        #rotating

        if task == "Horizontal Flip":
            im =rotate.flip_hor(im)
        if task =="Vertical Flip":
            im= rotate.flip_vert(im)
        if task=="Rotate Right":
            im=rotate.rotate_r(im)
        if task=="Rotate Left":
            im=rotate.rotate_l(im)
        if task=="Zoom":
            im=rotate.zoom_in(im)
        
        # text
        if task == "Rectangle":
            im= text.rectangle(im  ,n1 ,n2)
        if task == "Line":
            im= text.line(im )
        if task == "Circle":
            im= text.circle(im , n1 ,n2)
        if task == "Text":
            im= text.text(im , textt , n1,n2)

        # adjust
        if task == "Bright":
            im=adjust.brightness(im , factor)
        if task == "Dark":
            im=adjust.darkness(im,factor)
        if task == "Exposure":
            im=adjust.exposure(im , factor)
        if task == "Contrast":
            im=adjust.contrast(im,factor)
        if task == "Saturation":
            im=adjust.saturation(im , factor)
        if task == "Hue":
            im=adjust.hue(im,factor)

        #ai
        if task=="Object Detection":
            uploded=True
            img_data,count,unique_items,item_counts=ai.detect(im)
            im , c =ai.process(im)
            cv2.imwrite('static/image.jpg', im)
            return render_template('main.html', img= img_data , count=count , items=unique_items , item_counts =item_counts , status=uploded , task=task, FUNCTIONS=FUNCTIONS)
        
        if(task=="Face Mesh"):
            im = ai.mesh(im)

        if(task =="Background Remover"):
            im = ai.bgrem(im)

        if(task=="Enhance"):
            im=ai.enhance_image(im)

    

        if(task=='download'):
            files = os.listdir('static\Downloads')
            num_files = len(files)
            print(files , num_files)
            im_path=f'static/Downloads/{num_files}.jpg'
            print(im_path)
            cv2.imwrite(im_path, im)

        
        cv2.imwrite('static/image.jpg', im)
        

        return render_template('features/editor.html' , status=uploded , FUNCTIONS=FUNCTIONS )

    return render_template('features/editor.html' , status=uploded , FUNCTIONS=FUNCTIONS)

@app.route('/<string:username>/collage', methods=['POST', 'GET'])
def collagemaker(username):
    files = os.listdir('static/IMG/collage')
    numfile = len(files)

    images =[]
    for i in range(numfile):
        image = cv2.imread(f'static/IMG/collage/image{i+1}.jpg')
        images.append(image)

    if(request.method=='POST'):
        uploded = True
        print(request)
        print(request.args)
        print(request.form)
        
        if 'num' in request.form:
            layout_num=int(request.form.get('num'))
            print(layout_num)
            print(numfile)

            if(numfile==1 and layout_num==1):
                collage = adjust.collage_1_layout_1(images)
            elif(numfile==1 and layout_num==2):
                collage = adjust.collage_1_layout_2(images)
            elif(numfile==1 and layout_num==3):
                collage = adjust.collage_1_layout_3(images)
            elif(numfile==1 and layout_num==4):
                collage = adjust.collage_1_layout_4(images)

            elif(numfile==2 and layout_num==1):
                collage = adjust.collage_2_layout_1(images)
            elif(numfile==2 and layout_num==2):
                collage = adjust.collage_2_layout_2(images)
            elif(numfile==2 and layout_num==3):
                collage = adjust.collage_2_layout_3(images)
            elif(numfile==2 and layout_num==4):
                collage = adjust.collage_2_layout_4(images)

        else:
            file = request.files['file']
            file.save(f'static/IMG/collage/image{numfile+1}.jpg')
            collage = adjust.create_collage(images)

        cv2.imwrite('static/image.jpg',collage)
        


     
        return render_template('features/collage.html' , username=username , numfile=numfile , uploded = uploded)
        
    return render_template('features/collage.html' , username=username , numfile=numfile)

@app.route('/<string:username>/graph/<string:plot>', methods=['POST', 'GET'])
def graph(username , plot):
    VALID_TYPES = ["Linear", "Scatter", "Bar", "Pie", "Histogram", "Stem", "Stack", "Stair", "Hex", "Trip"]
    if(plot not in VALID_TYPES):
        return redirect(f'/{username}')
    
    global currentfile
    global currentpath

    generated=False
    df = pd.read_csv(currentpath)
    df=df.head(30)
    row_count = df.shape[0]
            
    if(request.method == "POST"):
        if 'csv' in request.files:
            csv = request.files['csv']
            _,extension = os.path.splitext(csv.filename)

            if(extension =='.csv' or extension =='.xlxs'):
                currentfile = csv.filename
                currentpath='static/file.csv'
                csv.save(currentpath)
                df=pd.read_csv(currentpath)
                row_count = df.shape[0]
                df = df.head(30)

        else:
            df =pd.read_csv(currentpath)
            row_count = df.shape[0]
            columns=df.columns.tolist()
            selected = []
            numex = request.form.get('numex')

            for column in columns:
                if request.form.get(column):
                    selected.append(request.form.get(column))

            # making graph
            generated=True
            plt.figure(figsize=(10, 6))  
            df = df.head(int(numex))

            for col in selected:
                if plot == "Linear":
                    plt.plot(df.index, df[col], marker='o', label=col)
                elif plot == "Scatter":
                    plt.scatter(df.index, df[col], label=col)
                elif plot == "Bar":
                    plt.bar(df.index, df[col], label=col)
                elif plot == "Pie" : 
                    plt.pie(df[selected[0]], labels=df.index, autopct='%1.1f%%')
                elif plot == "Histogram":
                    plt.hist(df[col], label=col, alpha=0.5, bins=10)
                elif plot == "Stem":
                    plt.stem(df.index, df[col], label=col)
                elif plot == "Stack":
                    plt.stackplot(df.index, df[selected].T, labels=selected)
                elif plot == "Stair":
                    plt.step(df.index, df[col], label=col)
                elif plot == "Hex":
                    plt.hexbin(df.index, df[col], gridsize=20, cmap='Blues')
                    plt.colorbar(label=col)
                elif plot == "Trip":
                    plt.triplot(df.index, df[col], label=col)  # Assuming you have x and y values for trip plots
                else:
                    plt.plot(df.index, df[col], marker='o', label=col)  # Default to linear plot

            
            plt.xlabel('Index')
            plt.ylabel('Values')
            plt.title(f'{plot} Plot')
            plt.legend()
            plt.savefig('static/image.jpg')
           


    columns=df.columns.tolist()
    data = df.values.tolist()  

    return render_template('features/graph.html' , username = username , plot = plot ,columns=columns , data=data  , filename = currentfile , generated=generated , row_count=row_count , VALID_TYPES=VALID_TYPES)

@app.route('/<string:username>/projects', methods=['POST', 'GET'])
def projects(username):
    if request.method =='POST':
        num= request.form.get('del-num')
        if(num==1):
            file = request.form.get('del-input')

            # os.remove(f"static/Downloads/{file}")

    files = os.listdir('static/Downloads')
    file_mb=[]
    file_name=[]
    images=[]

    for file in files:
        file_size = os.path.getsize("static/Downloads/"+ file)
        file_size = int(file_size / 1024)
        im = cv2.imread("static/Downloads/"+ file)

        images.append(im)
        file_mb.append(file_size)
        file_name.append(file)


    return render_template('projects.html' , fn=file_name , fs=file_mb , im=images)



if __name__ == '__main__':
    app.run(debug=True)
