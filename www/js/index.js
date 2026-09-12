document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() { initCamera(); }
if (!window.cordova) { window.addEventListener('DOMContentLoaded', initCamera); }
function initCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('capture-btn');
    const constraints = { video: { facingMode: 'environment' }, audio: false };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) { video.srcObject = stream; })
        .catch(function(error) { alert('Tidak dapat mengakses kamera. Pastikan izin aktif.'); });
    captureBtn.addEventListener('click', function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
        video.style.display = 'none';
        captureBtn.innerText = 'Foto Lagi';
        captureBtn.onclick = function() { location.reload(); };
    });
}
