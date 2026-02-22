// دوال عامة للمشروع

// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// بيانات ابتدائية للحيوانات
function getPets() {
    return [
        {
            id: 1,
            name: 'لولو',
            type: 'cat',
            breed: 'شيرازي',
            age: 'سنتين',
            gender: 'أنثى',
            price: 500,
            status: 'available',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
            description: 'قطة لولو جميلة وودودة، محصنة ومعتادة على التعامل مع الأطفال'
        },
        {
            id: 2,
            name: 'ماكس',
            type: 'dog',
            breed: 'جيرمن شيبرد',
            age: '3 سنوات',
            gender: 'ذكر',
            price: 1500,
            status: 'available',
            image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95',
            description: 'كلب ماكس مدرب ومطيع، مناسب للحماية والحراسة'
        },
        {
            id: 3,
            name: 'توتو',
            type: 'dog',
            breed: 'بوميرانيان',
            age: 'سنة',
            gender: 'ذكر',
            price: 800,
            status: 'available',
            image: 'https://images.unsplash.com/photo-1611003228941-98852ba62227',
            description: 'كلب توتو صغير الحجم، نشيط ومرح، مناسب للشقق'
        },
        {
            id: 4,
            name: 'ميشو',
            type: 'cat',
            breed: 'هيمالايا',
            age: 'سنة ونص',
            gender: 'ذكر',
            price: 600,
            status: 'available',
            image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5',
            description: 'قطة ميشو هادئة وتحب اللعب'
        },
        {
            id: 5,
            name: 'ريكس',
            type: 'dog',
            breed: 'هاسكي',
            age: 'سنتين',
            gender: 'ذكر',
            price: 2000,
            status: 'available',
            image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea',
            description: 'كلب ريكس نشيط وجميل، يحتاج لمساحة للحركة'
        },
        {
            id: 6,
            name: 'لونا',
            type: 'cat',
            breed: 'سكوتش',
            age: 'شهرين',
            gender: 'أنثى',
            price: 400,
            status: 'available',
            image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91',
            description: 'قطة لونا صغيرة ولطيفة، تبحث عن منزل محب'
        }
    ];
}

// إنشاء بطاقة حيوان
function createPetCard(pet) {
    const typeName = pet.type === 'dog' ? 'كلب' : 'قطة';
    const statusText = pet.status === 'available' ? 'متاح' : 'غير متاح';
    const statusClass = pet.status === 'available' ? 'متاح' : '';
    
    return `
        <div class="pet-card">
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <div class="pet-content">
                <div class="pet-header">
                    <h3 class="pet-name">${pet.name}</h3>
                    <span class="pet-status">${statusText}</span>
                </div>
                <div class="pet-details">
                    <p><strong>النوع:</strong> ${typeName}</p>
                    <p><strong>السلالة:</strong> ${pet.breed}</p>
                    <p><strong>العمر:</strong> ${pet.age}</p>
                    <p><strong>السعر:</strong> ${pet.price}  شيكل</p>
                </div>
                <p class="pet-description">${pet.description}</p>
                <div class="pet-actions">
                    <button onclick="viewPetDetails(${pet.id})" class="btn-details">تفاصيل</button>
                    <button onclick="contactOwner(${pet.id})" class="btn-contact">تواصل</button>
                </div>
            </div>
        </div>
    `;
}

// عرض تفاصيل الحيوان
function viewPetDetails(petId) {
    const pet = getPets().find(p => p.id === petId);
    if (pet) {
        alert(`تفاصيل ${pet.name}:\n${pet.description}`);
    }
}

// التواصل مع المالك
function contactOwner(petId) {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
        alert('سيتم فتح نافذة التواصل قريباً');
    } else {
        if (confirm('يجب تسجيل الدخول أولاً. هل تريد الانتقال إلى صفحة تسجيل الدخول؟')) {
            window.location.href = 'pages/login.html';
        }
    }
}

// حفظ حالة المستخدم
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (token && user) {
        // تحديث واجهة المستخدم
        updateUIForLoggedInUser(user);
    }
}

// تحديث واجهة المستخدم للمستخدم المسجل
function updateUIForLoggedInUser(user) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <a href="pages/profile.html" class="btn-login">
                <img src="https://via.placeholder.com/32" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; vertical-align: middle; margin-left: 8px;">
                ${user.name}
            </a>
        `;
    }
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});