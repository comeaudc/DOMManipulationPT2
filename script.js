//Part One
//Select and cache the <main> element in a variable named mainEl.
let mainEl = document.getElementsByTagName('main');

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
mainEl[0].style.backgroundColor = 'var(--main-bg)';

//Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl[0].innerHTML = `<h1>DOM Manipulation</h1>`;
// Add a class of flex-ctr to mainEl.
mainEl[0].classList.add(`flex-ctr`);

//Part 2
//Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById(`top-menu`);

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%';

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add(`flex-around`);

//Part 3
// Menu data structure
// var menuLinks = [
//   { text: 'about', href: '/about' },
//   { text: 'catalog', href: '/catalog' },
//   { text: 'orders', href: '/orders' },
//   { text: 'account', href: '/account' },
// ];

let menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog',
    href: '#',
    subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ],
  },
  {
    text: 'orders',
    href: '#',
    subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ],
  },
  {
    text: 'account',
    href: '#',
    subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ],
  },
];

//   Iterate over the entire menuLinks array and for each "link" object:
//   Create an <a> element.
//   On the new element, add an href attribute with its value set to the href property of the "link" object.
//   Set the new element's content to the value of the text property of the "link" object.
//   Append the new element to the topMenuEl element.
menuLinks.forEach((el) => {
  let link = document.createElement('a');
  link.setAttribute('href', el.href);
  link.textContent = el.text;
  topMenuEl.appendChild(link);
});

//Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
let subMenuEl = document.getElementById(`sub-menu`);

// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = `100%`;

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = `var(--sub-menu-bg)`;

// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add(`flex-around`);

//Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = `absolute`;

// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = `0`;

// Select and cache the ALL of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
let topMenuLinks = document.querySelectorAll(`a`);

// Variable to store current link obj
let currentSubLink;

// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener(`click`, (e) => {
  // The first line of code of the event listener function should call the event object's preventDefault() method.
  e.preventDefault();

  // The second line of code of the function should immediately return if the element clicked was not an <a> element.
  if (e.target.localName !== `a`) return;

  //   The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it. Null = false
  if (e.target.getAttribute(`class`)) {
    // If the target comes back true. Remove class
    e.target.classList.remove(`active`); //removes
  } else {
    topMenuLinks.forEach((link) => {
      link.classList.remove(`active`);
    });
    //else add the class
    e.target.classList.add(`active`); //add
  }
  //Search/Iterate through menuLinks array and check if current event target matches
  //If matches check if it has sublink property
  for (let link of menuLinks) {
    // if current event target matches and it has subLinks

    if (e.target.textContent === `about`) {
      mainEl[0].innerHTML = `<h1>ABOUT</h1>`;
      break;
    } else if (
      link.text === e.target.textContent &&
      link.subLinks &&
      e.target.getAttribute(`class`)
    ) {
      currentSubLink = link.subLinks;
      buildSubMenu(currentSubLink);
      subMenuEl.style.top = `100%`;
      break;
    } else {
      subMenuEl.style.top = `0`;
    }
  }
});

//Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener(`click`, (e) => {
  // The first line of code of the event listener function should call the event object's preventDefault() method.
  e.preventDefault();

  // The second line of code within the function should immediately return if the element clicked was not an <a> element.
  if (e.target.localName !== `a`) return;
  // Log the content of the <a> to verify the handler is working.
  //   console.log(e.target)

  // Next, the event listener should set the CSS top property of subMenuEl to 0.
  subMenuEl.style.top = `0`;

  // Remove the active class from each <a> element in topMenuLinks.
  topMenuLinks.forEach((link) => {
    link.classList.remove(`active`);
  });

  // Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
  mainEl[0].innerHTML = `<h1>${e.target.textContent.toUpperCase()}</h1>`;
  // If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
});

// Helper Functions - not attached to anything at all yet
//BuildsubMenu
function buildSubMenu(subLinks) {
  //     Clear the current contents of subMenuEl.
  subMenuEl.innerHTML = ``;
  // Iterate over the subLinks array, passed as an argument, and for each "link" object:
  for (let link of subLinks) {
    // Create an <a> element.
    let anchor = document.createElement(`a`);

    // Add an href attribute to the <a>, with the value set by the href property of the "link" object.
    anchor.setAttribute(`href`, link.href);

    // Set the element's content to the value of the text property of the "link" object.
    anchor.textContent = link.text;

    // Append the new element to the subMenuEl.
    subMenuEl.appendChild(anchor);
  }
}
