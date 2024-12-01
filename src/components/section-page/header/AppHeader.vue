<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BaseBurgerBtn from './BaseBurgerBtn.vue';
import AppNav from '@/components/section-page/nav/AppNav.vue';
const emit = defineEmits(['update:modelValue']);
const searchTerm = ref('');
const onInputChange = () => {
  emit('update:modelValue', searchTerm.value);
};

const burgerOpen = ref(false);
const handleClickBurger = () => {
  burgerOpen.value = !burgerOpen.value;
  document.body.classList.toggle('no-scroll', burgerOpen.value);
};


</script>
<template>
  <div class="wrapper-header">
    <div class="mobile-search">
      <input @input="onInputChange" v-model="searchTerm" placeholder="Поиск по названию картины" id="mobile-search"
        class="mobile-search__input-search" type="text">
      <label for="mobile-search" class="mobile-search__btn-label">Найти</label>
    </div>

    <div class="wrapper-burger">
      <BaseBurgerBtn @click="handleClickBurger" :burgerOpen />
    </div>
    <div :class="{ 'mobile--hidden': !burgerOpen }" class="header-content mobile-menu ">

      <nav class="header-content__nav mobile-menu__nav">
       <AppNav class="mobile-header"/>
      </nav>
      <div class="header-content__container-search">
        <input @input="onInputChange" v-model="searchTerm" placeholder="Поиск по названию картины" id="search"
          class="header-content__input-search" type="text">
        <label for="search" class="header-content__btn-label">Найти</label>
      </div>
    </div>
  </div>





</template>


<style lang="scss" scoped>
.header-content {
  display: flex;
  justify-content: right;
  gap: 162px;
  padding-top: 24px;
  padding-bottom: 24px;

  @include _1199 {
    gap: 20px;
  }

  &__nav {
    display: flex;
    align-items: center;
  }


  &__container-search {
    display: flex;
    max-width: 416px;
    width: 100%;
    height: 48px;

    @include _1024 {
      display: none;
    }
  }

  &__input-search {

    width: 100%;
    border: none;
    outline: none;
    padding-left: 16px;
    font-size: 20px;
    border: solid;
    padding-bottom: 3px;

    border: 1px solid rgb(225, 225, 225);

    &::placeholder {
      color: rgb(159, 159, 159);
      font-family: Merriweather;
      font-size: 14px;
      font-weight: 400;



    }
  }

  &__btn-label {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 122px;
    width: 100%;

    background-color: rgb(64, 52, 50);
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 700;




    @include hover-and-pointer {
      cursor: pointer;

      &:hover {
        background: rgb(119, 103, 99);
      }
    }
  }
}

.wrapper-header {
  @include _1024 {
    padding-top: 60px;
    margin-bottom: 40px;
  }
}

.wrapper-burger {
  display: none;
  background-color: #000000bc;

  @include _1024 {
    display: block;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 1000;
  }
}

.mobile-menu {
  @include _1024 {
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: $index_mobile_menu;
    flex-direction: column;
    justify-content: initial;
    align-items: flex-end;
    background-color: rgba(48, 49, 50, 0.746);
    width: 100vw;
    padding-top: 124px;
    transition: transform .5s;
  }

  &__nav {
    @include _1024 {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

  }

}


.mobile-search {
  display: none;

  @include _1024 {
    display: flex;
    max-width: 416px;
    width: 100%;
    height: 48px;
   
  }


  @include _330 {
    height: 70px;
    flex-direction: column;
  }

  &__input-search {

    width: 100%;
    border: none;
    outline: none;
    padding-left: 16px;
    font-size: 20px;
    border: solid;
    padding-bottom: 3px;
    border: 1px solid rgb(225, 225, 225);

    @include _430 {
      font-size: 16px;
    }

    @include _330 {
      height: 100%;
    }

    &::placeholder {
      color: rgb(159, 159, 159);
      font-family: Merriweather;
      font-size: 14px;
      font-weight: 400;

      @include _430 {
        font-size: 12px;
      }
    }
  }

  &__btn-label {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 122px;
    width: 100%;
    background-color: rgb(64, 52, 50);
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 700;

    @include hover-and-pointer {
      cursor: pointer;

      &:hover {
        background: rgb(119, 103, 99);
      }
    }

    @include _380 {
      font-size: 12px;
      max-width: 70px;
    }

    @include _330 {
      max-width: 100%;
      height: 100%;
    }
  }
}


.mobile--hidden {
  @include _1024 {
    transform: translateX(200vw);
  }
}
</style>