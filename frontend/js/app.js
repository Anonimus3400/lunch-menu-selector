const randomBtn = document.getElementById('random-btn');
const result = document.getElementById('random-result');
const orderList = document.getElementById('order-list');
const total = document.getElementById('total');
const calcBtn = document.getElementById('calculate-btn');
const form = document.getElementById('add-form');
const dishList = document.getElementById('dish-list');

// Отримати список страв із бекенду
async function loadDishes() {
  const res = await fetch('https://your-backend-url/dishes');
  const data = await res.json();
  renderDishList(data);
}

// Відобразити страви у списку
function renderDishList(dishes) {
  dishList.innerHTML = '';
  dishes.forEach(dish => {
    const li = document.createElement('li');
    li.textContent = `${dish.name} — ${dish.price} грн`;
    li.addEventListener('click', () => {
      order.push(dish);
      renderOrder();
    });
    dishList.appendChild(li);
  });
}

// Викликаємо одразу після завантаження
loadDishes();

let order = [];

randomBtn.addEventListener('click', async () => {
  result.classList.remove('show');
  const res = await fetch('https://your-backend-url/random');
  const data = await res.json();

  setTimeout(() => {
    result.textContent = `Обрано: ${data.name} — ${data.price} грн`;
    result.classList.add('show');
    order.push(data);
    renderOrder();
  }, 500);
});

calcBtn.addEventListener('click', async () => {
  const prices = order.map(item => item.price);
  const res = await fetch('https://your-backend-url/calculate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ prices })
  });
  const data = await res.json();
  total.textContent = data.total;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const price = parseFloat(form.price.value);
  order.push({ name, price });
  renderOrder();
  form.reset();
});

function renderOrder() {
  orderList.innerHTML = '';
  order.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} грн`;
    orderList.appendChild(li);
  });
}
