document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
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
          more1: document.getElementById('more1'),
          more2: document.getElementById('more2')
      }
  };

  // Tab Switching Functionality
  function setupTabs() {
      DOM.tabs.forEach(tab => {
          tab.addEventListener('click', () => {
              DOM.tabs.forEach(t => t.classList.remove('active'));
              DOM.tabContents.forEach(content => content.classList.remove('active'));
              
              tab.classList.add('active');
              const tabId = tab.getAttribute('data-tab');
              document.getElementById(tabId).classList.add('active');
              window.scrollTo({ top: 0, behavior: 'smooth' });
          });
      });
      
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
    let autoSlide = true;
    let interval;
    let progress = 0;
    const duration = 10000; // 10 seconds
    const progressBar = document.getElementById('progress-bar');

    function showTestimonial(index) {
        DOM.testimonials.forEach(t => t.classList.remove('active'));
        DOM.dots.forEach(d => d.classList.remove('active'));

        DOM.testimonials[index].classList.add('active');
        DOM.dots[index].classList.add('active');
        currentTestimonial = index;
        resetProgress();
    }

    function nextSlide() {
        currentTestimonial = (currentTestimonial + 1) % DOM.testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevSlide() {
        currentTestimonial = (currentTestimonial - 1 + DOM.testimonials.length) % DOM.testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function resetProgress() {
        progress = 0;
        if (progressBar) progressBar.style.width = '0%';
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            progress += 100;
            if (progressBar) progressBar.style.width = `${(progress / duration) * 100}%`;
            if (progress >= duration) {
                nextSlide();
            }
        }, 100);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Setup dot clicks
    DOM.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            autoSlide = true;
            showTestimonial(index);
        });
    });

    // Manual buttons
    document.getElementById('next-slide')?.addEventListener('click', () => {
        autoSlide = true;
        nextSlide();
    });

    document.getElementById('prev-slide')?.addEventListener('click', () => {
        autoSlide = true;
        prevSlide();
    });

    // Click to toggle play/pause
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.addEventListener('click', () => {
            autoSlide = !autoSlide;
            if (autoSlide) startAutoSlide();
            else stopAutoSlide();
        });
    }

    showTestimonial(currentTestimonial);
    startAutoSlide();

    window.addEventListener('beforeunload', stopAutoSlide);
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
              
              if (isExpanded) {
                  detailedBio.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
          });
      });
  }

  // Image Carousels for Achievements
  function setupImageCarousels() {
    let myIndex = 0;
    function carousel() {
        const x = document.getElementsByClassName("home");
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) myIndex = 1;
        if (x[myIndex-1]) x[myIndex-1].style.display = "block";
        setTimeout(carousel, 5000);
    }
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
    
    if (document.getElementsByClassName("slides10").length) carousel10();
    if (document.getElementsByClassName("slides12").length) carousel12();
    if (document.getElementsByClassName("home").length) carousel();
  }

  // Contact Form Submission
  function setupContactForm() {
      if (!DOM.contactForm) return;

      // Remove any existing event listeners
      const form = DOM.contactForm;
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);
      DOM.contactForm = newForm;

      let isSubmitting = false;

      DOM.contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          if (isSubmitting) return;
          isSubmitting = true;
          
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.innerHTML;
          
          // Show loading state
          submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
          submitBtn.disabled = true;

          try {
              // Create form data
              const formData = new FormData(this);
              
              // Add unique submission ID
              const submissionId = 'sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
              formData.append('submissionId', submissionId);

              // Simple validation
              if (!this.checkValidity()) {
                  throw new Error('Please fill in all required fields');
              }

              // Submit to Google Apps Script
              const response = await fetch(this.action, {
                  method: 'POST',
                  body: formData,
                  redirect: 'follow'
              });

              // Show success (we can't reliably parse response due to CORS)
              showDialog('success', 'Thank you! Your message has been received.');
              this.reset();
              
          } catch (error) {
              console.error('Error:', error);
              showDialog('error', error.message || 'Submission failed. Please try again or contact us directly.');
          } finally {
              // Reset button after minimum 1 second
              setTimeout(() => {
                  submitBtn.innerHTML = originalBtnText;
                  submitBtn.disabled = false;
                  isSubmitting = false;
              }, 1000);
          }
      });

      // Dialog functions
      function showDialog(type, message) {
          const dialogOverlay = document.getElementById('dialogOverlay');
          const dialog = document.getElementById(type + 'Dialog');
          const messageElement = document.getElementById(type + 'Message');
          
          messageElement.textContent = message;
          dialogOverlay.classList.add('active');
          dialog.classList.add('active');
      }

      // Close dialog handlers
      document.getElementById('dialogCloseBtn')?.addEventListener('click', closeDialogs);
      document.getElementById('errorDialogCloseBtn')?.addEventListener('click', closeDialogs);

      function closeDialogs() {
          document.getElementById('dialogOverlay').classList.remove('active');
          document.getElementById('successDialog').classList.remove('active');
          document.getElementById('errorDialog').classList.remove('active');
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
      
      document.querySelectorAll('.feature-card, .category-card, .faculty-card').forEach(element => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
      
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll();
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