const recorderContainer = document.getElementById("jsRecordContainer")
const recordBtn = document.getElementById("jsRecordBtn")
const videoPreview = document.getElementById("jsVideoPreview")

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 800 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        console.log(stream);
        innerHTML = "Stop recording";
    }
    catch (err) {
        recordBtn.innerHTML = "😢 Cant Record";
    }
    finally {
        recordBtn.removeEventListener("click", startRecording)
    }
}

function init() {
    recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
    init();
}