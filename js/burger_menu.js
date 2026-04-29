document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.burger_icon');
    const mobileMenu = document.querySelector('.menu-sml');
    const mainContent = document.querySelector('main');
    
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function() {
            if (mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
                if (mainContent) {
                    mainContent.style.marginTop = '0';
                }
                burgerBtn.querySelector('span').textContent = 'menu';
            } else {
                mobileMenu.style.display = 'flex';
                if (mainContent) {
                    const menuHeight = mobileMenu.offsetHeight;
                    mainContent.style.marginTop = menuHeight + 'px';
                }
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                mobileMenu.style.display = 'none';
                if (mainContent) {
                    mainContent.style.marginTop = '0';
                }
                burgerBtn.querySelector('span').textContent = 'menu';
            }
        });
    }
});