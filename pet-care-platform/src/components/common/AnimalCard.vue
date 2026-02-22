<template>
  <div class="animal-card" @click="$emit('click', animal)">
    <div class="animal-image">
      <img :src="animal.images[0]" :alt="animal.name" @error="handleImageError">
      <span class="animal-type">{{ getAnimalTypeText(animal.type) }}</span>
      <span class="animal-status" :class="`status-${animal.status}`">
        {{ getStatusText(animal.status) }}
      </span>
      <button class="favorite-btn" @click.stop="toggleFavorite">
        <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
      </button>
    </div>
    
    <div class="animal-info">
      <div class="animal-header">
        <h3>{{ animal.name }}</h3>
        <p class="animal-breed">{{ animal.breed }}</p>
      </div>
      
      <div class="animal-details">
        <div class="detail">
          <i class="fas fa-venus-mars"></i>
          <span>{{ animal.gender === 'male' ? 'ذكر' : 'أنثى' }}</span>
        </div>
        <div class="detail">
          <i class="fas fa-birthday-cake"></i>
          <span>{{ animal.age }}</span>
        </div>
        <div class="detail">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ animal.location }}</span>
        </div>
      </div>
      
      <div class="animal-description">
        <p>{{ truncateText(animal.description, 80) }}</p>
      </div>
      
      <div class="animal-footer">
        <div class="price-section">
          <span class="price" v-if="animal.price > 0">
            {{ formatCurrency(animal.price) }}
          </span>
          <span class="free" v-else>
            للتبني مجاناً
          </span>
        </div>
        
        <div class="animal-stats">
          <span class="stat">
            <i class="far fa-eye"></i>
            {{ animal.views }}
          </span>
          <span class="stat">
            <i class="far fa-heart"></i>
            {{ animal.likes }}
          </span>
        </div>
      </div>
      
      <div class="animal-actions">
        <router-link :to="`/adoption/${animal.id}`" class="btn btn-primary">
          <i class="fas fa-info-circle"></i>
          التفاصيل
        </router-link>
        <button class="btn btn-outline" @click.stop="contactOwner">
          <i class="fas fa-envelope"></i>
          تواصل
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatCurrency } from '@/utils/helpers'

const props = defineProps({
  animal: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'contact', 'favorite'])

const isFavorite = ref(false)

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const getAnimalTypeText = (type) => {
  const types = {
    dog: 'كلب',
    cat: 'قطة',
    bird: 'طائر',
    rabbit: 'أرنب',
    other: 'حيوان أليف'
  }
  return types[type] || types.other
}

const getStatusText = (status) => {
  const statuses = {
    available: 'متاح',
    pending: 'معلق',
    adopted: 'تم التبني'
  }
  return statuses[status] || status
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  emit('favorite', props.animal.id, isFavorite.value)
}

const contactOwner = () => {
  emit('contact', props.animal)
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Pet+Image'
}
</script>

<style scoped lang="scss">
.animal-card {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
  
  .animal-image {
    position: relative;
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
    
    .animal-type {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: var(--primary-color);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .animal-status {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      
      &.status-available {
        background-color: var(--success-color);
        color: white;
      }
      
      &.status-pending {
        background-color: var(--warning-color);
        color: white;
      }
      
      &.status-adopted {
        background-color: var(--info-color);
        color: white;
      }
    }
    
    .favorite-btn {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: white;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--gray-color);
      transition: all var(--transition-fast);
      
      &:hover {
        color: var(--error-color);
        transform: scale(1.1);
      }
      
      i {
        font-size: 1.1rem;
      }
    }
  }
  
  .animal-info {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .animal-header {
      margin-bottom: 1rem;
      
      h3 {
        margin-bottom: 0.25rem;
        color: var(--dark-color);
        font-size: 1.25rem;
      }
      
      .animal-breed {
        color: var(--gray-color);
        font-size: 0.9rem;
        margin-bottom: 0;
      }
    }
    
    .animal-details {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      
      .detail {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--gray-color);
        font-size: 0.9rem;
        
        i {
          color: var(--primary-color);
          font-size: 0.9rem;
        }
      }
    }
    
    .animal-description {
      margin-bottom: 1rem;
      flex: 1;
      
      p {
        color: var(--gray-color);
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 0;
      }
    }
    
    .animal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--gray-light);
      
      .price-section {
        .price {
          font-weight: 700;
          color: var(--primary-color);
          font-size: 1.1rem;
        }
        
        .free {
          font-weight: 700;
          color: var(--secondary-color);
          font-size: 1.1rem;
        }
      }
      
      .animal-stats {
        display: flex;
        gap: 1rem;
        
        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--gray-color);
          font-size: 0.9rem;
          
          i {
            font-size: 0.9rem;
          }
        }
      }
    }
    
    .animal-actions {
      display: flex;
      gap: 0.75rem;
      
      .btn {
        flex: 1;
        padding: 0.5rem;
        font-size: 0.9rem;
        
        i {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>