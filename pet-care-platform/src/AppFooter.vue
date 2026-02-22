<template>
  <footer class="app-footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <!-- معلومات الشركة -->
          <div class="footer-section">
            <div class="footer-logo">
              <i class="fas fa-paw"></i>
              <span>منصة رعاية الحيوانات</span>
            </div>
            <p class="footer-description">
              منصة شاملة تجمع كل ما يحتاجه أصحاب الحيوانات الأليفة ومحبيهم في مكان واحد.
              نسعى لنشر الوعي وتوفير أفضل خدمات الرعاية للحيوانات.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- روابط سريعة -->
          <div class="footer-section">
            <h4 class="footer-title">روابط سريعة</h4>
            <ul class="footer-links">
              <li><router-link to="/adoption">التبني والشراء</router-link></li>
              <li><router-link to="/lost-found">مفقود ومعثور عليه</router-link></li>
              <li><router-link to="/veterinary">الخدمات البيطرية</router-link></li>
              <li><router-link to="/shop">متجر المستلزمات</router-link></li>
              <li><router-link to="/community">المجتمع</router-link></li>
              <li><router-link to="/blog">المدونة</router-link></li>
            </ul>
          </div>

          <!-- الخدمات -->
          <div class="footer-section">
            <h4 class="footer-title">خدماتنا</h4>
            <ul class="footer-links">
              <li><router-link to="/veterinary/clinics">العيادات البيطرية</router-link></li>
              <li><router-link to="/veterinary/appointment">حجز موعد بيطري</router-link></li>
              <li><router-link to="/breeders">دليل المربين</router-link></li>
              <li><router-link to="/shelters">الملاجئ والمؤسسات</router-link></li>
              <li><router-link to="/dashboard/my-ads">نشر إعلان</router-link></li>
              <li><router-link to="/dashboard">لوحة التحكم</router-link></li>
            </ul>
          </div>

          <!-- اتصل بنا -->
          <div class="footer-section">
            <h4 class="footer-title">اتصل بنا</h4>
            <ul class="contact-info">
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <span>المملكة العربية السعودية - الرياض</span>
              </li>
              <li>
                <i class="fas fa-phone"></i>
                <span>+966 11 123 4567</span>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <span>info@PalPets.com</span>
              </li>
              <li>
                <i class="fas fa-clock"></i>
                <span>الأحد - الخميس: 9 صباحاً - 6 مساءً</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- قسم النشرة البريدية -->
    <div class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h4>اشترك في نشرتنا البريدية</h4>
            <p>احصل على آخر الأخبار والعروض والنصائح المتعلقة برعاية الحيوانات</p>
          </div>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input
              type="email"
              v-model="email"
              placeholder="البريد الإلكتروني"
              required
            >
            <button type="submit" class="btn btn-primary">
              اشتراك
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- حقوق النشر -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p>&copy; 2024 منصة رعاية الحيوانات. جميع الحقوق محفوظة.</p>
          <div class="footer-legal">
            <router-link to="/privacy">سياسة الخصوصية</router-link>
            <router-link to="/terms">شروط الاستخدام</router-link>
            <router-link to="/about">عن المنصة</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const email = ref('')
const toast = useToast()

const subscribeNewsletter = () => {
  if (email.value) {
    // محاكاة اشتراك النشرة
    setTimeout(() => {
      toast.success('تم الاشتراك في النشرة البريدية بنجاح!')
      email.value = ''
    }, 500)
  }
}
</script>

<style scoped lang="scss">
.app-footer {
  background-color: var(--dark-color);
  color: white;
  margin-top: auto;
  
  .footer-top {
    padding: 3rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    
    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }
  
  .footer-section {
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: white;
      
      i {
        color: var(--primary-color);
        font-size: 1.75rem;
      }
    }
    
    .footer-description {
      color: #b0b0b0;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }
    
    .social-links {
      display: flex;
      gap: 0.75rem;
      
      .social-link {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all var(--transition-normal);
        
        &:hover {
          background-color: var(--primary-color);
          transform: translateY(-3px);
        }
      }
    }
    
    .footer-title {
      color: white;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      position: relative;
      padding-bottom: 0.5rem;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50px;
        height: 2px;
        background-color: var(--primary-color);
      }
    }
    
    .footer-links {
      list-style: none;
      
      li {
        margin-bottom: 0.75rem;
        
        a {
          color: #b0b0b0;
          transition: color var(--transition-fast);
          font-size: 0.9rem;
          
          &:hover {
            color: var(--primary-color);
            padding-right: 5px;
          }
        }
      }
    }
    
    .contact-info {
      list-style: none;
      
      li {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
        color: #b0b0b0;
        font-size: 0.9rem;
        
        i {
          color: var(--primary-color);
          margin-top: 3px;
          font-size: 1rem;
        }
      }
    }
  }
  
  .newsletter-section {
    padding: 2rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .newsletter-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      
      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
      }
    }
    
    .newsletter-text {
      h4 {
        color: white;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
      }
      
      p {
        color: #b0b0b0;
        margin-bottom: 0;
        font-size: 0.9rem;
      }
    }
    
    .newsletter-form {
      display: flex;
      gap: 1rem;
      max-width: 500px;
      width: 100%;
      
      @media (max-width: 768px) {
        flex-direction: column;
      }
      
      input {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius-sm);
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 0.9rem;
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }
      
      button {
        white-space: nowrap;
        
        @media (max-width: 768px) {
          width: 100%;
        }
      }
    }
  }
  
  .footer-bottom {
    padding: 1.5rem 0;
    
    .footer-bottom-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      @media (max-width: 576px) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      p {
        color: #b0b0b0;
        margin-bottom: 0;
        font-size: 0.9rem;
      }
      
      .footer-legal {
        display: flex;
        gap: 1.5rem;
        
        a {
          color: #b0b0b0;
          transition: color var(--transition-fast);
          font-size: 0.9rem;
          
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
  }
}
</style>