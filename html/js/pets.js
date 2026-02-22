// دوال صفحة الحيوانات

let currentPets = [];

// عرض الحيوانات
function displayPets() {
    const petsGrid = document.getElementById('petsGrid');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    
    loading.style.display = 'block';
    petsGrid.style.display = 'none';
    emptyState.style.display = 'none';
    
    // محاكاة تحميل البيانات
    setTimeout(() => {
        currentPets = getPets();
        
        loading.style.display = 'none';
        
        if (currentPets.length > 0) {
            petsGrid.style.display = 'grid';
            petsGrid.innerHTML = currentPets.map(pet => createPetCard(pet)).join('');
        } else {
            emptyState.style.display = 'block';
        }
    }, 500);
}

// فلترة الحيوانات
function filterPets() {
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const breedFilter = document.getElementById('breedFilter')?.value || '';
    const ageFilter = document.getElementById('ageFilter')?.value || '';
    
    const allPets = getPets();
    
    const filteredPets = allPets.filter(pet => {
        // فلترة حسب البحث
        if (searchQuery && !pet.name.toLowerCase().includes(searchQuery) && 
            !pet.breed.toLowerCase().includes(searchQuery)) {
            return false;
        }
        
        // فلترة حسب النوع
        if (typeFilter && pet.type !== typeFilter) {
            return false;
        }
        
        // فلترة حسب السلالة
        if (breedFilter && pet.breed !== breedFilter) {
            return false;
        }
        
        // فلترة حسب العمر (محاكاة بسيطة)
        if (ageFilter) {
            if (ageFilter === 'صغير' && pet.age.includes('شهر')) return true;
            if (ageFilter === 'بالغ' && (pet.age.includes('سنة') || pet.age.includes('سنتين'))) return true;
            if (ageFilter === 'كبير' && pet.age.includes('سنوات')) return true;
            return false;
        }
        
        return true;
    });
    
    const petsGrid = document.getElementById('petsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredPets.length > 0) {
        petsGrid.style.display = 'grid';
        emptyState.style.display = 'none';
        petsGrid.innerHTML = filteredPets.map(pet => createPetCard(pet)).join('');
    } else {
        petsGrid.style.display = 'none';
        emptyState.style.display = 'block';
    }
}