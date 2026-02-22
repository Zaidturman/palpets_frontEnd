import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isLoading = ref(false)
  const shippingAddress = ref({
    name: '',
    phone: '',
    city: '',
    district: '',
    street: '',
    building: '',
    notes: ''
  })

  // إجمالي السعر
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  })

  // إجمالي العناصر
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  // سعر التوصيل
  const shippingCost = computed(() => {
    if (totalPrice.value > 200) {
      return 0
    }
    return 25
  })

  // الإجمالي النهائي
  const finalTotal = computed(() => {
    return totalPrice.value + shippingCost.value
  })

  // إضافة منتج للسلة
  const addToCart = (product, quantity = 1) => {
    const existingItemIndex = items.value.findIndex(
      item => item.product.id === product.id
    )
    
    if (existingItemIndex !== -1) {
      items.value[existingItemIndex].quantity += quantity
    } else {
      items.value.push({
        product,
        quantity,
        addedAt: new Date().toISOString()
      })
    }
    
    saveToLocalStorage()
  }

  // تحديث الكمية
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    const itemIndex = items.value.findIndex(
      item => item.product.id === productId
    )
    
    if (itemIndex !== -1) {
      items.value[itemIndex].quantity = quantity
      saveToLocalStorage()
    }
  }

  // إزالة من السلة
  const removeFromCart = (productId) => {
    items.value = items.value.filter(item => item.product.id !== productId)
    saveToLocalStorage()
  }

  // تفريغ السلة
  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  // تحديث عنوان الشحن
  const updateShippingAddress = (address) => {
    shippingAddress.value = { ...shippingAddress.value, ...address }
    saveToLocalStorage()
  }

  // إنشاء طلب
  const createOrder = async () => {
    isLoading.value = true
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // محاكاة إنشاء طلب
      const orderId = `ORD-${Date.now().toString().slice(-8)}`
      const order = {
        id: orderId,
        items: [...items.value],
        total: finalTotal.value,
        shippingAddress: { ...shippingAddress.value },
        createdAt: new Date().toISOString(),
        status: 'processing'
      }
      
      // حفظ الطلب في localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.unshift(order)
      localStorage.setItem('orders', JSON.stringify(orders))
      
      // تفريغ السلة بعد إنشاء الطلب
      clearCart()
      
      Swal.fire({
        title: 'تم إنشاء الطلب!',
        html: `
          <div class="text-right">
            <p>تم استلام طلبك رقم <strong>${orderId}</strong></p>
            <p>سيتم التواصل معك لتأكيد الطلب وتحديد موعد التوصيل</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'حسناً'
      })
      
      return {
        success: true,
        orderId,
        order
      }
    } catch (error) {
      Swal.fire({
        title: 'خطأ',
        text: 'فشل إنشاء الطلب، يرجى المحاولة مرة أخرى',
        icon: 'error'
      })
      return {
        success: false,
        error: 'فشل إنشاء الطلب'
      }
    } finally {
      isLoading.value = false
    }
  }

  // الحفظ في localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value))
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress.value))
  }

  // التحميل من localStorage
  const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart')
    const savedAddress = localStorage.getItem('shippingAddress')
    
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
    
    if (savedAddress) {
      shippingAddress.value = JSON.parse(savedAddress)
    }
  }

  // التهيئة
  const init = () => {
    loadFromLocalStorage()
  }

  return {
    items,
    isLoading,
    shippingAddress,
    totalPrice,
    totalItems,
    shippingCost,
    finalTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    updateShippingAddress,
    createOrder,
    init
  }
})