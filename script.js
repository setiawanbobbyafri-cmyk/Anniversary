const PASSWORD = "04032023";
const STORAGE_KEY = "anniversaryUnlocked";

const loginCard = document.getElementById("loginCard");
const anniversaryCard = document.getElementById("anniversaryCard");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("passwordInput");
const loginError = document.getElementById("loginError");
const photoGallery = document.getElementById("photoGallery");

const photos = [
  {
    src: "assets/photos/photo-1.jpg",
    caption: "Our embrace, our safe place."
  },
  {
    src: "assets/photos/photo-2.jpg",
    caption: "Laughing and loving in every frame."
  },
  {
    src: "assets/photos/photo-3.jpg",
    caption: "Purple days, forever us."
  }
];

function renderPhotoGallery() {
  photoGallery.innerHTML = "";

  photos.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "photo-item";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = `Anniversary photo ${index + 1}`;
    img.loading = "lazy";

    img.addEventListener("error", () => {
      figure.classList.add("missing");
      img.remove();

      const fallback = document.createElement("div");
      fallback.className = "missing-photo";
      fallback.textContent = `Photo ${index + 1} not found. Add it at ${photo.src}`;
      figure.prepend(fallback);
    });

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;

    figure.append(img, caption);
    photoGallery.appendChild(figure);
  });
}

function renderCounters() {
  const weddingDate = new Date("2023-03-04T00:00:00");
  const now = new Date();

  const msInDay = 1000 * 60 * 60 * 24;
  const daysTogether = Math.floor((now - weddingDate) / msInDay);
  document.getElementById("daysTogether").textContent = daysTogether.toLocaleString();

  const thisYear = now.getFullYear();
  let nextAnniversaryDate = new Date(`${thisYear}-03-04T00:00:00`);
  if (nextAnniversaryDate < now) {
    nextAnniversaryDate = new Date(`${thisYear + 1}-03-04T00:00:00`);
  }

  const daysUntilNext = Math.ceil((nextAnniversaryDate - now) / msInDay);
  document.getElementById("nextAnniversary").textContent = daysUntilNext.toLocaleString();
}

function unlockPage() {
  loginCard.classList.add("hidden");
  anniversaryCard.classList.remove("hidden");
  renderCounters();
  renderPhotoGallery();
}

if (localStorage.getItem(STORAGE_KEY) === "true") {
  unlockPage();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value.trim() === PASSWORD) {
    localStorage.setItem(STORAGE_KEY, "true");
    loginError.textContent = "";
    unlockPage();
    return;
  }

  loginError.textContent = "Wrong password. Please try again, my love.";
  passwordInput.focus();
  passwordInput.select();
});
