import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

export const useAnimalsStore = defineStore('animals', () => {
  const animals = ref([
    {
      id: '1',
      name: 'لونا',
      type: 'cat',
      breed: 'شيرازي',
      age: '2 سنوات',
      gender: 'female',
      size: 'small',
      color: 'أبيض ورمادي',
      location: 'الرياض',
      status: 'available',
      price: 0,
      isVaccinated: true,
      isNeutered: true,
      description: 'قطة شيرازية جميلة وهادئة، تحب اللعب والتسلية، ودودة مع الأطفال، مناسبة للعائلات. تتناول الطعام الجاف والرطب، مدربة على استخدام الليتر بوكس.',
      images: [
        'https://images.unsplash.com/photo-1514888286974-6d03bde4ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      ownerId: '2',
      ownerName: 'أحمد السعيد',
      createdAt: '2023-10-15',
      updatedAt: '2023-10-15',
      views: 125,
      likes: 34
    },
    {
      id: '2',
      name: 'ماكس',
      type: 'dog',
      breed: 'جيرمن شيبرد',
      age: '3 سنوات',
      gender: 'male',
      size: 'large',
      color: 'أسود وبني',
      location: 'جدة',
      status: 'available',
      price: 1500,
      isVaccinated: true,
      isNeutered: false,
      description: 'كلب حراسة ممتاز، مدرب جيداً على الأوامر الأساسية، ودود مع الأطفال، يحتاج إلى مساحة كبيرة للحركة. تلقى تدريباً خاصاً على الطاعة.',
      images: [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      ownerId: '2',
      ownerName: 'أحمد السعيد',
      createdAt: '2023-10-10',
      updatedAt: '2023-10-10',
      views: 89,
      likes: 21
    },
    {
      id: '3',
      name: 'جاك',
      type: 'dog',
      breed: 'لابرادور',
      age: '4 شهور',
      gender: 'male',
      size: 'medium',
      color: 'ذهبي',
      location: 'الدمام',
      status: 'pending',
      price: 0,
      isVaccinated: true,
      isNeutered: false,
      description: 'جرو لابرادور نشيط وودود، يحب اللعب والمرح، مدرب على الأوامر الأساسية، يحتاج إلى عناية وتدريب مستمر.',
      images: [
        'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      ownerId: '2',
      ownerName: 'أحمد السعيد',
      createdAt: '2023-10-05',
      updatedAt: '2023-10-05',
      views: 156,
      likes: 45
    },
    {
      id: '4',
      name: 'سيمبا',
      type: 'cat',
      breed: 'هيمالايا',
      age: '1.5 سنوات',
      gender: 'male',
      size: 'small',
      color: 'كريمي',
      location: 'الرياض',
      status: 'available',
      price: 800,
      isVaccinated: true,
      isNeutered: true,
      description: 'قطة هيمالايا جميلة، هادئة وتحب المداعبة، مناسبة للشقق، تأكل الطعام الجاف الخاص بالقطط.',
      images: [
        'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ],
      ownerId: '1',
      ownerName: 'محمد أحمد',
      createdAt: '2023-10-18',
      updatedAt: '2023-10-18',
      views: 67,
      likes: 18
    }
  ])

  const lostFoundAnimals = ref([
    {
      id: 'lf1',
      type: 'lost',
      animalName: 'بسبس',
      animalType: 'cat',
      breed: 'شيرازي',
      color: 'أبيض',
      lastSeen: 'حي النخيل - الرياض',
      date: '2023-10-20',
      description: 'قطة شيرازية بيضاء بعيون زرقاء، ترتدي طوقاً أحمر، هادئة ولا تخاف من الناس.',
      contactPhone: '+966500000001',
      reward: 500,
      isFound: false,
      images: ['https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80']
    },
    {
      id: 'lf2',
      type: 'found',
      animalName: 'ماكس',
      animalType: 'dog',
      breed: 'جولدن ريتريفر',
      color: 'ذهبي',
      foundLocation: 'حديقة الملك عبدالله - جدة',
      date: '2023-10-19',
      description: 'كلب جولدن لطيف وودود، يبدو أنه ضائع، يرتدي طوقاً بنياً.',
      contactPhone: '+966500000002',
      isReturned: false,
      images: ['https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80']
    }
  ])

  const filters = ref({
    type: '',
    location: '',
    status: '',
    minAge: '',
    maxAge: '',
    gender: '',
    size: '',
    breed: '',
    priceRange: [0, 5000]
  })

  const isLoading = ref(false)
  const selectedAnimal = ref(null)

  // حيوانات التبني المتاحة
  const availableAnimals = computed(() => {
    return animals.value.filter(animal => animal.status === 'available')
  })

  // الحيوانات المعلقة
  const pendingAnimals = computed(() => {
    return animals.value.filter(animal => animal.status === 'pending')
  })

  // الحيوانات التي تم تبنّيها
  const adoptedAnimals = computed(() => {
    return animals.value.filter(animal => animal.status === 'adopted')
  })

  // الحيوانات المفقودة
  const lostAnimals = computed(() => {
    return lostFoundAnimals.value.filter(animal => animal.type === 'lost' && !animal.isFound)
  })

  // الحيوانات المعثور عليها
  const foundAnimals = computed(() => {
    return lostFoundAnimals.value.filter(animal => animal.type === 'found' && !animal.isReturned)
  })

  // الحيوانات المفلترة
  const filteredAnimals = computed(() => {
    let filtered = [...animals.value]
    
    if (filters.value.type) {
      filtered = filtered.filter(animal => animal.type === filters.value.type)
    }
    
    if (filters.value.location) {
      filtered = filtered.filter(animal => 
        animal.location.includes(filters.value.location)
      )
    }
    
    if (filters.value.status) {
      filtered = filtered.filter(animal => animal.status === filters.value.status)
    }
    
    if (filters.value.gender) {
      filtered = filtered.filter(animal => animal.gender === filters.value.gender)
    }
    
    if (filters.value.size) {
      filtered = filtered.filter(animal => animal.size === filters.value.size)
    }
    
    if (filters.value.breed) {
      filtered = filtered.filter(animal => 
        animal.breed.toLowerCase().includes(filters.value.breed.toLowerCase())
      )
    }
    
    if (filters.value.minAge) {
      const minAgeNum = parseInt(filters.value.minAge)
      filtered = filtered.filter(animal => {
        const ageNum = parseInt(animal.age)
        return ageNum >= minAgeNum
      })
    }
    
    if (filters.value.maxAge) {
      const maxAgeNum = parseInt(filters.value.maxAge)
      filtered = filtered.filter(animal => {
        const ageNum = parseInt(animal.age)
        return ageNum <= maxAgeNum
      })
    }
    
    filtered = filtered.filter(animal => {
      return animal.price >= filters.value.priceRange[0] && 
             animal.price <= filters.value.priceRange[1]
    })
    
    return filtered
  })

  // الحصول على حيوان بالمعرف
  const getAnimalById = (id) => {
    const animal = animals.value.find(animal => animal.id === id)
    if (animal) {
      animal.views++
      selectedAnimal.value = animal
    }
    return animal
  }

  // الحصول على حيوان مفقود/معثور عليه بالمعرف
  const getLostFoundById = (id) => {
    return lostFoundAnimals.value.find(animal => animal.id === id)
  }

  // إضافة حيوان جديد
  const addAnimal = async (animalData) => {
    isLoading.value = true
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAnimal = {
        ...animalData,
        id: Date.now().toString(),
        views: 0,
        likes: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      animals.value.unshift(newAnimal)
      
      Swal.fire({
        title: 'تم النشر!',
        text: 'تم إضافة الحيوان بنجاح',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      
      return { success: true, animal: newAnimal }
    } catch (error) {
      Swal.fire({
        title: 'خطأ',
        text: 'فشل إضافة الحيوان',
        icon: 'error'
      })
      return { success: false, error: 'فشل إضافة الحيوان' }
    } finally {
      isLoading.value = false
    }
  }

  // إضافة إعلان مفقود/معثور عليه
  const addLostFound = async (data) => {
    try {
      const newAd = {
        ...data,
        id: 'lf' + Date.now().toString(),
        isFound: false,
        isReturned: false
      }
      
      lostFoundAnimals.value.unshift(newAd)
      
      Swal.fire({
        title: 'تم النشر!',
        text: 'تم نشر الإعلان بنجاح',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      
      return { success: true, ad: newAd }
    } catch (error) {
      Swal.fire({
        title: 'خطأ',
        text: 'فشل نشر الإعلان',
        icon: 'error'
      })
      return { success: false, error: 'فشل نشر الإعلان' }
    }
  }

  // تحديث حالة الحيوان
  const updateAnimalStatus = async (id, status) => {
    const animalIndex = animals.value.findIndex(animal => animal.id === id)
    
    if (animalIndex !== -1) {
      animals.value[animalIndex].status = status
      animals.value[animalIndex].updatedAt = new Date().toISOString().split('T')[0]
      
      Swal.fire({
        title: 'تم التحديث!',
        text: `تم تحديث حالة الحيوان إلى ${status === 'adopted' ? 'تم التبني' : status}`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
      
      return { success: true }
    }
    
    Swal.fire({
      title: 'خطأ',
      text: 'الحيوان غير موجود',
      icon: 'error'
    })
    
    return { success: false, error: 'الحيوان غير موجود' }
  }

  // إضافة إعجاب
  const likeAnimal = (id) => {
    const animalIndex = animals.value.findIndex(animal => animal.id === id)
    if (animalIndex !== -1) {
      animals.value[animalIndex].likes++
    }
  }

  // تحديث الفلاتر
  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    filters.value = {
      type: '',
      location: '',
      status: '',
      minAge: '',
      maxAge: '',
      gender: '',
      size: '',
      breed: '',
      priceRange: [0, 5000]
    }
  }

  // تبادل الرسائل حول حيوان
  const sendMessage = async (animalId, message) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    Swal.fire({
      title: 'تم الإرسال!',
      text: 'تم إرسال رسالتك بنجاح',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
    
    return { success: true }
  }

  return {
    animals,
    lostFoundAnimals,
    filters,
    isLoading,
    selectedAnimal,
    availableAnimals,
    pendingAnimals,
    adoptedAnimals,
    lostAnimals,
    foundAnimals,
    filteredAnimals,
    getAnimalById,
    getLostFoundById,
    addAnimal,
    addLostFound,
    updateAnimalStatus,
    likeAnimal,
    updateFilters,
    resetFilters,
    sendMessage
  }
})