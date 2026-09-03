/* Chashni Restaurant — menu.js : shared food data + rendering + category filtering */
(function () {
  "use strict";

  var FOODS = [
    { id: 1, name: "کباب کوبیده مخصوص", cat: "main", catFa: "غذای اصلی", price: 285000, rating: 4.9, orders: 2310, popular: true, desc: "دو سیخ کباب کوبیده آبدار با گوشت تازه گوسفندی، گوجه کبابی، برنج زعفرانی و کره.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop", ingredients: ["گوشت گوسفندی", "برنج زعفرانی", "گوجه کبابی", "کره", "پیاز", "سماق"] },
    { id: 2, name: "سوپ جو مجلسی", cat: "starter", catFa: "پیش‌غذا", price: 95000, rating: 4.6, orders: 840, popular: false, desc: "سوپ جو کرمی با مرغ ریش‌شده، جعفری تازه و آب‌لیموی طبیعی.", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop", ingredients: ["جو", "مرغ", "هویج", "جعفری", "خامه", "آب‌لیمو"] },
    { id: 3, name: "پیتزا مخصوص چاشنی", cat: "pizza", catFa: "پیتزا", price: 340000, rating: 4.8, orders: 1930, popular: true, desc: "ترکیب گوشت، قارچ، فلفل دلمه، زیتون و پنیر موزارلای کش‌دار با سس مخصوص.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop", ingredients: ["پنیر موزارلا", "گوشت", "قارچ", "فلفل دلمه", "زیتون", "سس مخصوص"] },
    { id: 4, name: "چیزبرگر دوبل", cat: "burger", catFa: "برگر", price: 265000, rating: 4.7, orders: 1560, popular: true, desc: "دو لایه گوشت گریل‌شده، پنیر چدار، کاهو، گوجه و سس دودی با نان بریوش.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", ingredients: ["گوشت گریل", "پنیر چدار", "نان بریوش", "کاهو", "گوجه", "سس دودی"] },
    { id: 5, name: "پاستا آلفردو", cat: "pasta", catFa: "پاستا", price: 295000, rating: 4.8, orders: 1280, popular: true, desc: "پاستای پنه با سس آلفردوی خامه‌ای، مرغ گریل و قارچ با پنیر پارمزان.", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop", ingredients: ["پنه", "سس آلفردو", "مرغ گریل", "قارچ", "پارمزان", "سیر"] },
    { id: 6, name: "سالاد سزار", cat: "starter", catFa: "پیش‌غذا", price: 175000, rating: 4.5, orders: 920, popular: false, desc: "کاهوی رومی، مرغ گریل، نان کروتان، پارمزان و سس سزار خانگی.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", ingredients: ["کاهوی رومی", "مرغ گریل", "کروتان", "پارمزان", "سس سزار"] },
    { id: 7, name: "قورمه‌سبزی سنتی", cat: "main", catFa: "غذای اصلی", price: 245000, rating: 4.9, orders: 1740, popular: false, desc: "خورشت اصیل ایرانی با سبزی تازه، لوبیا قرمز و گوشت گوسفندی با برنج.", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop", ingredients: ["سبزی قورمه", "لوبیا قرمز", "گوشت گوسفندی", "لیموعمانی", "برنج"] },
    { id: 8, name: "ماهی قزل‌آلا کبابی", cat: "main", catFa: "غذای اصلی", price: 385000, rating: 4.7, orders: 660, popular: false, desc: "فیله قزل‌آلای تازه با طعم زعفران و لیمو، سرو با سبزیجات گریل.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop", ingredients: ["فیله قزل‌آلا", "زعفران", "لیمو", "سبزیجات گریل", "روغن زیتون"] },
    { id: 9, name: "پیتزا پپرونی", cat: "pizza", catFa: "پیتزا", price: 315000, rating: 4.6, orders: 1420, popular: false, desc: "پپرونی تند، پنیر موزارلا، سس گوجه ایتالیایی و اورگانو روی خمیر نازک.", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop", ingredients: ["پپرونی", "موزارلا", "سس گوجه", "اورگانو", "خمیر نازک"] },
    { id: 10, name: "برگر قارچ و سوئیسی", cat: "burger", catFa: "برگر", price: 245000, rating: 4.5, orders: 780, popular: false, desc: "گوشت آبدار با قارچ کاراملی، پنیر سوئیسی و سس مایونز سیر.", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800&auto=format&fit=crop", ingredients: ["گوشت", "قارچ کاراملی", "پنیر سوئیسی", "سس سیر", "نان بریوش"] },
    { id: 11, name: "موهیتو کلاسیک", cat: "drink", catFa: "نوشیدنی", price: 85000, rating: 4.7, orders: 2100, popular: false, desc: "ترکیب خنک نعنا تازه، لیمو، سودا و یخ با طعمی اصیل و گوارا.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop", ingredients: ["نعنا تازه", "لیمو", "سودا", "یخ", "شکر"] },
    { id: 12, name: "تیرامیسو ایتالیایی", cat: "dessert", catFa: "دسر", price: 145000, rating: 4.9, orders: 1180, popular: true, desc: "دسر کلاسیک ایتالیایی با لایه‌های ماسکارپونه، قهوه اسپرسو و کاکائو.", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop", ingredients: ["ماسکارپونه", "اسپرسو", "لیدی‌فینگر", "کاکائو", "خامه"] },
    { id: 13, name: "پاستا پنه آرابیاتا", cat: "pasta", catFa: "پاستا", price: 255000, rating: 4.6, orders: 690, popular: false, desc: "سس گوجه تند ایتالیایی با سیر، ریحان تازه و روغن زیتون فرابکر.", img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop", ingredients: ["پنه", "گوجه", "سیر", "ریحان", "روغن زیتون", "فلفل"] },
    { id: 14, name: "شیک شکلات مخصوص", cat: "drink", catFa: "نوشیدنی", price: 110000, rating: 4.8, orders: 1340, popular: false, desc: "شیرشکلات غلیظ با بستنی وانیلی، خامه و سس شکلات تلخ.", img: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=800&auto=format&fit=crop", ingredients: ["شیر", "بستنی وانیلی", "شکلات تلخ", "خامه"] },
    { id: 15, name: "چیزکیک سن‌سباستین", cat: "dessert", catFa: "دسر", price: 155000, rating: 4.8, orders: 970, popular: false, desc: "چیزکیک باسکی با بافت کرمی و رویه کاراملی، سرو با سس توت‌فرنگی.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop", ingredients: ["پنیر خامه‌ای", "تخم‌مرغ", "خامه", "وانیل", "سس توت‌فرنگی"] },
    { id: 16, name: "سیب‌زمینی سرخ‌کرده ویژه", cat: "starter", catFa: "پیش‌غذا", price: 120000, rating: 4.4, orders: 1880, popular: false, desc: "سیب‌زمینی ترد با پنیر پارمزان، سبزیجات معطر و سس مخصوص چاشنی.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop", ingredients: ["سیب‌زمینی", "پارمزان", "سبزی معطر", "سس مخصوص"] }
  ];

  window.CHASHNI_FOODS = FOODS;

  function faPrice(n) {
    return n.toLocaleString("fa-IR") + " تومان";
  }
  window.CHASHNI_price = faPrice;

  function cardHTML(f) {
    return (
      '<article class="dish-card menu-card">' +
        '<div class="dish-media">' +
          '<a href="food-details.html?id=' + f.id + '" aria-label="' + f.name + '">' +
            '<img src="' + f.img + '" alt="' + f.name + '" loading="lazy">' +
          "</a>" +
          '<span class="dish-cat">' + f.catFa + "</span>" +
          '<span class="dish-price">' + faPrice(f.price) + "</span>" +
        "</div>" +
        '<div class="dish-body">' +
          '<h3><a href="food-details.html?id=' + f.id + '">' + f.name + "</a></h3>" +
          "<p>" + f.desc + "</p>" +
          '<div class="dish-foot">' +
            '<span class="rating">★ ' + f.rating.toLocaleString("fa-IR") + " (" + f.orders.toLocaleString("fa-IR") + " سفارش)</span>" +
            '<a class="dish-link" href="food-details.html?id=' + f.id + '">جزئیات ←</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* Home page popular dishes */
  var popularGrid = document.getElementById("popularGrid");
  if (popularGrid) {
    popularGrid.innerHTML = FOODS.filter(function (f) { return f.popular; })
      .slice(0, 4).map(cardHTML).join("");
  }

  /* Menu page grid + filtering */
  var menuGrid = document.getElementById("menuGrid");
  var filterBtns = document.querySelectorAll(".filter-btn");
  var resultCount = document.getElementById("resultCount");

  function renderMenu(cat) {
    if (!menuGrid) return;
    var list = cat === "all" ? FOODS : FOODS.filter(function (f) { return f.cat === cat; });
    menuGrid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : '<div class="menu-empty">غذایی در این دسته پیدا نشد.</div>';
    if (resultCount) {
      resultCount.textContent = list.length.toLocaleString("fa-IR") + " غذا نمایش داده شد";
    }
  }

  if (menuGrid) {
    renderMenu("all");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderMenu(btn.getAttribute("data-cat"));
      });
    });
  }
})();
