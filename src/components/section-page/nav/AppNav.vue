<script setup>
</script>
<template>
  <ul class="nav">
    <li class="nav__item">
      <div class="nav__link" to="#">Каталог</div>
    </li>
    <li class="nav__item">
      <div class="nav__link" to="#">Доставка</div>
    </li>
    <li class="nav__item">
      <div class="nav__link" to="#">Оплата</div>
    </li>
    <li class="nav__item">
      <div class="nav__link" to="#">Контакты</div>
    </li>
    <li class="nav__item">
      <div class="nav__link" to="#">О компании</div>
    </li>

  </ul>
</template>


<style lang="scss" scoped>
.nav {
  display: flex;
  gap: 49px;


  &__link {
    color: rgb(52, 48, 48);
    font-family: Merriweather;
    font-size: 14px;
    font-weight: 400;

    @include hover-and-pointer {
      cursor: pointer;
      transition: transform .5s, color .5s;

      &:hover {
        color: #000000;
        transform: scale(1.1);
      }

    }
  }
}

.mobile-header {
  @include _1024 {
    display: flex;
    flex-direction: column;
    padding-right: 40px;
  }

  .nav__link {
    @include _1024 {
      font-size: 30px;
      color: wheat;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5),
        -1px -1px 2px rgba(255, 255, 255, 0.7);

    }
  }
}

.footer-nav {
  .nav__link {
    color: rgb(85, 85, 85);
  }

  @include _639 {
    gap: 20px;
  }

  @include _575 {
    display: none;
  }
}
</style>