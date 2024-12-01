<script setup>

const props = defineProps({
  burgerOpen: {
    type: Boolean,
    required: false,
  },
});

</script>
<template>
  <div
    @click="handleClickBurger"
    class="burger-btn"
    :class="{ 'animation-stop': burgerOpen }"
  >
    <span
      class="burger-btn__line"
      v-for="(_, i) in 3"
      :key="i"
      :class="'burger-btn__line-' + i"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
.burger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 32px;
  height: 32px;
  border: solid 1px rgb(255, 255, 255);
  
  cursor: pointer;
  &__line {
    height: 1px;
    background-color: rgb(255, 255, 255);
    transition: opacity 0.3s, transform 0.3s;
  }
  &__line-0 {
    width: 50%;
    animation: line-width 1s infinite;
  }

  &__line-1 {
    width: 70%;
    opacity: 1;
  }

  &__line-2 {
    width: 50%;
    animation: line-width 1s infinite 0.5s;
  }
}

@keyframes line-width {
  0% {
    width: 50%;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 50%;
  }
}

.animation-stop {
  .burger-btn__line {
    animation: pause;
  }
  .burger-btn__line-0 {
    transform: rotate(45deg) scaleX(2.5) translate(0px, 11px);
  }

  .burger-btn__line-1 {
    opacity: 0;
  }

  .burger-btn__line-2 {
    transform: rotate(-45deg) scaleX(2.5) translate(0px, -11px);
  }
}
</style>
