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

    // Fetch categories/attributes
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
        // --- Open all filters by default, but do not check any ---
        this.open.categories = this.categories.map(cat => cat.name);
        this.open.subcategories = {};
        this.categories.forEach(cat => {
          this.open.subcategories[cat.name] = cat.subcategories.map(sub => sub.name);
        });
        // --- End open all filters ---
        // --- Auto-select main category from query string ---
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        if (category) {
          // Only add if not already selected and if it matches a real category
          const catNames = this.categories.map(cat => cat.name);
          if (catNames.includes(category) && !this.selected.categories.includes(category)) {
            this.selected.categories.push(category);
            // Optionally, open the category accordion
            if (this.open.categories && !this.open.categories.includes(category)) {
              this.open.categories.push(category);
            }
            // Emit change so product list updates
            this.emitChange();
          }
        }
        // --- End auto-select main category ---
      } catch (e) {
        this.error = e.message || 'Error loading data';
      } finally {
        this.loading = false;
      }
    },
    // Helpers for selection
    isCategorySelected(cat) {
      return this.selected.categories.includes(cat);
    },
    isSubcategorySelected(cat, sub) {
      return (this.selected.subcategories[cat] || []).includes(sub);
    },
    isAttributeSelected(cat, sub, key, option) {
      return (
        this.selected.attributes[sub] &&
        this.selected.attributes[sub][key] &&
        this.selected.attributes[sub][key].includes(option)
      );
    },
    // Helpers for open state
    isCategoryOpen(cat) {
      return this.open.categories.includes(cat);
    },
    isSubcategoryOpen(cat, sub) {
      return (this.open.subcategories[cat] || []).includes(sub);
    },
    // Toggle logic
    toggleCategory(cat) {
      const idx = this.selected.categories.indexOf(cat);
      if (idx > -1) {
        // Uncheck: remove category, all its subcategories, and related attributes
        this.selected.categories.splice(idx, 1);
        delete this.selected.subcategories[cat];
        // Remove all attributes related to this category's subcategories
        const catObj = this.categories.find(c => c.name === cat);
        if (catObj) {
          catObj.subcategories.forEach(sub => {
            delete this.selected.attributes[sub.name];
          });
        }
      } else {
        // Check: only allow one category at a time
        this.selected.categories = [cat];
        // Remove all subcategories and attributes except for the selected category
        this.selected.subcategories = {};
        this.selected.attributes = {};
        this.selected.subcategories[cat] = this.selected.subcategories[cat] || [];
      }
      this.selected = JSON.parse(JSON.stringify(this.selected));
      this.emitChange();
    },
    toggleSubcategory(cat, sub) {
      // If another category is selected, clear all selections and only select this one
      if (!this.selected.categories.includes(cat) || this.selected.categories.length > 1) {
        this.selected.categories = [cat];
        this.selected.subcategories = {};
        this.selected.attributes = {};
      }
      const arr = this.selected.subcategories[cat] = this.selected.subcategories[cat] || [];
      const idx = arr.indexOf(sub);
      if (idx > -1) {
        // Uncheck subcategory
        arr.splice(idx, 1);
        // Remove attributes for this subcategory
        delete this.selected.attributes[sub];
        // If no subcategories are checked, uncheck the parent category
        if (arr.length === 0) {
          delete this.selected.subcategories[cat];
          const catIdx = this.selected.categories.indexOf(cat);
          if (catIdx > -1) {
            this.selected.categories.splice(catIdx, 1);
          }
        }
      } else {
        // Check subcategory
        arr.push(sub);
        // Also check the parent category if not already checked (handled above)
      }
      this.selected = JSON.parse(JSON.stringify(this.selected));
      this.emitChange();
    },
    toggleAttribute(cat, sub, key, option) {
      // Ensure structure exists
      if (!this.selected.attributes[sub]) this.selected.attributes[sub] = {};
      if (!this.selected.attributes[sub][key]) this.selected.attributes[sub][key] = [];
      const arr = this.selected.attributes[sub][key];
      const idx = arr.indexOf(option);
      if (idx > -1) {
        arr.splice(idx, 1);
        if (arr.length === 0) delete this.selected.attributes[sub][key];
        if (Object.keys(this.selected.attributes[sub]).length === 0) delete this.selected.attributes[sub];
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
      // Remove query string from URL (preserve hash if present)
      if (window.history.replaceState) {
        const { protocol, host, pathname, hash } = window.location;
        const url = `${protocol}//${host}${pathname}${hash}`;
        window.history.replaceState({}, '', url);
      }
    },
    // Debounced event emit
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
    toggleCategoryOpen(cat) {
      if (this.open.categories.includes(cat)) {
        this.open.categories = this.open.categories.filter(c => c !== cat);
      } else {
        this.open.categories.push(cat);
      }
    },
    toggleSubcategoryOpen(cat, sub) {
      if (!this.open.subcategories[cat]) this.open.subcategories[cat] = [];
      if (this.open.subcategories[cat].includes(sub)) {
        this.open.subcategories[cat] = this.open.subcategories[cat].filter(s => s !== sub);
      } else {
        this.open.subcategories[cat].push(sub);
      }
    },
    // Remove filter chip
    removeFilter(type, value) {
      if (type === 'category') {
        this.toggleCategory(value);
      } else if (type === 'subcategory') {
        this.toggleSubcategory(value.cat, value.sub);
      } else if (type === 'attribute') {
        this.toggleAttribute('', value.sub, value.key, value.option);
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
        description: 'Efficient inverter air conditioner for medium rooms.',
        category: 'Air Conditioning',
        subcategory: 'Split Type Aircon',
        attributes: { 'airConGeneral': 'Inverter' },
        image: './images/product/split-inverter.png'
      },
      {
        id: 2,
        name: 'Sony 5.1 Channel Home Theater',
        price: 15999,
        description: 'Immersive surround sound system for home entertainment.',
        category: 'Audio/Video Equipment',
        subcategory: 'Audio',
        attributes: { 'audioHomeTheater': '5.1 Channels' },
        image: './images/product/home-theater.png'
      },
      {
        id: 3,
        name: 'LG Twin Tub Washing Machine',
        price: 12999,
        description: 'Efficient twin tub washing machine for family use.',
        category: 'Home Appliances',
        subcategory: 'Washing Machine',
        attributes: { 'washingMachineTypes': 'Twin Tub' },
        image: './images/product/washing-machine.png'
      },
      {
        id: 4,
        name: 'Samsung Side by Side Refrigerator',
        price: 45999,
        description: 'Spacious side by side refrigerator with modern features.',
        category: 'Home Appliances',
        subcategory: 'Refrigerators',
        attributes: { 'refrigeratorTypes': 'Side by Side' },
        image: './images/product/refrigerator.png'
      },
      {
        id: 5,
        name: 'Panasonic Chest Freezer',
        price: 18999,
        description: 'Large capacity chest freezer for bulk storage.',
        category: 'Home Appliances',
        subcategory: 'Freezers',
        attributes: { 'freezerTypes': 'Chest Type' },
        image: './images/product/freezer.png'
      },
      {
        id: 6,
        name: 'Sharp Digital Microwave',
        price: 8999,
        description: 'Digital microwave oven with multiple cooking modes.',
        category: 'Home Appliances',
        subcategory: 'Microwave Ovens',
        attributes: { 'microwaveOvenTypes': 'Digital' },
        image: './images/product/microwave.png'
      },
      {
        id: 7,
        name: 'Electrolux Cooking Range',
        price: 24999,
        description: 'Professional cooking range for home kitchens.',
        category: 'Home Appliances',
        subcategory: 'Cooking Appliances',
        attributes: { 'cookingApplianceTypes': 'Cooking Range' },
        image: './images/product/cooking-range.png'
      },
      {
        id: 8,
        name: 'Khind Industrial Fan',
        price: 3999,
        description: 'Powerful industrial fan for large spaces.',
        category: 'Small Domestic Appliances',
        subcategory: 'Living Area',
        attributes: { 'livingAreaTypes': 'Industrial Fans' },
        image: './images/product/industrial-fan.png'
      },
      {
        id: 9,
        name: 'Philips Food Processor',
        price: 5999,
        description: 'Versatile food processor for kitchen preparation.',
        category: 'Small Domestic Appliances',
        subcategory: 'Kitchen',
        attributes: { 'kitchenTypes': 'Food Preparation' },
        image: './images/product/food-processor.png'
      },
      {
        id: 10,
        name: 'Queen Size Bed',
        price: 15999,
        description: 'Space-saving wall-mounted bed with storage.',
        category: 'Furniture',
        subcategory: 'Bed',
        attributes: { 'furnitureBedTypes': 'Mattress' },
        image: './images/product/bed-mattress.png'
      },
      {
        id: 11,
        name: 'Sony Blu-ray Player',
        price: 7999,
        description: 'High-quality Blu-ray player with streaming capabilities.',
        category: 'Audio/Video Equipment',
        subcategory: 'Video',
        attributes: { 'videoMediaPlayers': 'Blu-ray' },
        image: './images/product/bluray.png'
      },
      {
        id: 12,
        name: 'JBL Soundbar',
        price: 12999,
        description: 'Premium soundbar for enhanced TV audio.',
        category: 'Audio/Video Equipment',
        subcategory: 'Audio',
        attributes: { 'audioHomeTheater': 'Soundbar' },
        image: './images/product/soundbar.png'
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
        if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(item.category)) {
          return false;
        }
        // Subcategory filter
        if (
          filters.subcategories &&
          filters.subcategories[item.category] &&
          filters.subcategories[item.category].length > 0 &&
          !filters.subcategories[item.category].includes(item.subcategory)
        ) {
          return false;
        }
        // Attribute filter
        if (filters.attributes) {
          // For each subcategory in filters.attributes
          for (const [sub, keys] of Object.entries(filters.attributes)) {
            for (const [key, options] of Object.entries(keys)) {
              if (
                options.length > 0 &&
                (item.subcategory === sub) &&
                (!item.attributes[key] || !options.includes(item.attributes[key]))
              ) {
                return false;
              }
            }
          }
        }
        return true;
      });
    }
  }
} 