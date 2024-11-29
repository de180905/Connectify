function splitFullName(fullName) {
    if (!fullName || typeof fullName !== 'string') {
        return { firstName: '', lastName: '' };
    }

    const nameParts = fullName.trim().split(/\s+/); // Split by whitespace
    if (nameParts.length === 1) {
        return { firstName: nameParts[0], lastName: '' };
    }

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' '); // Combine remaining parts
    return { firstName, lastName };
}
export { splitFullName }
