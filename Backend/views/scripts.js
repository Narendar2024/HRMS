// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Get modal and close button
    var modal = document.getElementById('updateModal');
    var closeBtn = document.querySelector('.close');
    var updateBtns = document.querySelectorAll('.updateBtn');

    // Function to open modal
    function openModal(employeeId) {
        // You can load/update form data here if needed
        modal.style.display = 'block';
        // Set form action URL dynamically
        var updateForm = document.getElementById('updateForm');
        updateForm.action = `/employees/update/${employeeId}?_method=PUT`;
    }

    // Add event listener to each update button
    updateBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var employeeId = this.getAttribute('data-id');
            openModal(employeeId);
        });
    });

    // Close modal when close button clicked
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal when user clicks outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
