import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { useCartStore } from '@/stores/cart.store'

export const useShopStore = defineStore('shop', () => {
  const products = ref([
    {
      id: '1',
      name: 'طعام جاف للقطط',
      category: 'food',
      brand: 'Royal Canin',
      description: 'طعام جاف عالي الجودة للقطط البالغة، غني بالبروتين والفيتامينات.',
      price: 120,
      originalPrice: 140,
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      stock: 50,
      rating: 4.5,
      reviews: 24,
      weight: '4 كجم',
      features: ['غني بالبروتين', 'يدعم صحة الشعر', 'سهل الهضم']
    },
    {
      id: '2',
      name: 'ألعاب للكلاب',
      category: 'toys',
      brand: 'KONG',
      description: 'مجموعة ألعاب متينة وآمنة للكلاب، تساعد في تنمية مهاراتها.',
      price: 85,
      originalPrice: 100,
      image: 'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      stock: 100,
      rating: 4.8,
      reviews: 18,
      features: ['متينة وآمنة', 'تنظيف الأسنان', 'تقليل التوتر']
    },
    {
      id: '3',
      name: 'طوق كلاب جلدي',
      category: 'accessories',
      brand: 'Luxury Pet',
      description: 'طوق جلدي فاخر للكلاب مع قلادة معدنية قابلة للتعديل.',
      price: 65,
      originalPrice: 80,
      image: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      stock: 30,
      rating: 4.3,
      reviews: 12,
      features: ['جلد طبيعي', 'قابل للتعديل', 'مقاوم للماء']
    },
    {
      id: '4',
      name: 'فرشاة للقطط',
      category: 'grooming',
      brand: 'FURminator',
      description: 'فرشاة متخصصة لإزالة الشعر الميت والتساقط للقطط.',
      price: 45,
      originalPrice: 55,
      image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      stock: 75,
      rating: 4.7,
      reviews: 31,
      features: ['تنظيف عميق', 'مريح للقطط', 'سهل التنظيف']
    },
    {
      id: '5',
      name: 'مكملات غذائية للكلاب',
      category: 'health',
      brand: 'Nutri-Vet',
      description: 'مكملات غذائية لدعم صحة المفاصل والعظام للكلاب الكبيرة.',
      price: 95,
      originalPrice: 110,
      image: 'https://images.unsplash.com/photo-1593081891731-fda0877988da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      stock: 40,
      rating: 4.6,
      reviews: 19,
      features: ['دعم المفاصل', 'غني بالكالسيوم', 'سهل التناول']
    },
    {
      id: '6',
      name: 'صندوق فضلات للقطط',
      category: 'accessories',
      brand: 'IRIS',
      description: 'صندوق فضلات مغلق مع فلتر كربون للتخلص من الروائح.',
      price: 150,
      originalPrice: 180,
      image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      stock: 25,
      rating: 4.4,
      reviews: 15,
      features: ['مغلق', 'فلتر كربون', 'سهل التنظيف']
    }
  ])

  const filters = ref({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    brand: '',
    rating: 0,
    inStock: false,
    onSale: false
  })

  const isLoading = ref(false)
  const selectedProduct = ref(null)
  const cartStore = useCartStore()

  // المنتجات المفلترة
  const filteredProducts = computed(() => {
    let filtered = [...products.value]
    
    if (filters.value.category) {
      filtered = filtered.filter(product => product.category === filters.value.category)
    }
    
    if (filters.value.brand) {
      filtered = filtered.filter(product => product.brand === filters.value.brand)
    }
    
    if (filters.value.minPrice > 0) {
      filtered = filtered.filter(product => product.price >= filters.value.minPrice)
    }
    
    if (filters.value.maxPrice < 1000) {
      filtered = filtered.filter(product => product.price <= filters.value.maxPrice)
    }
    
    if (filters.value.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.value.rating)
    }
    
    if (filters.value.inStock) {
      filtered = filtered.filter(product => product.stock > 0)
    }
    
    if (filters.value.onSale) {
      filtered = filtered.filter(product => product.originalPrice > product.price)
    }
    
    return filtered
  })

  // المنتجات الأكثر مبيعاً
  const bestSellingProducts = computed(() => {
    return [...products.value]
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 4)
  })

  // المنتجات في العرض
  const onSaleProducts = computed(() => {
    return products.value.filter(product => product.originalPrice > product.price)
  })

  // المنتجات حسب التصنيف
  const productsByCategory = computed(() => {
    const categories = {}
    products.value.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = []
      }
      categories[product.category].push(product)
    })
    return categories
  })

  // الماركات المتاحة
  const availableBrands = computed(() => {
    const brands = new Set()
    products.value.forEach(product => brands.add(product.brand))
    return Array.from(brands)
  })

  // الحصول على منتج بالمعرف
  const getProductById = (id) => {
    const product = products.value.find(product => product.id === id)
    if (product) {
      selectedProduct.value = product
    }
    return product
  }

  // إضافة منتج للسلة
  const addToCart = (product, quantity = 1) => {
    if (product.stock < quantity) {
      Swal.fire({
        title: 'غير متوفر',
        text: 'الكمية المطلوبة غير متوفرة في المخزون',
        icon: 'warning'
      })
      return { success: false }
    }
    
    cartStore.addToCart(product, quantity)
    
    Swal.fire({
      title: 'تم الإضافة',
      text: 'تمت إضافة المنتج إلى سلة التسوق',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
    
    return { success: true }
  }

  // تحديث الفلاتر
  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    filters.value = {
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      brand: '',
      rating: 0,
      inStock: false,
      onSale: false
    }
  }

  // إضافة تقييم
  const addReview = async (productId, review) => {
    const productIndex = products.value.findIndex(p => p.id === productId)
    
    if (productIndex !== -1) {
      const product = products.value[productIndex]
      
      // حساب التقييم الجديد
      const newRating = (product.rating * product.reviews + review.rating) / (product.reviews + 1)
      
      products.value[productIndex] = {
        ...product,
        rating: parseFloat(newRating.toFixed(1)),
        reviews: product.reviews + 1
      }
      
      Swal.fire({
        title: 'شكراً لك!',
        text: 'تم إضافة تقييمك بنجاح',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      
      return { success: true }
    }
    
    return { success: false, error: 'المنتج غير موجود' }
  }

  return {
    products,
    filters,
    isLoading,
    selectedProduct,
    filteredProducts,
    bestSellingProducts,
    onSaleProducts,
    productsByCategory,
    availableBrands,
    getProductById,
    addToCart,
    updateFilters,
    resetFilters,
    addReview
  }
})