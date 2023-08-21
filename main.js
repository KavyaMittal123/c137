status="";
object=[];

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status= Detecting Objects";
    object_name=document.getElementById("name").value;
}

function modelLoaded(){
    console.log("Model is Loaded");
    status=true;
}

function gotResult(error,result){
    if(error){
        console.log(error)
    }
    else{
        console.log(result);
        object=result;
    }
}

function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        object_detector.detect(video,gotResult);
        for(i=0;i<object.length;i++){
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label==object_name){
                video.stop();
                object_detector.detect(gotResult);
                document.getElementById("status1").innerHTML=object_name+" found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+" found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status1").innerHTML=object_name+" not found";
            }
        }
    }
}