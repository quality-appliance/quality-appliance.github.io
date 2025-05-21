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
