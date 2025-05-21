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
      },
      {
        id: 13,
        name: 'Carrier Single Aircon',
        price: 24999,
        oldPrice: 26999,
        discount: 7,
        description: 'Efficient single air conditioner with wall mounting.',
        categoryId: 'ac',
        subcategoryId: 'single',
        attributes: { airConGeneral: 'Inverter'},
        image: 'single-aircon.png',
        rating: 4.4,
        reviewCount: 35,
        isBestSeller: false
      },
      {
        id: 14,
        name: 'Panasonic Ceiling Mounted Aircon',
        price: 32999,
        oldPrice: 35999,
        discount: 8,
        description: 'Ceiling mounted air conditioner for large rooms.',
        categoryId: 'ac',
        subcategoryId: 'mounting',
        attributes: { airConMountingTypes: 'Ceiling' },
        image: 'ceiling-aircon.png',
        rating: 4.5,
        reviewCount: 27,
        isBestSeller: false
      },
      {
        id: 15,
        name: 'King Size Bed',
        price: 19999,
        oldPrice: 21999,
        discount: 9,
        description: 'Spacious king size bed with sturdy frame.',
        categoryId: 'furniture',
        subcategoryId: 'bed',
        attributes: { furnitureBedTypes: 'Mattress' },
        image: 'bed-king.png',
        rating: 4.3,
        reviewCount: 25,
        isBestSeller: false
      },
      {
        id: 16,
        name: 'Memory Foam Mattress',
        price: 8999,
        oldPrice: 10999,
        discount: 18,
        description: 'Comfortable memory foam mattress for restful sleep.',
        categoryId: 'furniture',
        subcategoryId: 'bed',
        attributes: { furnitureBedTypes: 'Mattress' },
        image: 'mattress-memory-foam.png',
        rating: 4.7,
        reviewCount: 40,
        isBestSeller: true
      },
      {
        id: 17,
        name: 'Wall Mounted Murphy Bed',
        price: 24999,
        oldPrice: 26999,
        discount: 7,
        description: 'Space-saving wall mounted Murphy bed with easy mechanism.',
        categoryId: 'furniture',
        subcategoryId: 'bed',
        attributes: { furnitureBedTypes: 'Wall Mounted' },
        image: 'wall-mounted-murphy-bed.png',
        rating: 4.5,
        reviewCount: 18,
        isBestSeller: false
      },
      {
        id: 18,
        name: 'Single Bed with Mattress',
        price: 7999,
        oldPrice: 8999,
        discount: 11,
        description: 'Compact single bed with included mattress.',
        categoryId: 'furniture',
        subcategoryId: 'bed',
        attributes: { furnitureBedTypes: 'Mattress' },
        image: 'single-bed-mattress.png',
        rating: 4.1,
        reviewCount: 12,
        isBestSeller: false
      },
      {
        id: 19,
        name: 'Foldable Wall Mounted Bed',
        price: 13999,
        oldPrice: 15999,
        discount: 13,
        description: 'Foldable wall mounted bed ideal for small spaces.',
        categoryId: 'furniture',
        subcategoryId: 'bed',
        attributes: { furnitureBedTypes: 'Wall Mounted' },
        image: 'foldable-wall-bed.png',
        rating: 4.4,
        reviewCount: 15,
        isBestSeller: false
      },
      {
        id: 20,
        name: 'Daikin Wall Mounted Inverter AC',
        price: 35999,
        oldPrice: 38999,
        discount: 8,
        description: 'Energy-efficient wall mounted inverter air conditioner for modern homes.',
        categoryId: 'ac',
        subcategoryId: 'mounting',
        attributes: { airConMountingTypes: 'Wall', airConGeneral: 'Inverter' },
        image: 'wall-mounted.png',
        rating: 4.6,
        reviewCount: 28,
        isBestSeller: false
      },
      {
        id: 21,
        name: 'Mitsubishi Cassette Type AC',
        price: 49999,
        oldPrice: 52999,
        discount: 6,
        description: 'Cassette type air conditioner for commercial and large spaces.',
        categoryId: 'ac',
        subcategoryId: 'mounting',
        attributes: { airConMountingTypes: 'Cassette', airConGeneral: 'Non-Inverter' },
        image: 'cassette.png',
        rating: 4.7,
        reviewCount: 19,
        isBestSeller: true
      },
      {
        id: 22,
        name: 'LG Split Type Air Conditioner',
        price: 59999,
        oldPrice: 64999,
        discount: 8,
        description: 'High-efficiency LG split type air conditioner for home and office cooling.',
        categoryId: 'ac',
        subcategoryId: 'split',
        attributes: { airConGeneral: 'Inverter' },
        image: 'split-type.png',
        rating: 4.8,
        reviewCount: 14,
        isBestSeller: true,
      },
      {
        id: 23,
        name: 'Pioneer Karaoke System',
        price: 18999,
        oldPrice: 20999,
        discount: 10,
        description: 'All-in-one karaoke system with wireless microphones and built-in speakers.',
        categoryId: 'av',
        subcategoryId: 'audio',
        attributes: { audioTypes: 'Karaoke', audioComponents: 'Mini' },
        image: 'karaoke.png',
        rating: 4.6,
        reviewCount: 52,
        isBestSeller: false
      },
      {
        id: 24,
        name: 'JBL Bluetooth Speaker',
        price: 4999,
        oldPrice: 5999,
        discount: 17,
        description: 'Portable Bluetooth speaker with deep bass and long battery life.',
        categoryId: 'av',
        subcategoryId: 'audio',
        attributes: { audioTypes: 'Speaker', audioComponents: 'Micro' },
        image: 'speaker.png',
        rating: 4.8,
        reviewCount: 87,
        isBestSeller: true
      },
      {
        id: 25,
        name: 'Sony 4K Ultra HD Smart TV',
        price: 39999,
        oldPrice: 44999,
        discount: 11,
        description: 'Ultra HD Smart TV with vibrant colors and streaming capabilities.',
        categoryId: 'av',
        subcategoryId: 'video',
        attributes: { videoTvTypes: 'Smart', videoMediaPlayers: 'Digital Media' },
        image: 'video-smart.png',
        rating: 4.9,
        reviewCount: 120,
        isBestSeller: true
      },
      {
        id: 26,
        name: 'Philips Air Fryer',
        price: 7999,
        oldPrice: 8999,
        discount: 11,
        description: 'Healthy air fryer for oil-free cooking and crispy results.',
        categoryId: 'sda',
        subcategoryId: 'kitchen',
        attributes: { kitchenTypes: 'Cooking Equipment' },
        image: 'air-fryer.png',
        rating: 4.7,
        reviewCount: 65,
        isBestSeller: true
      },
      {
        id: 27,
        name: 'Oster Blender',
        price: 2999,
        oldPrice: 3499,
        discount: 14,
        description: 'Powerful blender for smoothies, shakes, and food prep.',
        categoryId: 'sda',
        subcategoryId: 'kitchen',
        attributes: { kitchenTypes: 'Food Preparation' },
        image: 'blender.png',
        rating: 4.5,
        reviewCount: 48,
        isBestSeller: false
      },
      {
        id: 28,
        name: 'Imarflex Stand Fan',
        price: 1899,
        oldPrice: 2199,
        discount: 14,
        description: 'Adjustable stand fan for efficient cooling in any room.',
        categoryId: 'sda',
        subcategoryId: 'living',
        attributes: { livingAreaTypes: 'Fans' },
        image: 'stand-fan.png',
        rating: 4.3,
        reviewCount: 34,
        isBestSeller: false
      },
      {
        id: 29,
        name: 'Hanabishi Rice Cooker',
        price: 1599,
        oldPrice: 1799,
        discount: 11,
        description: 'Convenient rice cooker for perfect rice every time.',
        categoryId: 'sda',
        subcategoryId: 'kitchen',
        attributes: { kitchenTypes: 'Cooking Equipment' },
        image: 'rice-cooker.png',
        rating: 4.6,
        reviewCount: 55,
        isBestSeller: true
      },
      {
        id: 31,
        name: 'Panasonic Convection Oven',
        price: 12499,
        oldPrice: 14499,
        discount: 14,
        description: 'Multi-function convection oven with grill, bake, and roast settings for versatile cooking.',
        categoryId: 'appliances',
        subcategoryId: 'cooking',
        attributes: { cookingApplianceTypes: 'Oven' },
        image: 'oven.png',
        rating: 4.6,
        reviewCount: 44,
        isBestSeller: false
      },
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