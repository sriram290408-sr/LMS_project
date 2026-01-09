document.addEventListener("DOMContentLoaded", function() {

    // 1. Generate Dummy Students (25 students to ensure scrolling)
    const baseNames = ["Aarav Sharma", "Isha Patel", "Rahul Verma", "Neha Singh", "Arjun Mehta", "Sara Khan", "Rohan Gupta", "Priya Nair"];
    let students = [];

    // Helper to generate a list
    for (let i = 0; i < 25; i++) {
        let name = baseNames[i % baseNames.length] + (Math.floor(i / 8) > 0 ? ` ${Math.floor(i/8) + 1}` : "");
        students.push({
            name: name,
            id: `CS3-${String(i+1).padStart(3, '0')}`,
            roll: `21CS${String(i+1).padStart(3, '0')}`,
            status: "Present" // Default
        });
    }

    const tbody = document.getElementById('studentList');

    // 2. Render Function (With Dropdown)
    function renderTable() {
        tbody.innerHTML = ''; 

        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            
            // Avatar logic
            const avatarUrl = `https://ui-avatars.com/api/?name=${student.name.replace(' ','+')}&background=random&color=fff&size=128`;

            // CSS class based on status value
            const statusClass = student.status.toLowerCase().replace(' ', '-');

            tr.innerHTML = `
                <td class="avatar-cell">
                    <img src="${avatarUrl}" alt="${student.name}" class="avatar">
                </td>
                <td class="info-cell">
                    <h4>${student.name}</h4>
                    <span>${student.id}</span>
                </td>
                <td class="roll-cell">${student.roll}</td>
                <td class="status-cell">
                    <select class="status-select ${statusClass}" onchange="updateStatus(${index}, this.value)">
                        <option value="Present" ${student.status === 'Present' ? 'selected' : ''}>Present</option>
                        <option value="Late" ${student.status === 'Late' ? 'selected' : ''}>Late</option>
                        <option value="Absent" ${student.status === 'Absent' ? 'selected' : ''}>Absent</option>
                        <option value="Sick Leave" ${student.status === 'Sick Leave' ? 'selected' : ''}>Sick Leave</option>
                        <option value="Normal Leave" ${student.status === 'Normal Leave' ? 'selected' : ''}>Normal Leave</option>
                    </select>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // 3. Update Status Logic (Called on Dropdown Change)
    window.updateStatus = function(index, newValue) {
        students[index].status = newValue;
        
        // Find the specific dropdown to update its color immediately without re-rendering whole table
        const selects = document.querySelectorAll('.status-select');
        const currentSelect = selects[index];
        
        // Remove old color classes
        currentSelect.classList.remove('present', 'late', 'absent', 'sick-leave', 'normal-leave');
        
        // Add new color class
        const newClass = newValue.toLowerCase().replace(' ', '-');
        currentSelect.classList.add(newClass);
    };

    // 4. Mark All Logic
    window.markAll = function(type) {
        students.forEach(student => {
            student.status = type;
        });
        renderTable(); // Re-render to show all changes
    };

    // 5. Save Button Logic
    window.saveAttendance = function() {
        const counts = {
            Present: 0, Late: 0, Absent: 0, SickLeave: 0, NormalLeave: 0
        };

        students.forEach(s => {
            const key = s.status.replace(' ', '');
            if(counts[key] !== undefined) counts[key]++;
        });

        alert(`Attendance Saved Successfully!\n
        Present: ${counts.Present}
        Late: ${counts.Late}
        Absent: ${counts.Absent}
        Sick Leave: ${counts.SickLeave}
        Normal Leave: ${counts.NormalLeave}`);
    };

    // Initial Render
    renderTable();

});