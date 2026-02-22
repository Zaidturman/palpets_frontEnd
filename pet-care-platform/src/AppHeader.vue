<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- الشعار -->
        <router-link to="/" class="logo">
          <i class="fas fa-paw"></i>
          <span>منصة رعاية الحيوانات</span>
        </router-link>

        <!-- البحث -->
        <div class="search-container">
          <input 
            type="text" 
            placeholder="ابحث عن حيوان، منتج، أو عيادة..."
            v-model="searchQuery"
            @keyup.enter="performSearch"
          >
          <button class="search-btn" @click="performSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>

        <!-- القائمة الرئيسية -->
        <nav class="main-nav">
          <ul>
            <li>
              <router-link to="/adoption">
                <i class="fas fa-heart"></i>
                <span>التبني</span>
              </router-link>
            </li>
            <li>
              <router-link to="/lost-found">
                <i class="fas fa-search-location"></i>
                <span>مفقود</span>
              </router-link>
            </li>
            <li>
              <router-link to="/veterinary">
                <i class="fas fa-stethoscope"></i>
                <span>بيطري</span>
              </router-link>
            </li>
            <li>
              <router-link to="/shop">
                <i class="fas fa-shopping-cart"></i>
                <span>المتجر</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- أدوات المستخدم -->
        <div class="user-tools">
          <!-- السلة -->
          <router-link to="/cart" class="cart-icon" v-if="authStore.isAuthenticated">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count" v-if="cartStore.totalItems > 0">
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <!-- حساب المستخدم -->
          <div class="user-dropdown" v-if="authStore.isAuthenticated">
            <button class="user-avatar" @click="toggleDropdown">
              <img :src="authStore.user?.avatar" :alt="authStore.user?.name">
            </button>
            <div class="dropdown-menu" v-if="dropdownOpen">
              <div class="user-info">
                <h4>{{ authStore.user?.name }}</h4>
                <p>{{ authStore.user?.email }}</p>
              </div>
              <hr>
              <router-link to="/dashboard" @click="closeDropdown">
                <i class="fas fa-tachometer-alt"></i>
                لوحة التحكم
              </router-link>
              <router-link to="/dashboard/profile" @click="closeDropdown">
                <i class="fas fa-user"></i>
                الملف الشخصي
              </router-link>
              <router-link to="/dashboard/my-ads" @click="closeDropdown">
                <i class="fas fa-paw"></i>
                إعلاناتي
              </router-link>
              <router-link to="/dashboard/orders" @click="closeDropdown">
                <i class="fas fa-shopping-bag"></i>
                طلباتي
              </router-link>
              <hr>
              <button @click="logout" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                تسجيل الخروج
              </button>
            </div>
          </div>

          <!-- زر الدخول/التسجيل -->
          <template v-else>
            <router-link to="/auth" class="btn btn-outline">
              <i class="fas fa-sign-in-alt"></i>
              دخول / تسجيل
            </router-link>
          </template>
        </div>

        <!-- زر القائمة المتنقلة -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- القائمة المتنقلة -->
    <div class="mobile-menu-overlay" v-if="mobileMenuOpen" @click="toggleMobileMenu"></div>
    <div class="mobile-menu" :class="{ 'open': mobileMenuOpen }">
      <div class="mobile-menu-header">
        <div class="user-info" v-if="authStore.isAuthenticated">
          <img :src="authStore.user?.avatar" :alt="authStore.user?.name" class="user-avatar">
          <div>
            <h4>{{ authStore.user?.name }}</h4>
            <p>{{ authStore.user?.email }}</p>
          </div>
        </div>
        <button @click="toggleMobileMenu" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <nav class="mobile-nav">
        <router-link to="/" @click="toggleMobileMenu">
          <i class="fas fa-home"></i>
          الرئيسية
        </router-link>
        <router-link to="/adoption" @click="toggleMobileMenu">
          <i class="fas fa-heart"></i>
          التبني والشراء
        </router-link>
        <router-link to="/lost-found" @click="toggleMobileMenu">
          <i class="fas fa-search-location"></i>
          مفقود ومعثور عليه
        </router-link>
        <router-link to="/veterinary" @click="toggleMobileMenu">
          <i class="fas fa-stethoscope"></i>
          الخدمات البيطرية
        </router-link>
        <router-link to="/shop" @click="toggleMobileMenu">
          <i class="fas fa-shopping-cart"></i>
          المتجر
        </router-link>
        <router-link to="/community" @click="toggleMobileMenu">
          <i class="fas fa-users"></i>
          المجتمع
        </router-link>
        <router-link to="/blog" @click="toggleMobileMenu">
          <i class="fas fa-blog"></i>
          المدونة
        </router-link>
        <router-link to="/about" @click="toggleMobileMenu">
          <i class="fas fa-info-circle"></i>
          عن المنصة
        </router-link>
        
        <hr>
        
        <template v-if="authStore.isAuthenticated">
          <router-link to="/dashboard" @click="toggleMobileMenu">
            <i class="fas fa-tachometer-alt"></i>
            لوحة التحكم
          </router-link>
          <router-link to="/cart" @click="toggleMobileMenu">
            <i class="fas fa-shopping-cart"></i>
            سلة التسوق
            <span class="badge" v-if="cartStore.totalItems > 0">
              {{ cartStore.totalItems }}
            </span>
          </router-link>
          <hr>
          <button @click="logout" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            تسجيل الخروج
          </button>
        </template>
        <template v-else>
          <router-link to="/auth" @click="toggleMobileMenu" class="btn btn-primary">
            دخول / تسجيل
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const searchQuery = ref('')
const dropdownOpen = ref(false)
const mobileMenuOpen = ref(false)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    })
    searchQuery.value = ''
    toggleMobileMenu()
  }
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const logout = () => {
  authStore.logout()
  closeDropdown()
  toggleMobileMenu()
  router.push('/')
}

const handleClickOutside = (event) => {
  const target = event.target
  if (!target.closest('.user-dropdown')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.app-header {
  background-color: white;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    gap: 2rem;
    
    @media (max-width: 768px) {
      gap: 1rem;
    }
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
    
    i {
      font-size: 1.75rem;
    }
    
    span {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
  
  .search-container {
    flex: 1;
    max-width: 400px;
    position: relative;
    
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-left: 3rem;
      border: 2px solid var(--gray-light);
      border-radius: var(--border-radius-lg);
      font-size: 0.9rem;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
    
    .search-btn {
      position: absolute;
      left: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--gray-color);
      cursor: pointer;
      padding: 0.5rem;
      
      &:hover {
        color: var(--primary-color);
      }
    }
    
    @media (max-width: 768px) {
      max-width: 200px;
    }
    
    @media (max-width: 480px) {
      display: none;
    }
  }
  
  .main-nav {
    @media (max-width: 1024px) {
      display: none;
    }
    
    ul {
      display: flex;
      gap: 1.5rem;
      list-style: none;
      
      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        color: var(--dark-color);
        font-weight: 500;
        
        &:hover {
          color: var(--primary-color);
        }
        
        &.router-link-active {
          color: var(--primary-color);
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            right: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
          }
        }
      }
    }
  }
  
  .user-tools {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .cart-icon {
      position: relative;
      color: var(--dark-color);
      font-size: 1.25rem;
      padding: 0.5rem;
      
      &:hover {
        color: var(--primary-color);
      }
      
      .cart-count {
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--secondary-color);
        color: white;
        font-size: 0.7rem;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
    .user-dropdown {
      position: relative;
      
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--primary-color);
        background: none;
        cursor: pointer;
        padding: 0;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .dropdown-menu {
        position: absolute;
        top: calc(100% + 10px);
        left: 0;
        background-color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        min-width: 250px;
        z-index: 1000;
        
        .user-info {
          padding: 1rem;
          
          h4 {
            margin-bottom: 0.25rem;
            color: var(--dark-color);
          }
          
          p {
            margin-bottom: 0;
            color: var(--gray-color);
            font-size: 0.9rem;
          }
        }
        
        hr {
          border: none;
          height: 1px;
          background-color: var(--gray-light);
          margin: 0.5rem 0;
        }
        
        a, .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--dark-color);
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          text-align: right;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.95rem;
          
          &:hover {
            background-color: var(--light-color);
            color: var(--primary-color);
          }
          
          i {
            width: 20px;
            color: var(--gray-color);
          }
        }
        
        .logout-btn {
          color: var(--error-color);
          
          &:hover {
            color: white;
            background-color: var(--error-color);
            
            i {
              color: white;
            }
          }
        }
      }
    }
  }
  
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--dark-color);
    cursor: pointer;
    
    @media (max-width: 1024px) {
      display: block;
    }
  }
  
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .mobile-menu {
    position: fixed;
    top: 0;
    right: -300px;
    bottom: 0;
    width: 300px;
    background-color: white;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    transition: right 0.3s ease;
    
    &.open {
      right: 0;
    }
    
    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--gray-light);
      
      .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        h4 {
          margin-bottom: 0.25rem;
          font-size: 1rem;
        }
        
        p {
          margin-bottom: 0;
          font-size: 0.85rem;
          color: var(--gray-color);
        }
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 1.25rem;
        color: var(--gray-color);
        cursor: pointer;
        padding: 0.5rem;
        
        &:hover {
          color: var(--dark-color);
        }
      }
    }
    
    .mobile-nav {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      height: calc(100vh - 80px);
      overflow-y: auto;
      
      a, .logout-btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        color: var(--dark-color);
        text-decoration: none;
        border-radius: var(--border-radius-sm);
        
        &:hover {
          background-color: var(--light-color);
          color: var(--primary-color);
        }
        
        &.router-link-active {
          background-color: var(--primary-light);
          color: var(--primary-color);
        }
        
        i {
          width: 20px;
        }
        
        .badge {
          margin-right: auto;
          background-color: var(--secondary-color);
          color: white;
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border-radius: 10px;
        }
      }
      
      .logout-btn {
        background: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
        color: var(--error-color);
        
        &:hover {
          background-color: var(--error-color);
          color: white;
        }
      }
      
      .btn-primary {
        margin-top: 1rem;
      }
    }
  }
}
</style>