<template>
  <div class="home-view">
    <!-- قسم الهيرو -->
    <section class="hero-section">
      <div class="hero-background"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              مرحباً بك في <span class="highlight">منصة رعاية الحيوانات</span>
            </h1>
            <p class="hero-description">
              منصة شاملة تجمع كل ما تحتاجه لرعاية حيوانك الأليف. 
              تبنّي، رعاية بيطرية، مستلزمات، ومجتمع داعم.
            </p>
            <div class="hero-actions">
              <router-link to="/adoption" class="btn btn-primary btn-lg">
                <i class="fas fa-heart"></i>
                ابحث عن رفيقك الجديد
              </router-link>
              <router-link to="/veterinary" class="btn btn-outline btn-lg">
                <i class="fas fa-stethoscope"></i>
                احجز موعداً بيطرياً
              </router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="حيوانات أليفة">
          </div>
        </div>
      </div>
    </section>

    <!-- إحصائيات سريعة -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-paw"></i>
            </div>
            <div class="stat-content">
              <h3>+1,200</h3>
              <p>حيوان متاح للتبني</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-stethoscope"></i>
            </div>
            <div class="stat-content">
              <h3>+150</h3>
              <p>عيادة بيطرية</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-content">
              <h3>+5,000</h3>
              <p>مستخدم مسجل</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-home"></i>
            </div>
            <div class="stat-content">
              <h3>+300</h3>
              <p>حيوان تم تبنيه</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- كيفية العمل -->
    <section class="how-it-works section">
      <div class="container">
        <h2 class="section-title">كيف تعمل المنصة؟</h2>
        <div class="steps-grid">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>ابحث واعثر</h3>
            <p>ابحث عن الحيوان المناسب أو الخدمة التي تحتاجها باستخدام نظام البحث المتقدم</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-icon">
              <i class="fas fa-user-check"></i>
            </div>
            <h3>تواصل واتفق</h3>
            <p>تواصل مع المربين أو الأطباء مباشرة عبر نظام الرسائل الآمن</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <h3>أكمل العملية</h3>
            <p>أكمل عملية التبني أو الحجز بكل سهولة وأمان</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3>استمر في الرعاية</h3>
            <p>تابع رعاية حيوانك من خلال خدماتنا البيطرية ومتجر المستلزمات</p>
          </div>
        </div>
      </div>
    </section>

    <!-- الحيوانات المميزة -->
    <section class="featured-animals section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">حيوانات تبحث عن منزل</h2>
          <router-link to="/adoption" class="btn btn-outline">
            عرض الكل
            <i class="fas fa-arrow-left"></i>
          </router-link>
        </div>
        <div class="animals-grid">
          <AnimalCard
            v-for="animal in featuredAnimals"
            :key="animal.id"
            :animal="animal"
            @contact="handleContactAnimal"
          />
        </div>
      </div>
    </section>

    <!-- الخدمات -->
    <section class="services-section section">
      <div class="container">
        <h2 class="section-title">خدماتنا المتكاملة</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3>التبني والشراء</h3>
            <p>ابحث عن رفيقك الجديد من بين مئات الحيوانات المتاحة للتبني أو الشراء</p>
            <router-link to="/adoption" class="service-link">
              ابدأ البحث
              <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-search-location"></i>
            </div>
            <h3>مفقود ومعثور عليه</h3>
            <p>ابحث عن حيوانك المفقود أو ساعد في إعادة حيوان إلى صاحبه</p>
            <router-link to="/lost-found" class="service-link">
              ابدأ البحث
              <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-stethoscope"></i>
            </div>
            <h3>الخدمات البيطرية</h3>
            <p>احجز موعداً في أفضل العيادات البيطرية واحصل على استشارات طبية</p>
            <router-link to="/veterinary" class="service-link">
              احجز الآن
              <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h3>متجر المستلزمات</h3>
            <p>جميع مستلزمات الحيوانات من طعام، ألعاب، إكسسوارات، وأكثر</p>
            <router-link to="/shop" class="service-link">
              تسوق الآن
              <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- المدونة -->
    <section class="blog-section section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">آخر المقالات والنصائح</h2>
          <router-link to="/blog" class="btn btn-outline">
            عرض الكل
            <i class="fas fa-arrow-left"></i>
          </router-link>
        </div>
        <div class="blog-grid">
          <div class="blog-card" v-for="post in blogPosts" :key="post.id">
            <div class="blog-image">
              <img :src="post.image" :alt="post.title">
            </div>
            <div class="blog-content">
              <span class="blog-category">{{ post.category }}</span>
              <h3 class="blog-title">{{ post.title }}</h3>
              <p class="blog-excerpt">{{ post.excerpt }}</p>
              <div class="blog-meta">
                <span class="blog-date">
                  <i class="far fa-calendar"></i>
                  {{ post.date }}
                </span>
                <router-link :to="`/blog/${post.id}`" class="read-more">
                  اقرأ المزيد
                  <i class="fas fa-arrow-left"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAnimalsStore } from '@/stores/animals.store'
import AnimalCard from '@/components/common/AnimalCard.vue'

const animalsStore = useAnimalsStore()

const featuredAnimals = computed(() => {
  return animalsStore.availableAnimals.slice(0, 4)
})

const blogPosts = ref([
  {
    id: '1',
    title: 'كيف تعتني بقطتك في الصيف',
    excerpt: 'نصائح مهمة للحفاظ على صحة قطتك خلال أشهر الصيف الحارة',
    category: 'رعاية القطط',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '15 أكتوبر 2023'
  },
  {
    id: '2',
    title: 'التدريب الأساسي للكلاب',
    excerpt: 'خطوات بسيطة لتدريب كلبك على الأوامر الأساسية',
    category: 'تدريب الكلاب',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '12 أكتوبر 2023'
  },
  {
    id: '3',
    title: 'أفضل أنواع الطعام للحيوانات الأليفة',
    excerpt: 'دليل شامل لاختيار الطعام المناسب لحيوانك الأليف',
    category: 'التغذية',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    date: '8 أكتوبر 2023'
  }
])

const handleContactAnimal = (animal) => {
  console.log('Contact animal:', animal)
  // سيتم تنفيذ وظيفة التواصل لاحقاً
}
</script>

<style scoped lang="scss">
.home-view {
  .hero-section {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
    color: white;
    padding: 4rem 0;
    position: relative;
    overflow: hidden;
    
    .hero-background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
      background-size: cover;
      background-position: center;
      opacity: 0.1;
    }
    
    .hero-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4rem;
      position: relative;
      
      @media (max-width: 992px) {
        flex-direction: column;
        text-align: center;
      }
    }
    
    .hero-text {
      flex: 1;
      
      .hero-title {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: white;
        
        .highlight {
          color: var(--secondary-color);
        }
        
        @media (max-width: 768px) {
          font-size: 2rem;
        }
      }
      
      .hero-description {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.6;
      }
      
      .hero-actions {
        display: flex;
        gap: 1rem;
        
        @media (max-width: 576px) {
          flex-direction: column;
        }
        
        .btn {
          i {
            margin-left: 0.5rem;
          }
        }
      }
    }
    
    .hero-image {
      flex: 1;
      
      img {
        width: 100%;
        max-width: 500px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        
        @media (max-width: 992px) {
          max-width: 400px;
        }
      }
    }
  }
  
  .stats-section {
    background-color: white;
    padding: 2rem 0;
    
    .stats-grid {
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
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background-color: var(--light-color);
      border-radius: var(--border-radius);
      transition: transform var(--transition-normal);
      
      &:hover {
        transform: translateY(-4px);
      }
      
      .stat-icon {
        width: 60px;
        height: 60px;
        background-color: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        i {
          font-size: 1.5rem;
          color: white;
        }
      }
      
      .stat-content {
        h3 {
          margin-bottom: 0.25rem;
          color: var(--dark-color);
          font-size: 1.5rem;
        }
        
        p {
          margin-bottom: 0;
          color: var(--gray-color);
          font-size: 0.9rem;
        }
      }
    }
  }
  
  .how-it-works {
    background-color: var(--light-color);
    
    .steps-grid {
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
    
    .step {
      text-align: center;
      padding: 2rem 1.5rem;
      background-color: white;
      border-radius: var(--border-radius);
      position: relative;
      
      .step-number {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.25rem;
      }
      
      .step-icon {
        width: 80px;
        height: 80px;
        background-color: var(--primary-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        
        i {
          font-size: 2rem;
          color: var(--primary-color);
        }
      }
      
      h3 {
        margin-bottom: 1rem;
        color: var(--dark-color);
      }
      
      p {
        color: var(--gray-color);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 0;
      }
    }
  }
  
  .featured-animals {
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      
      @media (max-width: 576px) {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
    }
    
    .animals-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      
      @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }
      
      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
  }
  
  .services-section {
    background-color: var(--light-color);
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      
      @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
    
    .service-card {
      background-color: white;
      padding: 2rem 1.5rem;
      border-radius: var(--border-radius);
      text-align: center;
      transition: transform var(--transition-normal);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }
      
      .service-icon {
        width: 80px;
        height: 80px;
        background-color: var(--primary-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        
        i {
          font-size: 2rem;
          color: var(--primary-color);
        }
      }
      
      h3 {
        margin-bottom: 1rem;
        color: var(--dark-color);
      }
      
      p {
        color: var(--gray-color);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
      
      .service-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--primary-color);
        font-weight: 600;
        font-size: 0.9rem;
        
        i {
          font-size: 0.8rem;
          transition: transform var(--transition-fast);
        }
        
        &:hover i {
          transform: translateX(-4px);
        }
      }
    }
  }
  
  .blog-section {
    .blog-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      
      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
    
    .blog-card {
      background-color: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform var(--transition-normal);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }
      
      .blog-image {
        height: 200px;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }
        
        &:hover img {
          transform: scale(1.05);
        }
      }
      
      .blog-content {
        padding: 1.5rem;
        
        .blog-category {
          display: inline-block;
          background-color: var(--primary-light);
          color: var(--primary-color);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .blog-title {
          margin-bottom: 1rem;
          color: var(--dark-color);
          font-size: 1.1rem;
          line-height: 1.4;
        }
        
        .blog-excerpt {
          color: var(--gray-color);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .blog-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          .blog-date {
            color: var(--gray-color);
            font-size: 0.85rem;
            
            i {
              margin-left: 0.5rem;
            }
          }
          
          .read-more {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary-color);
            font-weight: 600;
            font-size: 0.9rem;
            
            i {
              font-size: 0.8rem;
              transition: transform var(--transition-fast);
            }
            
            &:hover i {
              transform: translateX(-4px);
            }
          }
        }
      }
    }
  }
}
</style>