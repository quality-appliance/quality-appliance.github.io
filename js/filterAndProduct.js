function filterSidebar() {
  return {
    categories: [],
    attributes: {},
    selected: {
      categories: [],
      subcategories: {},
      attributes: {},
    },
    open: {
      categories: [],
      subcategories: {},
    },
    filterSearch: '',
    loading: false,
    error: '',
    debounceTimeout: null,

    // Helper: get category by id
    getCategoryById(id) {
      return this.categories.find(cat => cat.id === id);
    },
    // Helper: get subcategory by id
    getSubcategoryById(catId, subId) {
      const cat = this.getCategoryById(catId);
      if (!cat) return null;
      return cat.subcategories.find(sub => sub.id === subId);
    },

    async init() {
      this.loading = true;
      this.error = '';
      try {
        const res = await fetch('./category-list.json');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        if (!data.categories || !data.attributes) throw new Error('Invalid data structure');
        this.categories = data.categories;
        this.attributes = data.attributes;
        this.open.categories = this.categories.map(cat => cat.id);
        this.open.subcategories = {};
        this.categories.forEach(cat => {
          this.open.subcategories[cat.id] = cat.subcategories.map(sub => sub.id);
        });
        const params = new URLSearchParams(window.location.search);
        const categoryId = params.get('category');
        if (categoryId) {
          const catIds = this.categories.map(cat => cat.id);
          if (catIds.includes(categoryId) && !this.selected.categories.includes(categoryId)) {
            this.selected.categories.push(categoryId);
            // Optionally, open the category accordion
            if (this.open.categories && !this.open.categories.includes(categoryId)) {
              this.open.categories.push(categoryId);
            }
            this.emitChange();
          }
        }
      } catch (e) {
        this.error = e.message || 'Error loading data';
      } finally {
        this.loading = false;
      }
    },
    isCategorySelected(catId) {
      return this.selected.categories.includes(catId);
    },
    isSubcategorySelected(catId, subId) {
      return (this.selected.subcategories[catId] || []).includes(subId);
    },
    isAttributeSelected(catId, subId, key, option) {
      return (
        this.selected.attributes[subId] &&
        this.selected.attributes[subId][key] &&
        this.selected.attributes[subId][key].includes(option)
      );
    },
    isCategoryOpen(catId) {
      return this.open.categories.includes(catId);
    },
    isSubcategoryOpen(catId, subId) {
      return (this.open.subcategories[catId] || []).includes(subId);
    },
    toggleCategory(catId) {
      const idx = this.selected.categories.indexOf(catId);
      if (idx > -1) {
        // Uncheck: remove category, all its subcategories, and related attributes
        this.selected.categories.splice(idx, 1);
        delete this.selected.subcategories[catId];
        // Remove all attributes related to this category's subcategories
        const catObj = this.categories.find(c => c.id === catId);
        if (catObj) {
          catObj.subcategories.forEach(sub => {
            delete this.selected.attributes[sub.id];
          });
        }
      } else {
        this.selected.categories = [catId];
        this.selected.subcategories = {};
        this.selected.attributes = {};
        this.selected.subcategories[catId] = this.selected.subcategories[catId] || [];
      }
      this.selected = JSON.parse(JSON.stringify(this.selected));
      this.emitChange();
    },
    toggleSubcategory(catId, subId) {
      if (!this.selected.categories.includes(catId) || this.selected.categories.length > 1) {
        this.selected.categories = [catId];
        this.selected.subcategories = {};
        this.selected.attributes = {};
      }
      const arr = this.selected.subcategories[catId] = this.selected.subcategories[catId] || [];
      const idx = arr.indexOf(subId);
      if (idx > -1) {
        arr.splice(idx, 1);
        delete this.selected.attributes[subId];
        if (arr.length === 0) {
          delete this.selected.subcategories[catId];
          const catIdx = this.selected.categories.indexOf(catId);
          if (catIdx > -1) {
            this.selected.categories.splice(catIdx, 1);
          }
        }
      } else {
        arr.push(subId);
      }
      this.selected = JSON.parse(JSON.stringify(this.selected));
      this.emitChange();
    },
    toggleAttribute(catId, subId, key, option) {
      if (!this.selected.attributes[subId]) this.selected.attributes[subId] = {};
      if (!this.selected.attributes[subId][key]) this.selected.attributes[subId][key] = [];
      const arr = this.selected.attributes[subId][key];
      const idx = arr.indexOf(option);
      if (idx > -1) {
        arr.splice(idx, 1);
        if (arr.length === 0) delete this.selected.attributes[subId][key];
        if (Object.keys(this.selected.attributes[subId]).length === 0) delete this.selected.attributes[subId];
      } else {
        arr.push(option);
      }
      this.selected = JSON.parse(JSON.stringify(this.selected));
      this.emitChange();
    },
    // Reset all
    resetAll() {
      this.selected = { categories: [], subcategories: {}, attributes: {} };
      this.emitChange();
      if (window.history.replaceState) {
        const { protocol, host, pathname, hash } = window.location;
        const url = `${protocol}//${host}${pathname}${hash}`;
        window.history.replaceState({}, '', url);
      }
    },
    emitChange() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.$dispatch('filters-changed', JSON.parse(JSON.stringify(this.selected)));
      }, 200);
    },
    get filteredCategories() {
      if (!this.filterSearch) return this.categories;
      return this.categories.filter(cat =>
        cat.name.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
        cat.subcategories.some(sub => sub.name.toLowerCase().includes(this.filterSearch.toLowerCase()))
      );
    },
    toggleCategoryOpen(catId) {
      if (this.open.categories.includes(catId)) {
        this.open.categories = this.open.categories.filter(c => c !== catId);
      } else {
        this.open.categories.push(catId);
      }
    },
    toggleSubcategoryOpen(catId, subId) {
      if (!this.open.subcategories[catId]) this.open.subcategories[catId] = [];
      if (this.open.subcategories[catId].includes(subId)) {
        this.open.subcategories[catId] = this.open.subcategories[catId].filter(s => s !== subId);
      } else {
        this.open.subcategories[catId].push(subId);
      }
    },
    removeFilter(type, value) {
      if (type === 'category') {
        this.toggleCategory(value);
      } else if (type === 'subcategory') {
        this.toggleSubcategory(value.catId, value.subId);
      } else if (type === 'attribute') {
        this.toggleAttribute('', value.subId, value.key, value.option);
      }
    }
  };
}

function productList() {
  return {
    products: [
      {
        id: 1,
        name: 'Samsung 1.5HP Split Type AC',
        price: 28999,
        oldPrice: 31999,
        discount: 9,
        description: 'Efficient inverter air conditioner for medium rooms.',
        categoryId: 'ac',
        subcategoryId: 'split',
        attributes: { airConGeneral: 'Inverter' },
        image: 'split-inverter.png',
        rating: 4.5,
        reviewCount: 123,
        isBestSeller: true
      },
      {
        id: 2,
        name: 'Sony 5.1 Channel Home Theater',
        price: 15999,
        oldPrice: null,
        discount: 0,
        description: 'Immersive surround sound system for home entertainment.',
        categoryId: 'av',
        subcategoryId: 'audio',
        attributes: { audioHomeTheater: '5.1 Channels' },
        image: 'home-theater.png',
        rating: 4.7,
        reviewCount: 98,
        isBestSeller: false
      },
      {
        id: 3,
        name: 'LG Twin Tub Washing Machine',
        price: 12999,
        oldPrice: 13999,
        discount: 7,
        description: 'Efficient twin tub washing machine for family use.',
        categoryId: 'appliances',
        subcategoryId: 'wmachine',
        attributes: { washingMachineTypes: 'Twin Tub' },
        image: 'washing-machine.png',
        rating: 4.2,
        reviewCount: 54,
        isBestSeller: false
      },
      {
        id: 4,
        name: 'Samsung Side by Side Refrigerator',
        price: 45999,
        oldPrice: 49999,
        discount: 8,
        description: 'Spacious side by side refrigerator with modern features.',
        categoryId: 'appliances',
        subcategoryId: 'ref',
        attributes: { refrigeratorTypes: 'Side by Side' },
        image: 'refrigerator.png',
        rating: 4.8,
        reviewCount: 201,
        isBestSeller: true
      },
      {
        id: 5,
        name: 'Panasonic Chest Freezer',
        price: 18999,
        oldPrice: null,
        discount: 0,
        description: 'Large capacity chest freezer for bulk storage.',
        categoryId: 'appliances',
        subcategoryId: 'freezer',
        attributes: { freezerTypes: 'Chest Type' },
        image: 'freezer.png',
        rating: 4.1,
        reviewCount: 33,
        isBestSeller: false
      },
      {
        id: 6,
        name: 'Sharp Digital Microwave',
        price: 8999,
        oldPrice: 9999,
        discount: 10,
        description: 'Digital microwave oven with multiple cooking modes.',
        categoryId: 'appliances',
        subcategoryId: 'microwave',
        attributes: { microwaveOvenTypes: 'Digital' },
        image: 'microwave.png',
        rating: 4.3,
        reviewCount: 41,
        isBestSeller: false
      },
      {
        id: 7,
        name: 'Electrolux Cooking Range',
        price: 24999,
        oldPrice: null,
        discount: 0,
        description: 'Professional cooking range for home kitchens.',
        categoryId: 'appliances',
        subcategoryId: 'cooking',
        attributes: { cookingApplianceTypes: 'Cooking Range' },
        image: 'cooking-range.png',
        rating: 4.6,
        reviewCount: 67,
        isBestSeller: false
      },
      {
        id: 8,
        name: 'Khind Industrial Fan',
        price: 3999,
        oldPrice: 4499,
        discount: 11,
        description: 'Powerful industrial fan for large spaces.',
        categoryId: 'sda',
        subcategoryId: 'living',
        attributes: { livingAreaTypes: 'Industrial Fans' },
        image: 'industrial-fan.png',
        rating: 4.0,
        reviewCount: 22,
        isBestSeller: false
      },
      {
        id: 9,
        name: 'Philips Food Processor',
        price: 5999,
        oldPrice: null,
        discount: 0,
        description: 'Versatile food processor for kitchen preparation.',
        categoryId: 'sda',
        subcategoryId: 'kitchen',
        attributes: { kitchenTypes: 'Food Preparation' },
        image: 'food-processor.png',
        rating: 4.4,
        reviewCount: 38,
        isBestSeller: false
      },
      {
        id: 10,
        name: 'Queen Size Bed',
        price: 15999,
        oldPrice: 17999,
        discount: 11,
        description: 'Space-saving wall-mounted bed with storage.',
        categoryId: 'furniture',
        subcategoryId: 'bed',
        attributes: { furnitureBedTypes: 'Mattress' },
        image: 'bed-mattress.png',
        rating: 4.2,
        reviewCount: 19,
        isBestSeller: false
      },
      {
        id: 11,
        name: 'Sony Blu-ray Player',
        price: 7999,
        oldPrice: null,
        discount: 0,
        description: 'High-quality Blu-ray player with streaming capabilities.',
        categoryId: 'av',
        subcategoryId: 'video',
        attributes: { videoMediaPlayers: 'Blu-ray' },
        image: 'bluray.png',
        rating: 4.5,
        reviewCount: 44,
        isBestSeller: false
      },
      {
        id: 12,
        name: 'JBL Soundbar',
        price: 12999,
        oldPrice: 14999,
        discount: 13,
        description: 'Premium soundbar for enhanced TV audio.',
        categoryId: 'av',
        subcategoryId: 'audio',
        attributes: { audioHomeTheater: 'Soundbar' },
        image: 'soundbar.png',
        rating: 4.6,
        reviewCount: 61,
        isBestSeller: true
      }
    ],
    filteredProducts: [],
    attributes: {},
    async init() {
      this.filteredProducts = this.products;
      // Fetch attributes
      try {
        const res = await fetch('./category-list.json');
        if (res.ok) {
          const data = await res.json();
          this.attributes = data.attributes || {};
        }
      } catch (e) {
        // handle error if needed
      }
    },
    applyFilters(filters) {
      // If no filters, show all
      if (
        (!filters.categories || filters.categories.length === 0) &&
        (!filters.subcategories || Object.values(filters.subcategories).every(arr => arr.length === 0)) &&
        (!filters.attributes || Object.values(filters.attributes).every(arr => arr.length === 0))
      ) {
        this.filteredProducts = this.products;
        return;
      }
      this.filteredProducts = this.products.filter(item => {
        // Category filter
        if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(item.categoryId)) {
          return false;
        }
        // Subcategory filter
        if (
          filters.subcategories &&
          filters.subcategories[item.categoryId] &&
          filters.subcategories[item.categoryId].length > 0 &&
          !filters.subcategories[item.categoryId].includes(item.subcategoryId)
        ) {
          return false;
        }
        // Attribute filter (improved)
        if (filters.attributes) {
          // Only check attributes for the product's subcategory
          const subAttrFilters = filters.attributes[item.subcategoryId];
          if (subAttrFilters) {
            for (const [key, options] of Object.entries(subAttrFilters)) {
              if (
                options.length > 0 &&
                (!item.attributes[key] || !options.includes(item.attributes[key]))
              ) {
                return false;
              }
            }
          }
        }
        return true;
      });
    },
    getCategoryName(catId) {
      const cat = this.categories?.find(c => c.id === catId);
      return cat ? cat.name : catId;
    },
    getSubcategoryName(catId, subId) {
      const cat = this.categories?.find(c => c.id === catId);
      if (!cat) return subId;
      const sub = cat.subcategories?.find(s => s.id === subId);
      return sub ? sub.name : subId;
    },
    getStarArray(rating) {
      const stars = [];
      let rounded = Math.round(rating * 2) / 2;
      for (let i = 1; i <= 5; i++) {
        if (rounded >= i) {
          stars.push('full');
        } else if (rounded + 0.5 >= i) {
          stars.push('half');
        } else {
          stars.push('empty');
        }
      }
      return stars;
    },
    isDiscount(item) {
      return item.discount > 0 && item.oldPrice > item.price;
    }
  }
} 