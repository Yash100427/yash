function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const feedback = document.getElementById('feedback');

    // Initialize variables
    let strength = 0;
    let feedbackText = '';

    // Check password length
    if (password.length > 0) {
        strength += Math.min(password.length * 10, 30); // Up to 30% for length
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
        strength += 20;
        feedbackText += 'Includes uppercase letters. ';
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
        strength += 20;
        feedbackText += 'Includes lowercase letters. ';
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
        strength += 20;
        feedbackText += 'Includes numbers. ';
    }

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
        strength += 20;
        feedbackText += 'Includes special characters. ';
    }

    // Adjust strength based on length penalties
    if (password.length < 8) {
        strength = Math.min(strength, 30);
        feedbackText = 'Password is too short. Use at least 8 characters.';
    } else if (password.length >= 12) {
        strength = Math.min(strength + 10, 100); // Bonus for longer passwords
    }

    // Update strength bar
    strengthBar.style.width = `${strength}%`;
    strengthBar.className = ''; // Reset classes

    if (strength <= 30) {
        strengthBar.classList.add('weak');
        feedbackText = feedbackText || 'Weak: Add more characters and variety.';
    } else if (strength <= 70) {
        strengthBar.classList.add('medium');
        feedbackText = feedbackText || 'Medium: Consider adding special characters or more length.';
    } else {
        strengthBar.classList.add('strong');
        feedbackText = feedbackText || 'Strong: Great password!';
    }

    // Update feedback text
    feedback.textContent = feedbackText;
}
