import cv2
from flask import Flask, request, render_template
from functions import effect , crop , rotate ,text ,ai , adjust 
import os

app = Flask(__name__)

@app.route('/' )
def index():
    return render_template('index.html')

@app.route('/projects'  , methods=['POST', 'GET'])
def projects():
    if request.method =='POST':
        num= request.form.get('del-num')
        print(num)
        if(num==1):
            file = request.form.get('del-input')


            print(file)
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



@app.route('/edit', methods=['POST', 'GET'])

def image():
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
        if task == "crop1":
            im= crop.crop_1_2(im)
        if task == "crop2":
            im= crop.crop_16_9(im)
        if task == "crop3":
            im= crop.crop_9_16(im)
        if task == "crop4":
            im= crop.crop_3_4(im)
        if task == "crop5":
            im= crop.crop_4_3(im)

        #rotating
        if task == "fhor":
            im =rotate.flip_hor(im)
        if task =="fver":
            im= rotate.flip_vert(im)
        if task=="right":
            im=rotate.rotate_r(im)
        if task=="left":
            im=rotate.rotate_l(im)
        if task=="zoom":
            im=rotate.zoom_in(im)
        # text
        if task == "rect":
            im= text.rectangle(im  ,n1 ,n2)
        if task == "line":
            im= text.line(im )
        if task == "circle":
            im= text.circle(im , n1 ,n2)
        if task == "text":
            im= text.text(im , textt , n1,n2)

        # adjust
        if task == "bright":
            im=adjust.brightness(im , factor)
        if task == "dark":
            im=adjust.darkness(im,factor)
        if task == "exposure":
            im=adjust.exposure(im , factor)
        if task == "contrast":
            im=adjust.contrast(im,factor)
        if task == "saturation":
            im=adjust.saturation(im , factor)
        if task == "hue":
            im=adjust.hue(im,factor)
        #ai
        
        if task=="detect":
            uploded=True
            img_data,count,unique_items,item_counts=ai.detect(im)
            im , c =ai.process(im)
            cv2.imwrite('static/image.jpg', im)
            return render_template('special.html', img= img_data , count=count , items=unique_items , item_counts =item_counts , status=uploded)
        
        if(task=="enhance"):
            im=ai.enhance_image(im)

        if(task=="hand"):
            im = ai.hand_gesture_recognition(im)

        if(task=="emotion"):
            im = ai.detect_emotions(im)

        if(task=="inf"):
            im = ai.text_detection(im)

        if(task=='download'):
            files = os.listdir('static\Downloads')
            num_files = len(files)
            print(files , num_files)
            im_path=f'static/Downloads/{num_files}.jpg'
            print(im_path)
            cv2.imwrite(im_path, im)

        
        cv2.imwrite('static/image.jpg', im)
        

    
        return render_template('main.html' , status=uploded )

    return render_template('main.html' , status=uploded)


if __name__ == '__main__':
    app.run(debug=True)
