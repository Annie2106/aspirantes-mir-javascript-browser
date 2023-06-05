//Menu
const menu = [
  {
    name: 'Home',
    link: '/',
    items: []
  },
  {
    name: 'About',
    link: '/about',
    items: []
  },
  {
    name: 'Products',
    link: '/products',
    items: [
      {
        name: 'Product 1',
        link: '/products/1',
        items: []
      },
      {
        name: 'Product 2',
        link: '/products/2',
        items: [
          {
            name: 'Product 2.1',
            link: '/products/2/1',
            items: []
          },
        ]
      },
    ]
  },
  {
    name: 'Services',
    link: '/services',
    items: [
      {
        name: 'Service 1',
        link: '/services/1',
        items: [
          {
            name: 'Service 1.1',
            link: '/services/1/1',
            items: []
          },
        ]
      },
      {
        name: 'Service 2',
        link: '/services/2',
        items: [
          {
            name: 'Service 2.1',
            link: '/services/2/1',
            items: []
          },
          {
            name: 'Service 2.2',
            link: '/services/2/2',
            items: []
          },
        ]
      },
    ]
  },
]

// Función recursiva para crear el menú
function createMenu(menuData, parentElement) {
    const ul = document.createElement('ul');
  
    menuData.forEach(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = item.name;
      link.setAttribute('href', item.link);
      li.appendChild(link);
  
      if (item.items.length > 0) {
        li.classList.add('has-submenu');
        const submenu = createMenu(item.items, li);
        li.appendChild(submenu);
      }
      ul.appendChild(li);
    });
    parentElement.appendChild(ul);
    return ul;
  }
  
  
  // Función para cambiar la clase CSS del elemento activo
  function setActiveMenuItem(event) {
    const currentActive = document.querySelector('.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }
  
    const menuItem = event.target.closest('li');
    menuItem.classList.add('active');
  }
  
  // Agregar el menú al contenedor principal en el DOM
  const container = document.getElementById('menu-container-menu');
  createMenu(menu, container);
  
  // Agregar eventos de clic a los elementos del menú
  const menuItems = document.querySelectorAll('li > a');
  menuItems.forEach(item => {
    item.addEventListener('click', setActiveMenuItem);
  });
  