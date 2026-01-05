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
    badge: "✳️ Smart Deal Finder",
    title: "Jofind Find cheaper alternatives",
    subtitleSeconds: "in seconds",
    description: "Paste a product link or name below. We'll help you find better deals",
    placeholder: "Paste a product link or type a name",
    button: "Find Deals",
  },
  ar: {
    badge: "✳️ مكتشف العروض الذكية",
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
  badgeTextContent.textContent = langTexts.badge.replace("✳️", "").trim();
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

  // بدائل افتراضية مع روابط أفلييت + الأسعار
  const dummyDeals = [
    {name:`${product} - Deal 1`, originalPrice:12, dealPrice:10, url:"https://www.amazon.com/dp/EXAMPLE?tag=YourAffiliateID"},
    {name:`${product} - Deal 2`, originalPrice:18, dealPrice:15, url:"https://www.aliexpress.com/item/EXAMPLE?aff_fcid=YourAffiliateID"},
    {name:`${product} - Deal 3`, originalPrice:25, dealPrice:20, url:"https://www.ebay.com/itm/EXAMPLE?campid=YourAffiliateID"},
  ];

  dummyDeals.forEach(prod => {
    const profit = prod.originalPrice - prod.dealPrice;
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${prod.name}</h3>
      <p>Original: $${prod.originalPrice}</p>
      <p>Deal: $${prod.dealPrice}</p>
      <p>Profit: $${profit}</p>
      <a href="${prod.url}" target="_blank">Go to product</a>
    `;
    resultsBox.appendChild(card);
  });
});
