class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.btnText = this.submitBtn.querySelector('.btn-text');
        this.btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        this.setLoadingState(true);

        // Get form data
        const formData = {
            to_name: 'Admin', // Nama penerima email
            from_name: this.form.name.value,
            message: this.form.message.value,
            reply_to: this.form.email.value,
            subject: this.form.subject.value
        };

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_vzq26y9',
                'template_ywqirdl', // Ganti dengan Template ID Anda
                formData
            );

            if (response.status === 200) {
                // Show success message
                this.showNotification('Message sent successfully!', 'success');
                // Reset form
                this.form.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        this.submitBtn.disabled = isLoading;
        this.btnText.style.display = isLoading ? 'none' : 'block';
        this.btnLoading.style.display = isLoading ? 'block' : 'none';
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        gsap.fromTo(notification,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3 }
        );

        // Remove after delay
        setTimeout(() => {
            gsap.to(notification, {
                y: 50,
                opacity: 0,
                duration: 0.3,
                onComplete: () => notification.remove()
            });
        }, 3000);
    }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
