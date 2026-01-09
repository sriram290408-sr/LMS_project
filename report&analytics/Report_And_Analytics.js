document.addEventListener("DOMContentLoaded", function() {

    // ============================================
    // CONFIGURATION
    // ============================================
    // Set TRUE to freeze time (e.g. for screenshot matching)
    // Set FALSE to let the clock run freely
    const USE_CUSTOM_TIME = true; 

    const CUSTOM_DATE_TEXT = "Apr 1, 2025";
    const CUSTOM_TIME_TEXT = "9:41 AM";
    // ============================================


    // --- 1. Date & Time Logic ---
    function updateDateTime() {
        if (USE_CUSTOM_TIME) {
            document.getElementById('currentDate').textContent = CUSTOM_DATE_TEXT;
            document.getElementById('currentTime').textContent = CUSTOM_TIME_TEXT;
        } else {
            const now = new Date();
            
            // Format Date
            const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            const dateString = now.toLocaleDateString('en-US', dateOptions);
            
            // Format Time
            const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
            const timeString = now.toLocaleTimeString('en-US', timeOptions);
            
            document.getElementById('currentDate').textContent = dateString;
            document.getElementById('currentTime').textContent = timeString;
        }
    }
    
    updateDateTime();
    if (!USE_CUSTOM_TIME) {
        setInterval(updateDateTime, 1000);
    }


    // --- 2. Interactive Sidebar ---
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Note: In a real app, you might remove preventDefault to allow page navigation
            e.preventDefault(); 
            
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
        });
    });


    // --- 3. Export Button Functionality ---
    const exportBtn = document.getElementById('exportBtn');
    if(exportBtn) {
        exportBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Note: No Chart JS initialization needed because 
    // charts are now built purely with CSS!
});