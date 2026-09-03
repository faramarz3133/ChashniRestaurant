(function () {
  "use strict";

  var box = document.getElementById("foodDetails");
  if (!box) return;

  function getId() {
    try {
      var id = new URLSearchParams(window.location.search).get("id");
      return parseInt(id, 10) || 1;
    } catch (e) { return 1; }
  }

  var foods = window.CHASHNI_FOODS || [];
  var food = foods.find(function (f) { return f.id === getId(); }) || foods[0];
  if (!food) { box.innerHTML = "<p>غذا یافت نشد.</p>"; return; }

  document.title = food.name + " | رستوران چاشنی";

  var thumbs = [food.img,
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop"];

  box.innerHTML =
    '<div class="details-media reveal visible">' +
      '<img id="mainImg" src="' + food.img + '" alt="' + food.name + '">' +
      '<div class="details-thumbs">' +
        thumbs.map(function (t, i) {
          return '<img src="' + t + '" alt="نمای ' + (i + 1).toLocaleString("fa-IR") + '" class="' + (i === 0 ? "active" : "") + '">';
        }).join("") +
      "</div>" +
    "</div>" +
    '<div class="details-info reveal visible">' +
      '<span class="pill">' + food.catFa + "</span>" +
      "<h1>" + food.name + "</h1>" +
      '<div class="details-meta">' +
        '<span>★ ' + food.rating.toLocaleString("fa-IR") + " از ۵</span>" +
        "<span>•</span><span>" + food.orders.toLocaleString("fa-IR") + " سفارش موفق</span>" +
        "<span>•</span><span>⏱ آماده‌سازی: ۲۰ تا ۳۰ دقیقه</span>" +
      "</div>" +
      '<p class="details-desc">' + food.desc + " این غذا با تازه‌ترین مواد اولیه روز و زیر نظر سرآشپز ارشد رستوران چاشنی تهیه می‌شود و طعمی به‌یادماندنی دارد.</p>" +
      "<h3 style='margin-bottom:10px;font-size:1rem'>مواد تشکیل‌دهنده:</h3>" +
      '<ul class="ing-list">' + food.ingredients.map(function (g) { return "<li>" + g + "</li>"; }).join("") + "</ul>" +
      '<div class="order-box">' +
        '<div class="order-row">' +
          '<div class="qty" role="group" aria-label="تعداد غذا">' +
            '<button type="button" id="qtyMinus" aria-label="کم کردن">−</button>' +
            '<output id="qtyVal">۱</output>' +
            '<button type="button" id="qtyPlus" aria-label="زیاد کردن">+</button>' +
          "</div>" +
          '<div class="total-price"><small>مبلغ قابل پرداخت</small><span id="totalPrice">' +
            window.CHASHNI_price(food.price) + "</span></div>" +
        "</div>" +
        '<div class="order-row" style="margin-top:16px">' +
          '<button class="btn btn-primary btn-block" id="orderBtn" type="button">افزودن به سفارش 🛒</button>' +
        "</div>" +
        '<div class="alert success" id="orderMsg" role="status"></div>' +
        '<div class="nutrition">' +
          "<div><strong>" + (320 + food.id * 12).toLocaleString("fa-IR") + "</strong><span>کالری</span></div>" +
          "<div><strong>" + (18 + (food.id % 5)).toLocaleString("fa-IR") + " گرم</strong><span>پروتئین</span></div>" +
          "<div><strong>" + (25 + (food.id % 7)).toLocaleString("fa-IR") + " دقیقه</strong><span>آماده‌سازی</span></div>" +
          "<div><strong>★ " + food.rating.toLocaleString("fa-IR") + "</strong><span>امتیاز</span></div>" +
        "</div>" +
      "</div>" +
    "</div>";

  var mainImg = document.getElementById("mainImg");
  box.querySelectorAll(".details-thumbs img").forEach(function (th) {
    th.addEventListener("click", function () {
      box.querySelectorAll(".details-thumbs img").forEach(function (x) { x.classList.remove("active"); });
      th.classList.add("active");
      mainImg.src = th.src;
    });
  });

  /* Quantity controls */
  var qty = 1;
  var qtyVal = document.getElementById("qtyVal");
  var totalEl = document.getElementById("totalPrice");
  function faDigit(n) { return n.toLocaleString("fa-IR"); }
  function render() {
    qtyVal.textContent = faDigit(qty);
    totalEl.textContent = (food.price * qty).toLocaleString("fa-IR") + " تومان";
  }
  document.getElementById("qtyPlus").addEventListener("click", function () {
    if (qty < 10) { qty++; render(); }
  });
  document.getElementById("qtyMinus").addEventListener("click", function () {
    if (qty > 1) { qty--; render(); }
  });

  document.getElementById("orderBtn").addEventListener("click", function () {
    var msg = document.getElementById("orderMsg");
    msg.textContent = "✓ " + faDigit(qty) + " عدد «" + food.name + "» به سفارش شما اضافه شد. برای نهایی‌کردن، به صفحه رزرو میز بروید.";
    msg.classList.add("show");
  });

  /* Related dishes */
  var rel = document.getElementById("relatedGrid");
  if (rel) {
    rel.innerHTML = foods.filter(function (f) { return f.cat === food.cat && f.id !== food.id; })
      .concat(foods.filter(function (f) { return f.cat !== food.cat; }))
      .slice(0, 4).map(function (f) {
        return '<article class="dish-card"><div class="dish-media"><a href="food-details.html?id=' + f.id + '">' +
          '<img src="' + f.img + '" alt="' + f.name + '" loading="lazy"></a>' +
          '<span class="dish-cat">' + f.catFa + '</span>' +
          '<span class="dish-price">' + window.CHASHNI_price(f.price) + "</span></div>" +
          '<div class="dish-body"><h3><a href="food-details.html?id=' + f.id + '">' + f.name + '</a></h3><p>' + f.desc + "</p>" +
          '<div class="dish-foot"><span class="rating">★ ' + f.rating.toLocaleString("fa-IR") + '</span>' +
          '<a class="dish-link" href="food-details.html?id=' + f.id + '">جزئیات ←</a></div></div></article>';
      }).join("");
  }
})();
