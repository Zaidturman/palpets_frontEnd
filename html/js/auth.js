// دوال المصادقة

// معالجة تسجيل الدخول
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageContainer = document.getElementById('messageContainer');
    
    // بيانات تسجيل دخول تجريبية
    const validEmail = 'user@example.com';
    const validPassword = 'password123';
    
    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
        if (email === validEmail && password === validPassword) {
            // تسجيل دخول ناجح
            const user = {
                name: 'أحمد محمد',
                email: email,
                avatar: 'https://via.placeholder.com/40'
            };
            
            localStorage.setItem('token', 'dummy-token-123');
            localStorage.setItem('user', JSON.stringify(user));
            
            messageContainer.innerHTML = `
                <div class="success-message">
                    تم تسجيل الدخول بنجاح! جاري التحويل...
                </div>
            `;
            
            // تحويل المستخدم إلى الصفحة الرئيسية
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        } else {
            // فشل تسجيل الدخول
            messageContainer.innerHTML = `
                <div class="error-message">
                    البريد الإلكتروني أو كلمة المرور غير صحيحة
                </div>
            `;
        }
    }, 1000);
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

// التحقق من حالة المصادقة
function requireAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

// معالجة التسجيل
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageContainer = document.getElementById('messageContainer');
    
    // التحقق من تطابق كلمات المرور
    if (password !== confirmPassword) {
        messageContainer.innerHTML = `
            <div class="error-message">
                كلمة المرور غير متطابقة
            </div>
        `;
        return;
    }
    
    // محاكاة عملية التسجيل
    setTimeout(() => {
        messageContainer.innerHTML = `
            <div class="success-message">
                تم إنشاء الحساب بنجاح! جاري تحويلك لتسجيل الدخول...
            </div>
        `;
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 1000);
}