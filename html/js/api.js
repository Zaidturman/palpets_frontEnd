const API_BASE_URL = "http://127.0.0.1:8000/api";

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    return {};
  }
}

function setAuthData(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user || {}));
}

function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function goToLogin() {
  window.location.href = `${window.location.origin}/pages/login.html`;
}

function goToProfile() {
  window.location.href = `${window.location.origin}/pages/profile.html`;
}

function goToHome() {
  window.location.href = `${window.location.origin}/index.html`;
}

async function apiCall(
  endpoint,
  method = "GET",
  data = null,
  requiresAuth = true,
) {
  const token = getToken();

  const headers = {
    Accept: "application/json",
  };

  if (requiresAuth && token) {
    headers.Authorization = `Token ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data instanceof FormData) {
    config.body = data;
  } else if (data !== null) {
    headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  let result = null;
  const text = await response.text();

  try {
    result = text ? JSON.parse(text) : null;
  } catch (error) {
    result = text;
  }

  if (!response.ok) {
    let message = "حدث خطأ غير متوقع";

    if (result?.detail) {
      message = result.detail;
    } else if (result?.error) {
      message = result.error;
    } else if (typeof result === "string" && result.trim()) {
      message = result;
    } else if (typeof result === "object" && result !== null) {
      const firstKey = Object.keys(result)[0];
      if (firstKey) {
        const firstValue = result[firstKey];
        if (Array.isArray(firstValue)) {
          message = firstValue[0];
        } else if (typeof firstValue === "string") {
          message = firstValue;
        }
      }
    }

    throw new Error(message);
  }

  return result;
}

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPetTypeName(type) {
  const types = {
    dog: "كلب",
    cat: "قطة",
    bird: "طائر",
    rabbit: "أرنب",
    fish: "سمك",
  };

  return types[type] || type || "-";
}

function getGenderName(gender) {
  if (gender === "male") return "ذكر";
  if (gender === "female") return "أنثى";
  return "غير محدد";
}

function getStatusBadge(status) {
  const badges = {
    available: '<span class="badge badge-success">✅ متاح</span>',
    adopted: '<span class="badge badge-info">🏠 تم تبنيه</span>',
    sold: '<span class="badge badge-secondary">💰 تم بيعه</span>',
    pending: '<span class="badge badge-warning">⏳ قيد الانتظار</span>',
    reserved: '<span class="badge badge-warning">📌 محجوز</span>',
  };

  return badges[status] || `<span class="badge">${status || "-"}</span>`;
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 15px 22px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    z-index: 99999;
    display: flex;
    align-items: center;
    gap: 10px;
    direction: rtl;
    border: 1px solid ${type === "success" ? "#bbf7d0" : "#fecaca"};
    color: ${type === "success" ? "#166534" : "#991b1b"};
    font-weight: 700;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

let loadingCount = 0;

function createLoader() {
  const div = document.createElement("div");
  div.id = "globalLoader";
  div.innerHTML = '<div class="spinner"></div>';
  div.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.8);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  const style = document.createElement("style");
  style.textContent = `
    #globalLoader .spinner {
      width: 42px;
      height: 42px;
      border: 4px solid #eee;
      border-top-color: #ff7a59;
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(div);

  return div;
}

function showLoading() {
  loadingCount += 1;

  if (loadingCount === 1) {
    const loader = document.getElementById("globalLoader") || createLoader();
    loader.style.display = "flex";
  }
}

function hideLoading() {
  loadingCount -= 1;

  if (loadingCount <= 0) {
    loadingCount = 0;
    const loader = document.getElementById("globalLoader");
    if (loader) {
      loader.style.display = "none";
    }
  }
}

function requireAuth() {
  if (!getToken()) {
    goToLogin();
    return false;
  }
  return true;
}