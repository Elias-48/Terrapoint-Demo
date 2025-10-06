// Language Switcher Component
document.addEventListener('DOMContentLoaded', function() {
    // Create language switcher HTML
    const languageSwitcher = `
        <div class="relative group">
            <button id="language-toggle" class="flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
                <i class="fas fa-globe"></i>
                <span class="ml-1 text-sm font-medium" id="current-lang">ES</span>
                <i class="fas fa-chevron-down text-xs ml-1"></i>
            </button>
            <div id="language-dropdown" class="hidden absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-lang="es">
                    <i class="fas fa-check mr-2 text-green-500 lang-check" data-lang="es"></i>
                    Español
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-lang="en">
                    <i class="fas fa-check mr-2 text-green-500 hidden" data-lang="en"></i>
                    English
                </a>
            </div>
        </div>
    `;

    // Add language switcher to header
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        headerActions.insertAdjacentHTML('afterbegin', languageSwitcher);
    }

    // Language toggle functionality
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLang = document.getElementById('current-lang');
    const langChecks = document.querySelectorAll('.lang-check');

    if (languageToggle && languageDropdown) {
        // Toggle dropdown
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageDropdown.contains(e.target) && e.target !== languageToggle) {
                languageDropdown.classList.add('hidden');
            }
        });

        // Handle language selection
        document.querySelectorAll('[data-lang]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = item.getAttribute('data-lang');
                if (lang) {
                    // Update UI
                    currentLang.textContent = lang.toUpperCase();
                    langChecks.forEach(check => {
                        check.classList.toggle('hidden', check.getAttribute('data-lang') !== lang);
                    });
                    
                    // Store preference
                    localStorage.setItem('preferred-language', lang);
                    document.documentElement.lang = lang;
                    
                    // Close dropdown
                    languageDropdown.classList.add('hidden');
                    
                    // Dispatch event for other components to update
                    document.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
                }
            });
        });
    }

    // Initialize language from localStorage or browser preference
    function initLanguage() {
        const savedLang = localStorage.getItem('preferred-language') || 
                         (navigator.language || navigator.userLanguage).substring(0, 2);
        const lang = ['es', 'en'].includes(savedLang) ? savedLang : 'es';
        
        // Update UI
        currentLang.textContent = lang.toUpperCase();
        langChecks.forEach(check => {
            check.classList.toggle('hidden', check.getAttribute('data-lang') !== lang);
        });
        
        // Set HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Initialize
    initLanguage();
});
