/**
 * Aksharam Academy Website Script
 * Handles all interactive functionality including:
 * - Tab switching
 * - Testimonial slider
 * - Faculty bio expand/collapse
 * - Image carousels
 * - Form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements for better performance
    const DOM = {
      tabs: document.querySelectorAll('.nav-tabs li'),
      tabContents: document.querySelectorAll('.tab-content'),
      footerLinks: document.querySelectorAll('footer a[data-tab]'),
      testimonials: document.querySelectorAll('.testimonial'),
      dots: document.querySelectorAll('.dot'),
      enrollBtn: document.getElementById('enroll-now'),
      contactForm: document.getElementById('contactForm'),
      readMoreBtns: document.querySelectorAll('.read-more-btn'),
      featureCards: {
        more: document.getElementById('more'),
        core: document.getElementById('core'),
        core1: document.getElementById('core1')
      }
    };
  
    // Tab Switching Functionality
    function setupTabs() {
      DOM.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs and contents
          DOM.tabs.forEach(t => t.classList.remove('active'));
          DOM.tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked tab and corresponding content
          tab.classList.add('active');
          const tabId = tab.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
          
          // Smooth scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
      
      // Footer tab links
      DOM.footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const tabId = link.getAttribute('data-tab');
          const tabToActivate = document.querySelector(`.nav-tabs li[data-tab="${tabId}"]`);
          if (tabToActivate) tabToActivate.click();
        });
      });
    }
  
    // Feature Card Navigation
    function setupFeatureCards() {
      Object.values(DOM.featureCards).forEach(btn => {
        if (btn) {
          btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            const tabToActivate = document.querySelector(`.nav-tabs li[data-tab="${tabId}"]`);
            if (tabToActivate) tabToActivate.click();
          });
        }
      });
    }
  
    // Testimonial Slider
    function setupTestimonialSlider() {
      let currentTestimonial = 0;
      
      function showTestimonial(index) {
        DOM.testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        DOM.dots.forEach(dot => dot.classList.remove('active'));
        
        DOM.testimonials[index].classList.add('active');
        DOM.dots[index].classList.add('active');
        currentTestimonial = index;
      }
      
      DOM.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
      });
      
      // Auto-rotate testimonials every 10 seconds
      const testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % DOM.testimonials.length;
        showTestimonial(currentTestimonial);
      }, 10000);
      
      // Cleanup interval when leaving page
      window.addEventListener('beforeunload', () => {
        clearInterval(testimonialInterval);
      });
    }
  
    // Enroll Now Button
    function setupEnrollButton() {
      if (DOM.enrollBtn) {
        DOM.enrollBtn.addEventListener('click', () => {
          const contactTab = document.querySelector('.nav-tabs li[data-tab="contact"]');
          if (contactTab) contactTab.click();
        });
      }
    }
  
    // Faculty Read More Functionality
    function setupReadMoreButtons() {
      DOM.readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const detailedBio = this.previousElementSibling;
          const isExpanded = detailedBio.classList.toggle('show');
          
          this.classList.toggle('expanded');
          this.textContent = isExpanded ? 'Read Less' : 'Read More';
          
          // Smooth scroll to maintain visibility if bio is expanded
          if (isExpanded) {
            detailedBio.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      });
    }
  
    // Image Carousels for Achievements
    function setupImageCarousels() {
      // Class 10 Achievements Carousel
      let myIndex10 = 0;
      function carousel10() {
        const x = document.getElementsByClassName("slides10");
        for (let i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        myIndex10++;
        if (myIndex10 > x.length) myIndex10 = 1;
        if (x[myIndex10-1]) x[myIndex10-1].style.display = "block";
        setTimeout(carousel10, 3000);
      }
      
      // Class 12 Achievements Carousel
      let myIndex12 = 0;
      function carousel12() {
        const y = document.getElementsByClassName("slides12");
        for (let i = 0; i < y.length; i++) {
          y[i].style.display = "none";
        }
        myIndex12++;
        if (myIndex12 > y.length) myIndex12 = 1;
        if (y[myIndex12-1]) y[myIndex12-1].style.display = "block";
        setTimeout(carousel12, 3000);
      }
      
      // Initialize both carousels
      if (document.getElementsByClassName("slides10").length) carousel10();
      if (document.getElementsByClassName("slides12").length) carousel12();
    }
  
    // Contact Form Submission
    function setupContactForm() {
      if (DOM.contactForm) {
        DOM.contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const formData = new FormData(DOM.contactForm);
          const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          const dialogOverlay = document.getElementById('dialogOverlay');
          const successDialog = document.getElementById('successDialog');
          const errorDialog = document.getElementById('errorDialog');
          const successMessage = document.getElementById('successMessage');
          const errorMessage = document.getElementById('errorMessage');
          const userName = document.getElementById('name').value;

          // Show loading state
          submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
          submitBtn.disabled = true;

          fetch(DOM.contactForm.action, {
            method: 'POST',
            body: formData
          })
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
          })
          .then(data => {
            if (data.result === 'success') {
              // Show success dialog
              successMessage.textContent = `Thank you, ${userName}! Your message has been received. We will contact you soon.`;
              dialogOverlay.classList.add('active');
              successDialog.classList.add('active');

              // Reset form
              DOM.contactForm.reset();
            } else {
              throw new Error(data.error || 'Unknown error from server');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // Show error dialog with specific message
            errorMessage.textContent = `Error: ${error.message}. Please try again or contact us directly at +91 98717 33703 or aksharamacademy@gmail.com`;
            dialogOverlay.classList.add('active');
            errorDialog.classList.add('active');
          })
          .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          });
        });

        // Close dialog handlers
        document.getElementById('dialogCloseBtn').addEventListener('click', function() {
          document.getElementById('dialogOverlay').classList.remove('active');
          document.getElementById('successDialog').classList.remove('active');
        });

        document.getElementById('errorDialogCloseBtn').addEventListener('click', function() {
          document.getElementById('dialogOverlay').classList.remove('active');
          document.getElementById('errorDialog').classList.remove('active');
        });
      }
    }
  
    // Scroll Animations
    function setupScrollAnimations() {
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .category-card, .faculty-card');
        
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      };
      
      // Set initial state for animation
      document.querySelectorAll('.feature-card, .category-card, .faculty-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
      
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll(); // Run once on page load
    }
  
    // Initialize all functionality
    function init() {
      setupTabs();
      setupFeatureCards();
      setupTestimonialSlider();
      setupEnrollButton();
      setupReadMoreButtons();
      setupImageCarousels();
      setupContactForm();
      setupScrollAnimations();
    }
  
    // Start the application
    init();
  });