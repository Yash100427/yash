function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthMessage = document.getElementById('strengthMessage');
    const crackTimeMessage = document.getElementById('crackTimeMessage');
    const requirements = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        numbers: document.getElementById('numbers'),
        special: document.getElementById('special')
    };

    let strength = 'Weak';
    let color = 'red';

    if (password.length >= 8) {
        requirements.length.classList.add('met');
    } else {
        requirements.length.classList.remove('met');
    }

    if (/[A-Z]/.test(password)) {
        requirements.uppercase.classList.add('met');
    } else {
        requirements.uppercase.classList.remove('met');
    }

    if (/[a-z]/.test(password)) {
        requirements.lowercase.classList.add('met');
    } else {
        requirements.lowercase.classList.remove('met');
    }

    if (/\d/.test(password)) {
        requirements.numbers.classList.add('met');
    } else {
        requirements.numbers.classList.remove('met');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        requirements.special.classList.add('met');
    } else {
        requirements.special.classList.remove('met');
    }

    const conditionsMet = Object.values(requirements).filter(item => item.classList.contains('met')).length;

    if (conditionsMet >= 4) {
        strength = 'Strong';
        color = 'green';
    } else if (conditionsMet >= 3) {
        strength = 'Medium';
        color = 'orange';
    }

    strengthMessage.textContent = `Password Strength: ${strength}`;
    strengthMessage.style.color = color;

    const crackTime = estimateCrackTime(password);
    crackTimeMessage.textContent = `Estimated Time to Crack: ${crackTime}`;
}

function estimateCrackTime(password) {
    const charSetSize = getCharSetSize(password);
    const combinations = Math.pow(charSetSize, password.length);
    const attemptsPerSecond = 1e10; // 10 billion attempts per second
    const seconds = combinations / attemptsPerSecond;

    return formatTime(seconds);
}

function getCharSetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/\d/.test(password)) size += 10;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) size += 32;
    return size;
}

function formatTime(seconds) {
    const units = [
        { label: 'years', value: 60 * 60 * 24 * 365 },
        { label: 'days', value: 60 * 60 * 24 },
        { label: 'hours', value: 60 * 60 },
        { label: 'minutes', value: 60 },
        { label: 'seconds', value: 1 }
    ];

    for (const unit of units) {
        const quotient = Math.floor(seconds / unit.value);
        if (quotient > 0) {
            return `${quotient} ${unit.label}`;
        }
    }

    return 'less than a second';
}

