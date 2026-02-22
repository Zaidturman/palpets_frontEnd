// تنسيق الأرقام كعملة
export const formatCurrency = (amount, currency = 'SAR') => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount)
}

// تنسيق التاريخ
export const formatDate = (dateString, format = 'short') => {
  const date = new Date(dateString)
  const options = format === 'short' 
    ? { day: 'numeric', month: 'short', year: 'numeric' }
    : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  
  return date.toLocaleDateString('ar-SA', options)
}

// حساب الوقت المنقضي
export const timeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)
  
  const intervals = [
    { label: 'سنة', seconds: 31536000 },
    { label: 'شهر', seconds: 2592000 },
    { label: 'أسبوع', seconds: 604800 },
    { label: 'يوم', seconds: 86400 },
    { label: 'ساعة', seconds: 3600 },
    { label: 'دقيقة', seconds: 60 }
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count > 0) {
      return `منذ ${count} ${interval.label}${count > 1 ? 'ات' : ''}`
    }
  }
  
  return 'الآن'
}

// إختصار النص
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// التحقق من البريد الإلكتروني
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// التحقق من رقم الهاتف السعودي
export const isValidSAPhone = (phone) => {
  const regex = /^(009665|9665|\+9665|05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
  return regex.test(phone)
}

// توليد معرف فريد
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// صيغة الاسم العربي
export const formatArabicName = (name) => {
  return name.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }).join(' ')
}

// الحصول على أيقونة حسب نوع الحيوان
export const getAnimalIcon = (type) => {
  const icons = {
    dog: 'fas fa-dog',
    cat: 'fas fa-cat',
    bird: 'fas fa-dove',
    rabbit: 'fas fa-paw',
    other: 'fas fa-paw'
  }
  return icons[type] || icons.other
}

// الحصول على لون حسب حالة الحيوان
export const getStatusColor = (status) => {
  const colors = {
    available: 'success',
    pending: 'warning',
    adopted: 'info',
    lost: 'error',
    found: 'success'
  }
  return colors[status] || 'info'
}

// التحقق من الصورة URL
export const isValidImageUrl = (url) => {
  if (!url) return false
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  return imageExtensions.some(ext => url.toLowerCase().includes(ext))
}

// عرض رسالة تأكيد
export const showConfirmDialog = async (title, text, confirmText = 'نعم', cancelText = 'إلغاء') => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  })
  return result.isConfirmed
}