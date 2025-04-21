function checkPassword() {
    const password = document.getElementById('password').value;
    const strengthSpan = document.getElementById('strength');
    const crackTimeSpan = document.getElementById('crack-time');

    let strength = 0;

    // Criteria for strength
    if (password.length > 0) strength++; // At least 1 character
    if (password.length >= 8) strength++; // At least 8 characters
    if (/[A-Z]/.test(password)) strength++; // Contains uppercase
    if (/[a-z]/.test(password)) strength++; // Contains lowercase
    if (/[0-9]/.test(password)) strength++; // Contains numbers
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Contains special characters

    // Determine strength and crack time
    let strengthText = 'very weak';
    let crackTime = 'less than a second';
    let color = '#ff4d4f'; // Red for weak

    if (strength <= 2) {
        strengthText = 'very weak';
        crackTime = 'less than a second';
        color = '#ff4d4f';
    } else if (strength === 3) {
        strengthText = 'weak';
        crackTime = 'a few seconds';
        color = '#ff4d4f';
    } else if (strength === 4) {
        strengthText = 'moderate';
        crackTime = 'a few minutes';
        color = '#ffa500'; // Orange for moderate
    } else if (strength === 5) {
        strengthText = 'strong';
        crackTime = 'a few hours';
        color = '#32cd32'; // Green for strong
    } else if (strength === 6) {
        strengthText = 'very strong';
        crackTime = 'several days';
        color = '#32cd32';
    }

    // Update the UI
    strengthSpan.textContent = strengthText;
    crackTimeSpan.textContent = crackTime;
    strengthSpan.style.color = color;
    crackTimeSpan.style.color = color;
}
