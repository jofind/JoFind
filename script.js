const langBtn = document.getElementById("langToggle");
const badgeTextContent = document.getElementById("badgeTextContent");
const subtitle = document.getElementById("subtitle");
const secondsSpan = document.querySelector("#subtitle .seconds");
const title = document.getElementById("title");
const description = document.getElementById("description");
const searchInput = document.getElementById("searchInput");
const findBtn = document.getElementById("findBtn");
const resultsBox = document.getElementById("resultsBox");

let currentLang = "en";

const texts = {
  en: {
    badge: "❁ Smart Deal Finder",
    title: "Jofind Find cheaper alternatives",
    subtitleSeconds: "in seconds",
    description: "Paste a product link or name below. We'll help you find better deals",
    placeholder: "Paste a product link or type a name",
    button: "Find Deals",
  },
  ar: {
    badge: "❁ مكتشف العروض الذكية",
    title: "جوفايندابحث عن بدائل أرخص",
    subtitleSeconds: "في ثوانٍ",
    description: "الصقي رابط المنتج أو اكتب اسمه وسنساعدك في إيجاد أفضل سعر",
    placeholder: "الصقي رابط المنتج أو اكتبي اسمه",
    button: "ابحث",
  }
};

// ===== تبديل اللغة =====
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  document.documentElement.setAttribute("lang", currentLang);
  const langTexts = texts[currentLang];
  title.textContent = langTexts.title;
  secondsSpan.textContent = langTexts.subtitleSeconds;
  description.textContent = langTexts.description;
  searchInput.placeholder = langTexts.placeholder;
  findBtn.textContent = langTexts.button;
  badgeTextContent.textContent = langTexts.badge.replace("❁", "").trim();
  langBtn.textContent = currentLang === "en" ? "AR" : "EN";
});

// ===== البحث وعرض النتائج مع Original Price و Profit =====
findBtn.addEventListener("click", () => {
  const product = searchInput.value.trim();
  if (!product) {
    alert(currentLang === "en" ? "Please enter a product name or link" : "يرجى إدخال اسم المنتج أو رابطه");
    return;
  }

  resultsBox.innerHTML = "";

  const dummyDeals = [
    { name: product + " Alternative 1", originalPrice: 40, dealPrice: 25, image: "https://via.placeholder.com/400x300", url: "https://www.aliexpress.com" },
    { name: product + " Alternative 2", originalPrice: 35, dealPrice: 22, image: "https://via.placeholder.com/400x300", url: "https://www.aliexpress.com" },
    { name: product + " Alternative 3", originalPrice: 50, dealPrice: 30, image: "https://via.placeholder.com/400x300", url: "https://www.aliexpress.com" }
  ];

  const bestPrice = Math.min(...dummyDeals.map(d => d.dealPrice));

  dummyDeals.forEach(prod => {
    const saving = prod.originalPrice - prod.dealPrice;
    const percent = Math.round((saving / prod.originalPrice) * 100);

    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      
      <img src="${prod.image}" alt="${prod.name}">
      <h3 style="margin:16px">${prod.name}</h3>
      <div class="price-row">Original price: <strong>${prod.originalPrice}</strong></div>
      <div class="price-row">New price: <strong>${prod.dealPrice}</strong></div>
      <div class="saving">Save ${saving} (${percent}%)</div>
      <a href="${prod.url}" target="_blank" style="margin:16px; display:inline-block; font-weight:600; color:#7a7fe8;">Buy this product</a>
    `;

    resultsBox.appendChild(card);
  }); // <--- هذا يغلق الـ forEach

}); // <--- هذا يغلق الـ addEventListener
