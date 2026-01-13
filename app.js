async function getUserLocation() {
    const infoPanel = document.getElementById('info-panel');
    const btn = document.getElementById('findMe');

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    btn.innerText = "Finding...";
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

           document.getElementById("lat").innerText = latitude.toFixed(4);
        document.getElementById("lon").innerText = longitude.toFixed(4);
        
    
        infoPanel.classList.remove('hidden');

        try {
            
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();

            
            document.getElementById("address").innerText = data.display_name;
const addr = data.address;
document.getElementById("street").innerText = addr.road || addr.street || addr.suburb || addr.neighbourhood || addr.city || "Location details unavailable";
            
        } catch (err) {
            document.getElementById("address").innerText = "Unable to fetch address details.";
        } finally {
            btn.innerText = "Detect My Location";
            btn.disabled = false;
        }

    }, (err) => {
        btn.innerText = "Detect My Location";
        btn.disabled = false;
        alert("Error: Please enable location access.");
    });
}
