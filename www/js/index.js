document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Meminta izin kamera secara runtime untuk Android modern
    const permissions = cordova.plugins.permissions;
    permissions.checkPermission(permissions.CAMERA, function(status) {
        if (!status.hasPermission) {
            permissions.requestPermission(permissions.CAMERA, function(status) {
                if(status.hasPermission) {
                    initCamera();
                } else {
                    alert('Izin kamera ditolak oleh pengguna.');
                }
            }, function() { alert('Gagal meminta izin kamera.'); });
        } else {
            initCamera();
        }
    }, function() { initCamera(); });
}

if (!window.cordova) { 
    window.addEventListener('DOMContentLoaded', initCamera); 
}

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
