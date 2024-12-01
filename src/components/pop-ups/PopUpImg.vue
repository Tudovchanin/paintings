<script setup>
import Slider from '@/utils/slider28.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const props = defineProps({
  id: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  info: {
    type: String,
    required: true
  },

  oldPrice: {
    type: String,
    default: null
  },

  price: {
    type: String,
    default: null
  },

  img: {
    type: Array,
    required: true
  },

  inCart: {
    type: Boolean,
    default: false
  },

  load: {
    type: Boolean,
    default: false
  }
});



const media = {
  1: window.matchMedia('(min-width: 1px)'),
};

const containerSlider = ref(null);
const slider = ref(null);
const item = ref(null);
const allIconsCount = ref(null);
const totalStep = ref(null);
const stepSlide = ref(null);
const btnNext = ref(null);
const btnPrev = ref(null);



let sliderObj = null;


onMounted(() => {

  const $sliderAllElem = {
    containerSlider: containerSlider.value,
    slider: slider.value,
    btnNext: btnNext.value,
    btnPrev: btnPrev.value,
    itemLength: props.img.length,
    item: item.value[0],
  };

  sliderObj = new Slider(media);
  sliderObj.initSlider($sliderAllElem); //инициализация слайдера
  sliderObj.initDragDrop('desktop'); //инициализация drag'n drop , если для desktop ненужно, то вызываем метод без аргумента
  sliderObj.initCount(totalStep.value, stepSlide.value)
  sliderObj.initIconCount(allIconsCount.value, 'icon-active');

  sliderObj.handleDOMLoaded();
});


onBeforeUnmount(() => {

  sliderObj.removeAllListener();
});

const basePath = process.env.VUE_APP_BASE_URL || '/';
const getImagePath = (nameFolder, imgName, format) => {
  const path = `${basePath}images/cards/${nameFolder}/${imgName}.${format}`

  return path;
};
</script>
<template>
  <div class="pop-up">
    <div class="pop-up__img">
      <div class="slider" ref="slider">
        <div ref="item" class="item" v-for="(name, index) in img" :key="name">
          <div class="content">
            <img :src="getImagePath(`card_${id}`, name, 'jpg')" alt="картина">

          </div>
        </div>
      </div>
    </div>
    <div class="step-icons">
      <button ref="allIconsCount" v-for="(name, index) in img" :key="name" :class="{ 'icon-active': index === 0 }"
        class="step-icons__icon"></button>
    </div>
    <div class="pop-up__info">
      <div class="pop-up__container-btn">
        <button ref="btnPrev" class="pop-up__btn"><img :src="basePath +'/images/arrow.png'" alt="назад"></button>
        <button ref="btnNext" class="pop-up__btn"><img :src="basePath +'/images/arrow.png'" alt="вперед"></button>
      </div>
      <div class="pop-up__container-step">
        <div ref="stepSlide" class="pop-up__step-slide">1</div>
        <div>/</div>
        <div ref="totalStep" class="pop-up__total-steps"></div>
      </div>

      <div class="pop-up__info-title">{{ title }}</div>
      <div class="pop-up__info-author">{{ author }}</div>
      <div>{{ info }}</div>
    </div>


  </div>
</template>


<style lang="scss" scoped>
.pop-up {
  max-width: 400px;
  height: 100%;
  overflow-y: auto;

  &__img {
    height: 400px;
    overflow: hidden;
    @include _767 {
      height: 200px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 20px;
    text-align: center;
    background-color: white;
    min-height: 300px;
  }

  &__info-title {
    font-size: 20px;
    font-weight: 700;
  }

  &__info-author {
    font-size: 18px;
  }

  &__container-step {
    display: flex;
    justify-content: center;
    font-size: 20px;
  }

  &__container-btn {

    display: flex;
    justify-content: center;
    gap: 80px;
  }

  &__btn {
    background-color: transparent;
    cursor: pointer;

    @include hover-and-pointer {
      transition: transform .5s;

      &:hover {
        transform: scale(1.1);
      }
    }

    &:active {
      transform: scale(.9);
    }

    &:nth-child(1) {

      transform: rotate(-180deg);

      @include hover-and-pointer {
        transition: transform .5s;

        &:hover {
          transform: rotate(-180deg) scale(1.1);
        }
      }

      &:active {
        transform: rotate(-180deg) scale(.9);
      }

    }

    &:disabled {
      opacity: .5;
      pointer-events: none;
    }
  }
}


/*-------------------------------------------*/
/* обязательные селекторы слайдера */

/*обязательные св-ва */
.container-slider {
  overflow: hidden;
  height: 100%;
}

/* обязательные св-ва. Анимацию можем поменять */
.slider {
  display: flex;
  height: 100%;
  transform: translateX(0px);
  touch-action: none;
  transition: transform 0.4s linear;
}

/* обязательные св-ва */
.item {
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  height: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}


.content {
  width: 100%;
  height: 100%;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}


.step-icons {
  padding: 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #000000;

  &__icon {
    width: 9px;
    height: 3px;
    background-color: #ffffff;
    border-radius: 32px;
    transition: transform .5s;
    box-shadow: 0 0 10px rgb(245, 246, 248), 0 0 20px rgba(225, 247, 243, 0.8);
  }
}

.icon-active {
  transform: scale(3);
  background-color: rgb(114, 120, 139);
  box-shadow: 0 0 10px rgb(145, 175, 240), 0 0 20px rgba(145, 240, 224, 0.8);
}
</style>