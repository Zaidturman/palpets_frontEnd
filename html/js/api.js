// api.js - ملف موحد لجميع طلبات API

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// الحصول على التوكن من localStorage
function getToken() {
    return localStorage.getItem('token');
}

// الحصول على المستخدم من localStorage
function getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
}

// حفظ التوكن والمستخدم
function setAuthData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

// مسح بيانات المصادقة
function clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// دالة الطلب الأساسية
async function apiCall(endpoint, method = 'GET', data = null, requiresAuth = true) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
    };

    if (requiresAuth) {
        const token = getToken();
        if (!token) {
            window.location.href = '/pages/login.html';
            throw new Error('No authentication token');
        }
        headers['Authorization'] = `Token ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (data) {
        if (data instanceof FormData) {
            delete headers['Content-Type'];
            options.body = data;
        } else {
            options.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(url, options);
        
        // Check for 401 Unauthorized
        if (response.status === 401) {
            clearAuth();
            window.location.href = '/pages/login.html';
            throw new Error('Session expired');
        }

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.detail || responseData.message || 'Request failed');
        }

        return responseData;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// دوال مساعدة للتواريخ
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// دوال مساعدة للأنواع
function getPetTypeName(type) {
    const types = {
        'dog': 'كلب',
        'cat': 'قطة',
        'bird': 'طائر',
        'rabbit': 'أرنب',
        'fish': 'سمك'
    };
    return types[type] || type;
}

function getGenderName(gender) {
    return gender === 'male' ? 'ذكر' : 'أنثى';
}

function getStatusBadge(status) {
    const badges = {
        'available': '<span class="badge badge-success">✅ متاح</span>',
        'adopted': '<span class="badge badge-info">🏠 تم تبنيه</span>',
        'sold': '<span class="badge badge-secondary">💰 تم بيعه</span>',
        'pending': '<span class="badge badge-warning">⏳ قيد الانتظار</span>'
    };
    return badges[status] || `<span class="badge">${status}</span>`;
}

// إظهار رسالة
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// إظهار/إخفاء التحميل
let loadingCount = 0;

function showLoading() {
    loadingCount++;
    if (loadingCount === 1) {
        const loader = document.getElementById('globalLoader') || createLoader();
        loader.style.display = 'flex';
    }
}

function hideLoading() {
    loadingCount--;
    if (loadingCount <= 0) {
        loadingCount = 0;
        const loader = document.getElementById('globalLoader');
        if (loader) loader.style.display = 'none';
    }
}

function createLoader() {
    const div = document.createElement('div');
    div.id = 'globalLoader';
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
    document.body.appendChild(div);
    return div;
}

// التحقق من المصادقة
function requireAuth() {
    if (!getToken()) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// تحديث واجهة المستخدم حسب حالة المصادقة
function updateAuthUI() {
    const user = getUser();
    const authButtons = document.querySelector('.auth-buttons');
    
    if (authButtons) {
        if (getToken() && user) {
            authButtons.innerHTML = `
                <a href="/pages/profile.html" class="btn-profile">
                    <img src="${user.profile_image || 'https://ui-avatars.com/api/?name=' + (user.first_name || 'U') + '&background=4f46e5&color=fff'}" 
                         alt="${user.first_name}"
                         style="width: 32px; height: 32px; border-radius: 50%; margin-left: 8px;">
                    ${user.first_name || user.username}
                </a>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="/pages/login.html" class="btn-login">تسجيل الدخول</a>
            `;
        }
    }
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});