// Initialize logo functionality
const initLogo = () => {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    logo.style.cursor = 'pointer';
  }
};

// Handle login click
const initLogin = () => {
  const loginLink = document.querySelector('a[href="#"].nav-link');
  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }
};

// Handle Why Water click
const initWhyWater = () => {
  const whyWaterLink = document.querySelector('a.nav-link[href="#"]');
  if (whyWaterLink) {
    whyWaterLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'why-water.html';
    });
  }
};

// Handle dropdown menu clicks
const initDropdowns = () => {
  document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.textContent.trim();
      
      switch(action) {
        case 'Donate':
          window.location.href = 'donate.html';
          break;
        case 'Fundraise':
          window.location.href = 'fundraise.html';
          break;
        case 'Volunteer':
          window.location.href = 'volunteer.html';
          break;
        case 'Our Story':
          window.location.href = 'our-story.html';
          break;
        case 'Impact':
          window.location.href = 'impact.html';
          break;
        case 'Team':
          window.location.href = 'team.html';
          break;
      }
    });
  });
};

// Donation functionality
const initDonation = () => {
  // Elements
  const donateOptions = document.querySelectorAll('.donate-option');
  const paymentOptions = document.getElementById('paymentOptions');
  const paymentMethodOptions = document.querySelectorAll('.payment-option');
  const donationModal = document.getElementById('donationModal');
  const donationAmount = document.getElementById('donationAmount');
  const closeModalBtn = document.getElementById('closeModalButton');
  const modalOverlay = document.getElementById('closeModal');
  const donateButton = document.getElementById('donateButton');
  const donateSection = document.getElementById('donateSection');
  const customAmountContainer = document.getElementById('customAmountContainer');
  const customAmountInput = document.getElementById('customAmount');
  const submitCustomAmount = document.getElementById('submitCustomAmount');

  // Donate button scroll and section click
  if (donateButton && donateSection) {
    donateButton.addEventListener('click', (e) => {
      e.preventDefault();
      donateSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });

    donateSection.style.cursor = 'pointer';
    donateSection.addEventListener('click', () => {
      window.location.href = 'donate.html';
    });
  }

  // Track selected amount
  let selectedAmount = '10';

  // Donation amount selection
  if (donateOptions.length > 0) {
    donateOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Handle "Other" option
        if (this.dataset.amount === 'other') {
          if (customAmountContainer) {
            customAmountContainer.style.display = 'block';
          }
          return;
        }
        
        // Hide custom amount if showing
        if (customAmountContainer) {
          customAmountContainer.style.display = 'none';
        }
        
        // Update UI
        donateOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        selectedAmount = this.dataset.amount;
        
        // Show payment options
        if (paymentOptions) {
          paymentOptions.classList.add('active');
          if (donationAmount) {
            donationAmount.textContent = selectedAmount;
          }
        }
      });
    });
  }

  // Custom amount submission
  if (submitCustomAmount && customAmountInput) {
    submitCustomAmount.addEventListener('click', function() {
      const amount = customAmountInput.value;
      if (amount && amount > 0) {
        selectedAmount = amount;
        if (donationAmount) {
          donationAmount.textContent = amount;
        }
        if (paymentOptions) {
          paymentOptions.classList.add('active');
        }
      }
    });
  }

  // Payment method selection
  if (paymentMethodOptions.length > 0) {
    paymentMethodOptions.forEach(method => {
      method.addEventListener('click', function() {
        // Update modal text
        if (donationAmount) {
          donationAmount.textContent = selectedAmount === 'other' ? customAmountInput.value || 'your chosen' : selectedAmount;
        }
        
        // Show modal
        if (donationModal) {
          donationModal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          createConfetti();
        }
      });
    });
  }

  // Close modal
  const closeModal = () => {
    if (donationModal) {
      donationModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Confetti effect
  const createConfetti = () => {
    const colors = ['#FFC400', '#2E9DF7', '#FFFFFF', '#000000'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = -10 + 'px';
      confetti.style.setProperty('--random-translate', 
        (Math.random() > 0.5 ? '' : '-') + Math.random() * 100 + 'px');
      confetti.style.animation = `drop ${Math.random() * 3 + 2}s linear forwards`;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };
};

// Initialize login form
const initLoginForm = () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically validate and process the login
      alert('Login functionality would be implemented here');
      // window.location.href = 'dashboard.html'; // Redirect after login
    });
  }
};

// Highlight current page in navigation
const highlightCurrentPage = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-content a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
};

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initLogo();
  initLogin();
  initWhyWater();
  initDropdowns();
  initDonation();
  initLoginForm();
  highlightCurrentPage();
});