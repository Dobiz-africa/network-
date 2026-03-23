// Global variables
let recommendedNetwork = null;
let selectedPriority = null;
let selectedUsage = null;
let selectedLocation = null;
let sessionId = generateSessionId();

// Generate session ID
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display comparison table and network cards on load
    displayComparisonTable();
    displayNetworkCards();
});

// Find best match based on user selections
function findMatch() {
    // Get selections
    selectedPriority = document.querySelector('input[name="priority"]:checked');
    selectedUsage = document.querySelector('input[name="usage"]:checked');
    selectedLocation = document.querySelector('input[name="location"]:checked');
    
    // Validate all selections
    if (!selectedPriority || !selectedUsage || !selectedLocation) {
        alert('Please answer all 3 questions before finding your match!');
        return;
    }
    
    // Get values
    const priority = selectedPriority.value;
    const usage = selectedUsage.value;
    const location = selectedLocation.value;
    
    // Recommendation logic (same as Python version)
    let recommended, reason;
    
    if (priority === "Best Price") {
        recommended = 'Mascom';
        reason = "Most affordable data packages according to our user reviews";
    } else if (priority === "Fastest Internet") {
        recommended = 'Orange';
        reason = "Highest ratings for internet speed and reliability";
    } else if (priority === "Overall Quality") {
        recommended = 'BTC';
        reason = "Highest overall customer satisfaction (8.07/10)";
    } else {
        recommended = 'BTC';
        reason = "Best customer service ratings (8.02/10)";
    }
    
    recommendedNetwork = recommended;
    
    // Display recommendation
    displayRecommendation(recommended, reason);
    
    // Scroll to result
    document.getElementById('recommendation-result').scrollIntoView({ behavior: 'smooth' });
}

// Display recommendation result
function displayRecommendation(network, reason) {
    const resultDiv = document.getElementById('recommendation-result');
    const data = networksData[network];
    
    // Show result section
    resultDiv.style.display = 'block';
    
    // Update title and reason
    document.getElementById('recommendation-title').textContent = `🏆 Best Match for You: ${network}`;
    document.getElementById('recommendation-reason').textContent = reason;
    
    // Update metrics
    const metricsHtml = `
        <div class="metric-card">
            <span class="metric-value">${data.overall_score.toFixed(1)}/10</span>
            <span class="metric-label">Overall Score <span class="metric-icon">⭐</span></span>
        </div>
        <div class="metric-card">
            <span class="metric-value">${data.customer_service.toFixed(1)}/10</span>
            <span class="metric-label">Customer Service</span>
        </div>
        <div class="metric-card">
            <span class="metric-value">${data.pricing.toFixed(1)}/10</span>
            <span class="metric-label">Pricing</span>
        </div>
        <div class="metric-card">
            <span class="metric-value">${data.users.toLocaleString()}</span>
            <span class="metric-label">Users Reviewed</span>
        </div>
    `;
    document.getElementById('metrics-container').innerHTML = metricsHtml;
    
    // Update CTA button
    const ctaButton = document.getElementById('cta-button');
    ctaButton.textContent = `📱 Get ${network} Now`;
}

// Handle CTA button click
function handleCTA() {
    const email = document.getElementById('user-email').value;
    const name = document.getElementById('user-name').value || 'User';
    
    if (!email) {
        alert('Please enter your email to continue');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Track lead (would send to Airtable in production)
    const leadData = {
        email: email,
        name: name,
        network: recommendedNetwork,
        priority: selectedPriority.value,
        usage: selectedUsage.value,
        location: selectedLocation.value,
        timestamp: new Date().toISOString(),
        session_id: sessionId
    };
    
    console.log('Lead captured:', leadData);
    
    // Track click
    trackClick(recommendedNetwork, 'cta_click');
    
    // Show success message
    alert(`✅ Thank you! We'll send your ${recommendedNetwork} recommendation to ${email}`);
    
    // Redirect to network website (replace with actual affiliate links)
    const links = {
        'Orange': 'https://www.orange.co.bw',
        'Mascom': 'https://www.mascom.bw',
        'BTC': 'https://www.btc.bw'
    };
    
    setTimeout(() => {
        window.open(links[recommendedNetwork], '_blank');
    }, 1000);
}

// Track clicks
function trackClick(network, action) {
    const clickData = {
        network: network,
        action: action,
        session_id: sessionId,
        timestamp: new Date().toISOString()
    };
    
    console.log('Click tracked:', clickData);
    
    // In production, this would send to Airtable
    // sendToAirtable('CLICKS', clickData);
}

// Display comparison table
function displayComparisonTable() {
    const tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>Network</th>
                    <th>Overall Score</th>
                    <th>Customer Service</th>
                    <th>Pricing</th>
                    <th>Reviews</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Orange</strong></td>
                    <td>${networksData.Orange.overall_score.toFixed(1)}/10</td>
                    <td>${networksData.Orange.customer_service.toFixed(1)}/10</td>
                    <td>${networksData.Orange.pricing.toFixed(1)}/10</td>
                    <td>${networksData.Orange.users.toLocaleString()}</td>
                </tr>
                <tr>
                    <td><strong>Mascom</strong></td>
                    <td>${networksData.Mascom.overall_score.toFixed(1)}/10</td>
                    <td>${networksData.Mascom.customer_service.toFixed(1)}/10</td>
                    <td>${networksData.Mascom.pricing.toFixed(1)}/10</td>
                    <td>${networksData.Mascom.users.toLocaleString()}</td>
                </tr>
                <tr>
                    <td><strong>BTC</strong></td>
                    <td>${networksData.BTC.overall_score.toFixed(1)}/10</td>
                    <td>${networksData.BTC.customer_service.toFixed(1)}/10</td>
                    <td>${networksData.BTC.pricing.toFixed(1)}/10</td>
                    <td>${networksData.BTC.users.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    document.getElementById('comparison-table').innerHTML = tableHtml;
}

// Display network cards
function displayNetworkCards() {
    const networks = ['Orange', 'Mascom', 'BTC'];
    const maxScore = Math.max(networksData.Orange.overall_score, networksData.Mascom.overall_score, networksData.BTC.overall_score);
    
    let cardsHtml = '';
    
    networks.forEach(network => {
        const data = networksData[network];
        const isWinner = data.overall_score === maxScore;
        
        cardsHtml += `
            <div class="network-card">
                ${isWinner ? '<span class="winner-badge">🏆 HIGHEST RATED</span>' : ''}
                <h3>${network}</h3>
                <div class="network-rating">${data.overall_score.toFixed(2)}/10</div>
                
                <div class="strength-bar">
                    <strong class="strength-label">Strengths:</strong>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(data.customer_service / 10 * 100)}%"></div>
                    </div>
                    <div class="progress-caption">Customer Service: ${data.customer_service.toFixed(1)}/10</div>
                </div>
                
                <div class="strength-bar">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(data.pricing / 10 * 100)}%"></div>
                    </div>
                    <div class="progress-caption">Pricing: ${data.pricing.toFixed(1)}/10</div>
                </div>
                
                <div class="strength-bar">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(data.communication / 10 * 100)}%"></div>
                    </div>
                    <div class="progress-caption">Communication: ${data.communication.toFixed(1)}/10</div>
                </div>
                
                <div class="network-info">
                    <p>✅ <strong>Best at:</strong> ${data.top_strength}</p>
                    <p>⚠️ <strong>Watch out:</strong> ${data.top_weakness}</p>
                    <p><strong>${data.users.toLocaleString()}</strong> verified reviews</p>
                </div>
                
                <button class="network-button" onclick="chooseNetwork('${network}')">Choose ${network}</button>
            </div>
        `;
    });
    
    document.getElementById('network-cards').innerHTML = cardsHtml;
}

// Handle network card button click
function chooseNetwork(network) {
    // Track click
    trackClick(network, 'detailed_cta');
    
    // Show confirmation
    alert(`Great choice! Redirecting to ${network}...`);
    
    // Redirect (replace with actual affiliate links)
    const links = {
        'Orange': 'https://www.orange.co.bw',
        'Mascom': 'https://www.mascom.bw',
        'BTC': 'https://www.btc.bw'
    };
    
    setTimeout(() => {
        window.open(links[network], '_blank');
    }, 500);
}

// Handle newsletter subscription
function handleNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    const messageDiv = document.getElementById('newsletter-message');
    
    if (!email) {
        messageDiv.innerHTML = '<p class="error-message">Please enter your email</p>';
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageDiv.innerHTML = '<p class="error-message">Please enter a valid email address</p>';
        return;
    }
    
    // Track newsletter signup (would send to Airtable in production)
    const newsletterData = {
        email: email,
        timestamp: new Date().toISOString(),
        type: 'newsletter'
    };
    
    console.log('Newsletter signup:', newsletterData);
    
    // Show success message
    messageDiv.innerHTML = '<p class="success-message">✅ Subscribed! Check your email for updates.</p>';
    
    // Clear input
    document.getElementById('newsletter-email').value = '';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

// Airtable integration (for production use)
// Uncomment and configure when ready to deploy with Airtable

/*
async function sendToAirtable(table, data) {
    const AIRTABLE_API_KEY = 'YOUR_API_KEY';
    const AIRTABLE_BASE_ID = 'YOUR_BASE_ID';
    
    try {
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [{ fields: data }]
            })
        });
        
        const result = await response.json();
        console.log('Airtable response:', result);
        return result;
    } catch (error) {
        console.error('Airtable error:', error);
        return null;
    }
}
*/
