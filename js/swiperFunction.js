"use strict";

document.addEventListener('DOMContentLoaded', () => {
// Hero Slider Configuration
const heroSwiper = new Swiper('.swiper-hero', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
    el: '.swiper-pagination-hero',
    clickable: true,
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    scrollbar: {
    el: '.swiper-scrollbar-hero',
    },
    autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    },
});

// Promo Slider Configuration
const promoSwiper = new Swiper('.swiper-promo', {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 20,
    pagination: {
    el: '.swiper-pagination-promo',
    clickable: true,
    },
    navigation: {
    nextEl: '.swiper-button-next-promo',
    prevEl: '.swiper-button-prev-promo',
    },
    scrollbar: {
    el: '.swiper-scrollbar-promo',
    },
});

// Brands Slider Configuration
const brandsSwiper = new Swiper('.swiper-brands', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    autoplay: {
    delay: 1000,
    disableOnInteraction: false,
    },
    pagination: {
    el: '.swiper-pagination-brands',
    clickable: true,
    },
    navigation: {
    nextEl: '.swiper-button-next-brands',
    prevEl: '.swiper-button-prev-brands',
    },
    breakpoints: {
    640: {
        slidesPerView: 3,
    },
    768: {
        slidesPerView: 4,
    },
    1024: {
        slidesPerView: 6,
    },
    },
});
});