/**
 * Premium FAQ Accordion
 * Handles smooth expand/collapse with single-open functionality
 * Modern, production-ready accordion with accessibility support
 */

class FAQAccordion {
    constructor(containerOrSelector) {
        // Accept both element and selector string
        if (typeof containerOrSelector === 'string') {
            this.container = document.querySelector(containerOrSelector);
        } else {
            this.container = containerOrSelector;
        }
        
        if (!this.container) return;

        this.items = this.container.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            // Add click handler - bind 'this' to preserve context
            question.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleItem(item);
            });

            // Set initial aria-expanded attribute
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            // Store answer reference for max-height calculation
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                item.dataset.answerHeight = answer.scrollHeight + 'px';
            }
        });
    }

    toggleItem(clickedItem) {
        const isCurrentlyActive = clickedItem.classList.contains('active');

        // Close all other items
        this.items.forEach(item => {
            if (item !== clickedItem && item.classList.contains('active')) {
                this.closeItem(item);
            }
        });

        // Toggle clicked item
        if (isCurrentlyActive) {
            this.closeItem(clickedItem);
        } else {
            this.openItem(clickedItem);
        }
    }

    openItem(item) {
        item.classList.add('active');

        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question) {
            question.setAttribute('aria-expanded', 'true');
        }

        if (answer) {
            // Update max-height for smooth animation
            const height = answer.scrollHeight;
            answer.style.maxHeight = height + 'px';
        }
    }

    closeItem(item) {
        item.classList.remove('active');

        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question) {
            question.setAttribute('aria-expanded', 'false');
        }

        if (answer) {
            answer.style.maxHeight = '0';
        }
    }

    // Public method to open item by index
    openByIndex(index) {
        if (index >= 0 && index < this.items.length) {
            this.toggleItem(this.items[index]);
        }
    }

    // Public method to close all items
    closeAll() {
        this.items.forEach(item => {
            if (item.classList.contains('active')) {
                this.closeItem(item);
            }
        });
    }

    // Public method to destroy and cleanup
    destroy() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.removeEventListener('click', this.toggleItem);
            }
        });
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all FAQ sections
    const faqContainers = document.querySelectorAll('.faq-items');
    if (faqContainers.length > 0) {
        faqContainers.forEach(container => {
            new FAQAccordion(container);
        });
    }
});

// Make FAQAccordion globally available
window.FAQAccordion = FAQAccordion;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQAccordion;
}
