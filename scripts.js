// Common passwords (simplified for demo)
const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const feedbackList = document.getElementById('feedback');
    const progressBar = document.getElementById('progress-bar');
    const strengthText = document.getElementById('strength-text');

    let score = 0;
    let feedback = [];

    // Length check
    if (password.length < 8) {
        feedback.push('Password must be at least 8 characters.');
    } else {
        score += password.length * 4;
    }

    // Character types
    if (/[A-Z]/.test(password)) score += 10;
    else feedback.push('Add uppercase letters.');
    if (/[a-z]/.test(password)) score += 10;
    else feedback.push('Add lowercase letters.');
    if (/[0-9]/.test(password)) score += 10;
    else feedback.push('Add numbers.');
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    else feedback.push('Add special characters.');

    // Repetitive or sequential characters
    if (/(.)\1{2,}/.test(password)) {
        score -= 10;
        feedback.push('Avoid repetitive characters.');
    }
    if (/(123|abc|qwe)/i.test(password)) {
        score -= 10;
        feedback.push('Avoid sequential patterns.');
    }

    // Common passwords
    if (commonPasswords.includes(password.toLowerCase())) {
        score = 0;
        feedback.push('This is a common password. Choose a unique one.');
    }

    // Entropy calculation (simplified)
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^A-Za-z0-9]/.test(password)) charset += 32;
    const entropy = password.length * Math.log2(charset);
    score += Math.min(entropy / 2, 30); // Cap entropy contribution

    // Update UI
    let strength = 'Weak';
    let progressWidth = Math.min(score, 100);
    let progressClass = 'progress-weak';

    if (score >= 60) {
        strength = 'Strong';
        progressClass = 'progress-strong';
    } else if (score >= 30) {
        strength = 'Medium';
        progressClass = 'progress-medium';
    }

    progressBar.style.width = `${progressWidth}%`;
    progressBar.className = `progress-bar ${progressClass}`;
    strengthText.textContent = `Password Strength: ${strength}`;
    feedbackList.innerHTML = feedback.map(item => `<li>${item}</li>`).join('');
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        `;
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        `;
    }
}

// Generate random password
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const length = 12;
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('password').value = password;
    checkPasswordStrength();
}

// Add event listener for real-time password checking
document.getElementById('password').addEventListener('input', checkPasswordStrength);

function estimateCrackTime(password) {
  if (!password) return "N/A";

  // Define character set sizes
  const charSets = {
    lowercase: /[a-z]/.test(password) ? 26 : 0,
    uppercase: /[A-Z]/.test(password) ? 26 : 0,
    digits: /[0-9]/.test(password) ? 10 : 0,
    special: /[^a-zA-Z0-9]/.test(password) ? 32 : 0,
  };

  // Total character set size
  const charsetSize = Object.values(charSets).reduce((sum, size) => sum + size, 0);
  if (charsetSize === 0) return "N/A";

  // Calculate total combinations
  const combinations = Math.pow(charsetSize, password.length);

  // Assume 10 billion attempts per second (modern GPU cracking speed)
  const attemptsPerSecond = 10_000_000_000;
  const secondsToCrack = combinations / attemptsPerSecond;

  // Convert to human-readable format
  if (secondsToCrack < 60) {
    return `${Math.round(secondsToCrack)} second${secondsToCrack !== 1 ? "s" : ""}`;
  } else if (secondsToCrack < 3600) {
    const minutes = Math.round(secondsToCrack / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else if (secondsToCrack < 86400) {
    const hours = Math.round(secondsToCrack / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else if (secondsToCrack < 31536000) {
    const days = Math.round(secondsToCrack / 86400);
    return `${days} day${days !== 1 ? "s" : ""}`;
  } else {
    const years = Math.round(secondsToCrack / 31536000);
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
}

// Update your existing event listener (assuming it exists)
const passwordInput = document.getElementById("password-input");
const crackTimeValue = document.getElementById("crack-time-value");

passwordInput.addEventListener("input", function () {
  const password = this.value;
  // Assuming you have a checkPasswordStrength function
  checkPasswordStrength(password); // Your existing function
  crackTimeValue.textContent = estimateCrackTime(password);
});
const faqToggle = document.getElementById("faq-toggle");
const faqSection = document.getElementById("faq-section");

faqToggle.addEventListener("click", function () {
  faqSection.classList.toggle("hidden");
});
