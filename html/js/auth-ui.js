function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function goToLogin() {
  window.location.href = "/pages/login.html";
}

function goToProfile() {
  window.location.href = "/pages/profile.html";
}

function goToHome() {
  window.location.href = "/index.html";
}

function logout() {
  clearAuth();
  goToHome();
}

function toggleProfileMenu() {
  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) dropdown.classList.toggle("show");
}

function updateAuthUI() {
  const container = document.getElementById("authContainer");
  if (!container) return;

  const token = getToken();
  const user = getUser();

  if (!token) {
    container.innerHTML = `
      <button class="login-btn" onclick="goToLogin()">
        تسجيل الدخول
      </button>
    `;
    return;
  }

  const displayName =
    [user.first_name, user.last_name].filter(Boolean).join(" ").trim() ||
    user.username ||
    "حسابي";

  const avatar =
    user.profile_image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=ff7a59&color=fff`;

  container.innerHTML = `
    <div class="profile-menu-wrap">
      <div class="profile-btn" onclick="toggleProfileMenu()">
        <img src="${avatar}" alt="${displayName}" class="profile-avatar" />
        <span class="profile-name">${displayName}</span>
        <i class="fas fa-chevron-down"></i>
      </div>

      <div class="profile-dropdown" id="profileDropdown">
        <a href="/pages/profile.html">👤 الملف الشخصي</a>
        <a href="/pages/pets.html">🐾 الحيوانات</a>
        <a href="/pages/adoption.html">🏠 التبني</a>
        <a href="/pages/store.html">🛍️ المتجر</a>
        <button type="button" onclick="logout()">🚪 تسجيل الخروج</button>
      </div>
    </div>
  `;
}

document.addEventListener("click", function (e) {
  const authContainer = document.getElementById("authContainer");
  const dropdown = document.getElementById("profileDropdown");

  if (!authContainer || !dropdown) return;

  if (!authContainer.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});