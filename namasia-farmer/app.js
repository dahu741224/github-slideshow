const app = document.getElementById('app');

const routes = {
  '/home': renderHome,
  '/pos': renderPos,
  '/inventory': renderInventory,
  '/orders': renderOrders,
  '/dashboard': renderDashboard
};

function currentPath() {
  if (location.hash.startsWith('#/')) return location.hash.slice(1);
  return location.pathname === '/' ? '/home' : location.pathname;
}

function navigate() {
  const path = currentPath();
  const view = routes[path] || renderHome;
  app.innerHTML = view();
}

function renderHome() {
  return `
    <section class="card">
      <h2>品牌官網 /home</h2>
      <p>那瑪夏小農夫：山林友善耕作、每日新鮮配送。</p>
      <ul>
        <li>營業時間：週一至週六 08:00-18:00</li>
        <li>地點：高雄市那瑪夏區（示意）</li>
        <li>下單入口：LINE / 現場 POS / 網頁訂購</li>
      </ul>
    </section>
  `;
}

function renderPos() {
  return `
    <section class="card">
      <h2>POS 收銀 /pos</h2>
      <div class="grid">
        <div><strong>有機奶油萵苣</strong><br/>$35<button>+1</button></div>
        <div><strong>高麗菜</strong><br/>$50<button>+1</button></div>
      </div>
      <hr/>
      <label>折扣金額<input type="number" placeholder="例如 20" /></label>
      <label>付款方式
        <select>
          <option>cash</option>
          <option>bank_transfer</option>
          <option>linepay_reserved</option>
        </select>
      </label>
      <button onclick="alert('MVP: 送出到 POST /orders')">建立訂單</button>
    </section>
  `;
}

function renderInventory() {
  return `
    <section class="card">
      <h2>蔬菜庫存 /inventory</h2>
      <p>支援進貨、盤點、損耗、警戒、可賣量。</p>
      <label>商品 ID<input placeholder="P-LETTUCE-001" /></label>
      <label>異動類型
        <select>
          <option>purchase</option>
          <option>count_adjust</option>
          <option>waste</option>
        </select>
      </label>
      <label>數量<input type="number" /></label>
      <button onclick="alert('MVP: 送出到 POST /inventory/txn')">送出異動</button>
    </section>
  `;
}

function renderOrders() {
  return `
    <section class="card">
      <h2>LINE 訂單後台 /orders</h2>
      <p>待處理訂單（pending）→ accepted → preparing → completed</p>
      <div class="card">
        <strong>ORD-20260223-0007</strong>
        <p>陳小姐 / 17:30 自取 / $400</p>
        <button>接單</button>
        <button>出單</button>
        <button>完成</button>
      </div>
    </section>
  `;
}

function renderDashboard() {
  return `
    <section class="card">
      <h2>六維指揮中心 /dashboard</h2>
      <div class="grid">
        <div class="card"><strong>今日營收</strong><p>$17,590</p></div>
        <div class="card"><strong>毛利</strong><p>$6,670</p></div>
        <div class="card"><strong>損耗成本</strong><p>$920</p></div>
        <div class="card"><strong>客單價</strong><p>$409</p></div>
      </div>
      <p>趨勢圖：MVP 先顯示 API 資料 JSON，下一版接 Chart.js。</p>
    </section>
  `;
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);
