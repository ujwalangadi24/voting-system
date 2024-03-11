let selectedCategory = '';
let selectedCandidate = '';
let candidateVotes = {}; // Object to store vote count for each candidate
let userHasVoted = false; // Flag to track whether the user has voted

const demoUser = {
    username: 'student',
    password: 'password123'
};

function validateLogin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (validateCredentials(enteredUsername, enteredPassword)) {
        // Successful login
        showVotingButtons(enteredUsername);
    } else {
        alert('Invalid username or password. Please try again.');
        // Clear the input fields after an unsuccessful login attempt
        usernameInput.value = '';
        passwordInput.value = '';
    }
}

function validateCredentials(username, password) {
    // You should replace this with proper authentication logic
    return username === demoUser.username && password === demoUser.password;
}

function showVotingButtons(category) {
    selectedCategory = category;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('votingButtons').style.display = 'block';
    updateResults(); // Display current results
}

function showCandidates(category) {
    // You can fetch the candidates dynamically from a database or API
    const candidates = getCandidates(category);

    const candidateList = document.getElementById('candidateList');
    candidateList.innerHTML = '';

    candidates.forEach(candidate => {
        const listItem = document.createElement('li');
        listItem.textContent = `${candidate} - Votes: ${candidateVotes[candidate] || 0}`;
        listItem.addEventListener('click', () => vote(candidate));
        candidateList.appendChild(listItem);
    });

    document.getElementById('votingButtons').style.display = 'none';
    document.getElementById('candidatesList').style.display = 'block';
}

function vote(candidate) {
    if (!userHasVoted) {
        selectedCandidate = candidate;

        // Increment vote count for the selected candidate
        candidateVotes[candidate] = (candidateVotes[candidate] || 0) + 1;

        // Display the vote directly on the candidates list page
        updateResults();

        // Set the flag to indicate that the user has voted
        userHasVoted = true;
    } else {
        alert('You have already voted. Each user can vote for only one candidate.');
    }
}

function updateResults() {
    const candidateList = document.getElementById('candidateList');
    const candidates = Array.from(candidateList.children);

    candidates.forEach(candidate => {
        const candidateName = candidate.textContent.split(' - ')[0];
        candidate.textContent = `${candidateName} - Votes: ${candidateVotes[candidateName] || 0}`;
    });
}

function getCandidates(category) {
    if (category === 'CR') {
        return ['Candidate 1', 'Candidate 2', 'Candidate 3'];
    } else if (category === 'BR') {
        return ['Candidate A', 'Candidate B', 'Candidate C'];
    }

    return [];
}
