const recorderContainer = document.getElementById("jsRecordContainer")
const recordBtn = document.getElementById("jsRecordBtn")
const videoPreview = document.getElementById("jsVideoPreview")

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();   //fake
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
}

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    videoRecorder.start();
    recordBtn.addEventListener("click", stopRecording);
};


const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1200, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        console.log(stream);
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording(streamObject);
    }
    catch (err) {
        recordBtn.innerHTML = "😢 Cant Record";
    }
    finally {
        recordBtn.removeEventListener("click", startRecording)
    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}