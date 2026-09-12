document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device ready!');
    ambilLokasi();
    
    // Meminta izin runtime Android jika didukung
    if (window.cordova && cordova.plugins && cordova.plugins.permissions) {
        const permissions = cordova.plugins.permissions;
        const listIzin = [permissions.CAMERA, permissions.ACCESS_FINE_LOCATION, permissions.WRITE_EXTERNAL_STORAGE];
        
        permissions.requestPermissions(listIzin, function(status) {
            if(!status.hasPermission) {
                console.warn("Beberapa izin tidak diberikan.");
            }
        }, function() {
            console.error("Gagal meminta izin.");
        });
    }
}

if (!window.cordova) { 
    window.addEventListener('DOMContentLoaded', function() {
        initCamera();
        ambilLokasiBrowser();
    }); 
} else {
    document.addEventListener('DOMContentLoaded', initCamera);
}

function initCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('capture-btn');
    const constraints = { video: { facingMode: 'environment' }, audio: false };
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) { 
            video.srcObject = stream; 
        })
        .catch(function(error) { 
            alert('Tidak dapat mengakses kamera. Pastikan izin aktif.'); 
        });
        
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

function ambilLokasi() {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude.toFixed(5);
            const lon = position.coords.longitude.toFixed(5);
            document.getElementById('info-lokasi').innerText = `Lokasi: ${lat}, ${lon}`;
        },
        function(error) {
            document.getElementById('info-lokasi').innerText = 'Lokasi tidak aktif/ditolak.';
        },
        { timeout: 10000, enableHighAccuracy: true }
    );
}

function ambilLokasiBrowser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude.toFixed(5);
            const lon = position.coords.longitude.toFixed(5);
            document.getElementById('info-lokasi').innerText = `Lokasi: ${lat}, ${lon}`;
        });
    }
}
