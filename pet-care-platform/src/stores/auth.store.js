import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref(null)

  // بيانات تجريبية للمستخدمين
  const mockUsers = [
    {
      id: '1',
      name: 'محمد أحمد',
      email: 'user@example.com',
      phone: '+966500000001',
      role: 'user',
      avatar: 'https://ui-avatars.com/api/?name=محمد+أحمد&background=4CAF50&color=fff',
      location: 'الرياض',
      joinedAt: '2023-01-15',
      isVerified: true,
      bio: 'محب للحيوانات وخاصة القطط، أملك قطتين وأهتم برعاية الحيوانات الضالة.'
    },
    {
      id: '2',
      name: 'أحمد السعيد',
      email: 'breeder@example.com',
      phone: '+966500000002',
      role: 'breeder',
      avatar: 'https://ui-avatars.com/api/?name=أحمد+السعيد&background=2196F3&color=fff',
      location: 'جدة',
      joinedAt: '2022-11-20',
      isVerified: true,
      bio: 'مربي كلاب جيرمن شيبرد محترف، أملك مزرعة تربية معتمدة.'
    },
    {
      id: '3',
      name: 'د. سارة محمد',
      email: 'vet@example.com',
      phone: '+966500000003',
      role: 'vet',
      avatar: 'https://ui-avatars.com/api/?name=سارة+محمد&background=FF9800&color=fff',
      location: 'الدمام',
      joinedAt: '2023-03-10',
      isVerified: true,
      bio: 'طبيبة بيطرية متخصصة في جراحة الحيوانات الصغيرة.'
    }
  ]

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isBreeder = computed(() => user.value?.role === 'breeder')
  const isVet = computed(() => user.value?.role === 'vet')

  // تسجيل الدخول
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // محاكاة عملية الدخول
      const mockUser = mockUsers.find(u => u.email === credentials.email)
      
      if (!mockUser) {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      }
      
      user.value = mockUser
      token.value = 'mock-jwt-token-' + Date.now()
      
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      Swal.fire({
        title: 'مرحباً بعودتك!',
        text: 'تم تسجيل الدخول بنجاح',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      Swal.fire({
        title: 'خطأ',
        text: err.message,
        icon: 'error'
      })
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // التسجيل
  const register = async (data) => {
    isLoading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // التحقق من عدم وجود مستخدم بنفس البريد
      const userExists = mockUsers.some(u => u.email === data.email)
      if (userExists) {
        throw new Error('البريد الإلكتروني مسجل بالفعل')
      }
      
      const newUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=4CAF50&color=fff`,
        location: data.location || 'غير محدد',
        joinedAt: new Date().toISOString().split('T')[0],
        isVerified: false,
        bio: data.bio || ''
      }
      
      user.value = newUser
      localStorage.setItem('user', JSON.stringify(newUser))
      
      Swal.fire({
        title: 'مرحباً بك!',
        text: 'تم إنشاء حسابك بنجاح',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      Swal.fire({
        title: 'خطأ',
        text: err.message,
        icon: 'error'
      })
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // تسجيل الخروج
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    Swal.fire({
      title: 'تم تسجيل الخروج',
      text: 'نراكم قريباً!',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    })
  }

  // تحديث الملف الشخصي
  const updateProfile = async (profileData) => {
    if (!user.value) return { success: false, error: 'يجب تسجيل الدخول أولاً' }
    
    try {
      user.value = { ...user.value, ...profileData }
      localStorage.setItem('user', JSON.stringify(user.value))
      
      Swal.fire({
        title: 'تم التحديث',
        text: 'تم تحديث ملفك الشخصي بنجاح',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      
      return { success: true }
    } catch (err) {
      Swal.fire({
        title: 'خطأ',
        text: 'فشل تحديث الملف الشخصي',
        icon: 'error'
      })
      return { success: false, error: 'فشل تحديث الملف الشخصي' }
    }
  }

  // تحديث كلمة المرور
  const updatePassword = async (passwordData) => {
    // محاكاة تحديث كلمة المرور
    await new Promise(resolve => setTimeout(resolve, 1000))
    Swal.fire({
      title: 'تم التحديث',
      text: 'تم تحديث كلمة المرور بنجاح',
      icon: 'success'
    })
    return { success: true }
  }

  // التهيئة من localStorage
  const init = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isBreeder,
    isVet,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
    init
  }
})