//import {navigateTo} from '../../routes.js';

export const feedConstruct =  () => {
    const newRootElement = document.createElement('div');
    const contentnewElement = `
    <section class="section-exemple-feed">
    <header>
    <nav>
      <a class="logo" href="/feed"><img src="./img/logo4.png" class="img-logo" alt=""></a>
      <div class="mobile-menu">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      <ul class="nav-list">
        <li><a href="#">Perfil</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Terror</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </nav>
  </header>
  </section>`;

  class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();
newRootElement.innerHTML = contentnewElement; 

/*const btn = newRootElement.querySelector('.submit-btn');
console.log(btn);

btn.addEventListener('click', () => {
    navigateTo('/feed')
})*/
/*Function - class */

  
return newRootElement

}