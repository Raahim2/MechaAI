import cv2

# text addimg
def line(file):
    file = cv2.line(file ,(0,0),(file.shape[1] , file.shape[0] ), (0,0,0) , 3)
    return file

def rectangle(file , c1,c2):
    file = cv2.rectangle(file ,(int(c1),int(c1)) , (int(c2),int(c2)) , (0,0,0) , 2)
    return file

def circle(file , c1 ,c2):
    file = cv2.circle(file ,(int(c1),int(c1)) , int(c2) ,(255,255,255) , 5)
    return file

def text(file , text , c1 ,c2):

    file = cv2.putText(file , text ,(int(c1),int(c2)) , cv2.FONT_HERSHEY_COMPLEX , 1 , (255,254,253))
    return file