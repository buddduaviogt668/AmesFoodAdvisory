/* Lead Capture Logic */
document.addEventListener('DOMContentLoaded', function() {
    // Create the modal HTML
    const modalHTML = `
        <div class="lead-modal-overlay" id="leadModalOverlay">
            <div class="lead-modal">
                <button class="lead-modal-close" id="closeLeadModal">&times;</button>
                <div class="lead-modal-header">
                    <span class="lead-modal-badge">Instant Access</span>
                    <h2 id="leadModalTitle">Download Resource</h2>
                    <p id="leadModalDesc">Enter your details below to receive your free food safety resource.</p>
                </div>
                <form class="lead-form" id="leadForm">
                    <div class="lead-field">
                        <label for="leadName">Full Name</label>
                        <input type="text" id="leadName" placeholder="John Doe" required>
                    </div>
                    <div class="lead-field">
                        <label for="leadEmail">Business Email</label>
                        <input type="email" id="leadEmail" placeholder="john@example.com.au" required>
                    </div>
                    <div class="lead-field">
                        <label for="leadBusiness">Business Name</label>
                        <input type="text" id="leadBusiness" placeholder="Your Cafe or Restaurant" required>
                    </div>
                    <button type="submit" class="lead-submit">Download Now &rarr;</button>
                </form>
                <p class="lead-privacy">By downloading, you agree to our <a href="/privacy-policy">Privacy Policy</a>. We never spam.</p>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = document.getElementById('leadModalOverlay');
    const closeBtn = document.getElementById('closeLeadModal');
    const leadForm = document.getElementById('leadForm');
    let currentDownloadUrl = '';

    // Function to show modal
    window.showLeadGate = function(url, title, desc) {
        // Check if already submitted in this session
        if (localStorage.getItem('ames_lead_captured')) {
            if (url === 'print') {
                window.print();
            } else {
                window.location.href = url;
            }
            return;
        }

        currentDownloadUrl = url;
        if (title) document.getElementById('leadModalTitle').innerText = title;
        if (desc) document.getElementById('leadModalDesc').innerText = desc;
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submission
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const leadData = {
            name: document.getElementById('leadName').value,
            email: document.getElementById('leadEmail').value,
            business: document.getElementById('leadBusiness').value,
            resource: document.getElementById('leadModalTitle').innerText,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage (as a simple lead capture for now)
        let leads = JSON.parse(localStorage.getItem('ames_leads') || '[]');
        leads.push(leadData);
        localStorage.setItem('ames_leads', JSON.stringify(leads));
        localStorage.setItem('ames_lead_captured', 'true');

        // Optional: Send to a real backend here if needed
        console.log('Lead captured:', leadData);

        // Close modal and trigger download/action
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        if (currentDownloadUrl === 'print') {
            window.print();
        } else if (currentDownloadUrl) {
            // If it's a PDF link, we might want to trigger a download or navigate
            window.location.href = currentDownloadUrl;
        }
    });

    // Intercept download buttons/links
    const downloadButtons = document.querySelectorAll('.resource-btn, .btn-print, .lm-cta-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Skip if it's just a navigation link to another checklist page
            if (this.href && (this.href.includes('checklist') || this.href.includes('template')) && !this.href.endsWith('.pdf')) {
                // If it's a page link, we'll gate the action ON that page (like printing or actual PDF download)
                return;
            }

            e.preventDefault();
            const url = this.classList.contains('btn-print') ? 'print' : this.href;
            const title = this.closest('.resource-card, .lm-hero, .lm-cta-strip')?.querySelector('h1, h2, h3')?.innerText || 'Food Safety Resource';
            
            showLeadGate(url, title);
        });
    });
});
