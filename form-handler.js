document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const techSupportForm = document.getElementById('techSupportForm');
    const billSavingsForm = document.getElementById('billSavingsForm');
    const formSelectorBtns = document.querySelectorAll('.form-selector-btn');
    const fileInput = document.querySelector('.file-input');
    const fileName = document.querySelector('.file-name');

    // Switch between forms
    formSelectorBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const formType = this.getAttribute('data-form');
            
            // Update active button
            formSelectorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all forms first
            document.querySelectorAll('.service-form').forEach(form => {
                form.style.display = 'none';
                form.classList.remove('active');
            });
            
            // Show the selected form
            const formToShow = formType === 'tech-support' ? techSupportForm : billSavingsForm;
            if (formToShow) {
                formToShow.style.display = 'block';
                formToShow.classList.add('active');
            }
        });
    });
    
    // Initialize the first form as visible
    if (techSupportForm) {
        techSupportForm.style.display = 'block';
        techSupportForm.classList.add('active');
    }

    // Update file name display for bill savings form
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = '';
            }
        });
    }

    // Handle form submissions
    function setupFormSubmit(form, successMessage) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // FormBold will handle the actual submission
            // This is just for user feedback
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = successMessage;
                form.reset();
                
                // Clear file name display if it exists
                if (fileName) fileName.textContent = '';
                
                // Revert button text after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                }, 3000);
            }, 1500);
        });
    }

    // Set up both forms
    if (techSupportForm) {
        setupFormSubmit(techSupportForm, 'Message Sent!');
    }
    
    if (billSavingsForm) {
        setupFormSubmit(billSavingsForm, 'Request Sent!');
    }
});
