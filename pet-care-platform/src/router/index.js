import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

// استيراد المكونات باستخدام lazy loading
const HomeView = () => import('@/views/HomeView.vue')
const AdoptionView = () => import('@/views/AdoptionView.vue')
const AnimalDetailsView = () => import('@/views/AnimalDetailsView.vue')
const LostFoundView = () => import('@/views/LostFoundView.vue')
const VeterinaryView = () => import('@/views/VeterinaryView.vue')
const VetClinicsView = () => import('@/views/VetClinicsView.vue')
const AppointmentView = () => import('@/views/AppointmentView.vue')
const ShopView = () => import('@/views/ShopView.vue')
const ProductDetailsView = () => import('@/views/ProductDetailsView.vue')
const CartView = () => import('@/views/CartView.vue')
const CommunityView = () => import('@/views/CommunityView.vue')
const BreedersView = () => import('@/views/BreedersView.vue')
const SheltersView = () => import('@/views/SheltersView.vue')
const BlogView = () => import('@/views/BlogView.vue')
const BlogPostView = () => import('@/views/BlogPostView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ContactView = () => import('@/views/ContactView.vue')
const AuthView = () => import('@/views/AuthView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const ProfileView = () => import('@/views/dashboard/ProfileView.vue')
const MyPetsView = () => import('@/views/dashboard/MyPetsView.vue')
const MyAdsView = () => import('@/views/dashboard/MyAdsView.vue')
const AppointmentsView = () => import('@/views/dashboard/AppointmentsView.vue')
const OrdersView = () => import('@/views/dashboard/OrdersView.vue')
const MessagesView = () => import('@/views/dashboard/MessagesView.vue')
const SettingsView = () => import('@/views/dashboard/SettingsView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'الرئيسية' }
  },
  {
    path: '/adoption',
    name: 'Adoption',
    component: AdoptionView,
    meta: { title: 'التبني والشراء' }
  },
  {
    path: '/adoption/:id',
    name: 'AnimalDetails',
    component: AnimalDetailsView,
    meta: { title: 'تفاصيل الحيوان' }
  },
  {
    path: '/lost-found',
    name: 'LostFound',
    component: LostFoundView,
    meta: { title: 'مفقود ومعثور عليه' }
  },
  {
    path: '/veterinary',
    name: 'Veterinary',
    component: VeterinaryView,
    meta: { title: 'الخدمات البيطرية' }
  },
  {
    path: '/veterinary/clinics',
    name: 'VetClinics',
    component: VetClinicsView,
    meta: { title: 'العيادات البيطرية' }
  },
  {
    path: '/veterinary/appointment',
    name: 'Appointment',
    component: AppointmentView,
    meta: { title: 'حجز موعد' }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopView,
    meta: { title: 'المتجر' }
  },
  {
    path: '/shop/product/:id',
    name: 'ProductDetails',
    component: ProductDetailsView,
    meta: { title: 'تفاصيل المنتج' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
    meta: { title: 'سلة التسوق', requiresAuth: true }
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityView,
    meta: { title: 'المجتمع' }
  },
  {
    path: '/breeders',
    name: 'Breeders',
    component: BreedersView,
    meta: { title: 'المربون' }
  },
  {
    path: '/shelters',
    name: 'Shelters',
    component: SheltersView,
    meta: { title: 'الملاجئ' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogView,
    meta: { title: 'المدونة' }
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPostView,
    meta: { title: 'مقال' }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: 'عن المنصة' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
    meta: { title: 'اتصل بنا' }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    meta: { title: 'تسجيل الدخول', hideHeader: true, hideFooter: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { title: 'لوحة التحكم', requiresAuth: true }
  },
  {
    path: '/dashboard/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { title: 'الملف الشخصي', requiresAuth: true }
  },
  {
    path: '/dashboard/my-pets',
    name: 'MyPets',
    component: MyPetsView,
    meta: { title: 'حيواناتي', requiresAuth: true }
  },
  {
    path: '/dashboard/my-ads',
    name: 'MyAds',
    component: MyAdsView,
    meta: { title: 'إعلاناتي', requiresAuth: true }
  },
  {
    path: '/dashboard/appointments',
    name: 'Appointments',
    component: AppointmentsView,
    meta: { title: 'مواعيدي', requiresAuth: true }
  },
  {
    path: '/dashboard/orders',
    name: 'Orders',
    component: OrdersView,
    meta: { title: 'طلباتي', requiresAuth: true }
  },
  {
    path: '/dashboard/messages',
    name: 'Messages',
    component: MessagesView,
    meta: { title: 'الرسائل', requiresAuth: true }
  },
  {
    path: '/dashboard/settings',
    name: 'Settings',
    component: SettingsView,
    meta: { title: 'الإعدادات', requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: 'الصفحة غير موجودة' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// حماية المسارات التي تتطلب مصادقة
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // تحديث عنوان الصفحة
  document.title = to.meta.title ? `${to.meta.title} | منصة رعاية الحيوانات` : 'منصة رعاية الحيوانات'
  
  // التحقق من صلاحية الوصول
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router