function renderMessage(message, type = "error") {
  const messageContainer = document.getElementById("messageContainer");
  if (!messageContainer) return;

  messageContainer.innerHTML = `
    <div class="message-box ${type === "success" ? "message-success" : "message-error"}">
      ${message}
    </div>
  `;
}

function clearMessage() {
  const messageContainer = document.getElementById("messageContainer");
  if (messageContainer) {
    messageContainer.innerHTML = "";
  }
}

function logout() {
  clearAuth();
  goToHome();
}

function toggleProfileMenu() {
  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) {
    dropdown.classList.toggle("show");
  }
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
        <span>⌄</span>
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

async function handleLogin(event) {
  event.preventDefault();
  clearMessage();

  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");

  if (!usernameEl || !passwordEl) {
    renderMessage("يوجد خطأ في الصفحة: حقول تسجيل الدخول غير موجودة.");
    return;
  }

  const username = usernameEl.value.trim();
  const password = passwordEl.value;

  if (!username || !password) {
    renderMessage("الرجاء إدخال اسم المستخدم وكلمة المرور.");
    return;
  }

  try {
    showLoading();

    const response = await apiCall(
      "/auth/login/",
      "POST",
      { username, password },
      false,
    );

    if (!response?.token || !response?.user) {
      renderMessage("استجابة تسجيل الدخول غير مكتملة من الخادم.");
      return;
    }

    setAuthData(response.token, response.user);
    renderMessage("تم تسجيل الدخول بنجاح.", "success");

    setTimeout(() => {
      goToHome();
    }, 1000);
  } catch (error) {
    console.error("Login error:", error);
    renderMessage(error.message || "فشل تسجيل الدخول.");
  } finally {
    hideLoading();
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return password.length >= 8;
}

function isValidPhone(phone) {
  const cleaned = phone.replace(/\s+/g, "");
  if (!/^\+?\d{9,15}$/.test(cleaned)) return false;
  if (/^0+$/.test(cleaned.replace("+", ""))) return false;
  return true;
}

async function handleRegister(event) {
  event.preventDefault();
  clearMessage();

  const firstNameEl = document.getElementById("firstName");
  const lastNameEl = document.getElementById("lastName");
  const usernameEl = document.getElementById("username");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  const locationEl = document.getElementById("location");
  const userTypeEl = document.getElementById("userType");
  const passwordEl = document.getElementById("password");
  const confirmPasswordEl = document.getElementById("confirmPassword");

  if (
    !firstNameEl ||
    !lastNameEl ||
    !usernameEl ||
    !emailEl ||
    !phoneEl ||
    !locationEl ||
    !userTypeEl ||
    !passwordEl ||
    !confirmPasswordEl
  ) {
    renderMessage("يوجد خطأ في الصفحة: بعض الحقول غير موجودة.");
    return;
  }

  const first_name = firstNameEl.value.trim();
  const last_name = lastNameEl.value.trim();
  const username = usernameEl.value.trim();
  const email = emailEl.value.trim();
  const phone_number = phoneEl.value.trim();
  const location = locationEl.value.trim();
  const user_type = userTypeEl.value;
  const password = passwordEl.value;
  const password2 = confirmPasswordEl.value;

  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !phone_number ||
    !password ||
    !password2
  ) {
    renderMessage("الرجاء تعبئة جميع الحقول المطلوبة.");
    return;
  }

  if (!isValidEmail(email)) {
    renderMessage("البريد الإلكتروني غير صحيح.");
    return;
  }

  if (!isValidPhone(phone_number)) {
    renderMessage("رقم الجوال غير صحيح.");
    return;
  }

  if (!isStrongPassword(password)) {
    renderMessage("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
    return;
  }

  if (password !== password2) {
    renderMessage("كلمتا المرور غير متطابقتين.");
    return;
  }

  try {
    showLoading();

    const response = await apiCall(
      "/auth/register/",
      "POST",
      {
        first_name,
        last_name,
        username,
        email,
        phone_number,
        location,
        user_type,
        password,
        password2,
      },
      false,
    );

    if (response?.token && response?.user) {
      setAuthData(response.token, response.user);
      renderMessage("تم إنشاء الحساب بنجاح.", "success");

      setTimeout(() => {
        goToHome();
      }, 1200);
      return;
    }

    renderMessage("تم إرسال الطلب لكن الاستجابة غير مكتملة.");
  } catch (error) {
    console.error("Register error:", error);
    renderMessage(error.message || "فشل إنشاء الحساب.");
  } finally {
    hideLoading();
  }
}

async function handleForgotPassword(event) {
  event.preventDefault();
  clearMessage();

  const emailEl = document.getElementById("email");
  if (!emailEl) {
    renderMessage("حقل البريد الإلكتروني غير موجود.");
    return;
  }

  const email = emailEl.value.trim();

  if (!email) {
    renderMessage("الرجاء إدخال البريد الإلكتروني.");
    return;
  }

  if (!isValidEmail(email)) {
    renderMessage("البريد الإلكتروني غير صحيح.");
    return;
  }

  try {
    showLoading();

    const response = await apiCall(
      "/auth/forgot-password/",
      "POST",
      { email },
      false,
    );

    renderMessage(
      response?.message || "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.",
      "success",
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    renderMessage(error.message || "تعذر إرسال رابط إعادة التعيين.");
  } finally {
    hideLoading();
  }
}

document.addEventListener("click", function (e) {
  const authContainer = document.getElementById("authContainer");
  const dropdown = document.getElementById("profileDropdown");

  if (!authContainer || !dropdown) return;

  if (!authContainer.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", handleForgotPassword);
  }
});