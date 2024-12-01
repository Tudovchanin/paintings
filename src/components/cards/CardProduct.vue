<script setup>

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
  },

  sold: {
    type: Boolean,
    default: false
  }
});

const basePath = process.env.VUE_APP_BASE_URL;
const getImagePath = (nameFolder, imgName, format) => {
  const path = `${basePath}images/cards/${nameFolder}/${imgName}.${format}`

  return path;
};

const emit = defineEmits(['handle-cart', 'handle-pop-up']);

const handleClickBtn = (id) => {
  emit('handle-cart', id)
}

const handleClickImg = (id) => {
  emit('handle-pop-up', id)
}



</script>
<template>
  <article :class="{ 'card--sold': sold }" class="card">
    <figure>
      <div class="card__container-img" @click.stop="handleClickImg(id)">
        <img tabindex="0" :src="getImagePath(`card_${id}`, img[0], 'jpg')" alt="картина">
      </div>
      <figcaption class="card__info">
        <div tabindex="0" class="card__title">«{{ title }}»</div>
        <div tabindex="0" class="card__author">{{ author }}</div>
      </figcaption>
    </figure>

    <div v-if="!sold" class="card__footer">

      <div class="card__prices">
        <del v-if="oldPrice" tabindex="0" class="card__old-price" aria-label="старая цена">{{ oldPrice }} $</del>
        <div v-if="price" tabindex="0" class="card__price" aria-label="цена">{{ price }} $</div>
      </div>
      <div class="card__container-btn">
        <button @click.stop="handleClickBtn(id)" :disabled="load" :class="{ 'card__btn--in-cart': inCart }"
          class="card__btn">
          <div v-if="!inCart">Купить</div>
          <div class="card__load" v-else-if="load">
            <span class="card__load-icon">
              <img :src="basePath + '/images/load-icon.png'" alt="иконка загрузки">
            </span>
            <span>загрузка</span>
          </div>
          <div class="card__check" v-else>
            <span class="card__check-icon">
              <img :src="basePath + '/images/check-icon.svg'" alt="иконка куплено">
            </span>
            <span>В корзине</span>
          </div>

        </button>
      </div>
    </div>
    <div class="card__footer" v-else>
      <p class="card__text-sold">Продана на аукционе</p>

    </div>
  </article>

</template>


<style lang="scss" scoped>
.card {

  &--sold {
    opacity: .5;
    pointer-events: none;
  }

  &__container-img {
    height: 159px;

    & img {
      object-fit: cover;
    }


    @include hover-and-pointer {
      cursor: pointer;
      transition: transform .5s;

      &:hover {
        transform: scale(1.05);
      }
    }

  }

  &__info {
    padding-top: 22px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 23px;

    @include _330 {
      padding-top: 11px;
      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 12px;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 22px;

    @include _330 {
      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 11px;
    }
  }

  &__title {
    padding-bottom: 5px;
    font-weight: 400;
    font-size: 18px;
  }

  &__author {
    font-size: 18px;
  }

  &__prices {
    display: grid;
    align-items: center;
  }

  &__old-price {
    color: rgb(160, 160, 160);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.5;

  }

  &__price {
    color: rgb(52, 48, 48);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0;

  }

  &__container-btn {
    background-color: aquamarine;
    max-width: 118px;
    width: 100%;
    height: 48px;
  }

  &__btn {
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgb(56, 46, 43);
    font-weight: 700;

    font-size: 14px;
    color: rgb(244, 246, 249);

    @include hover-and-pointer {
      cursor: pointer;

      &:hover {
        background: rgb(119, 103, 99);
      }
    }

    &:disabled {
      background-color: rgb(193, 180, 177);
    }

    &--in-cart {
      background-color: rgb(91, 58, 50);
    }
  }

  &__load,
  &__check {
    display: flex;
    justify-content: center;
    gap: 2px;
  }

  &__load-icon,
  &__check-icon {
    width: 20px;
    height: 20px;

  }

  &__load-icon {
    animation: spin 1s linear infinite;
  }

  &__text-sold {
    padding-top: 14px;
    color: rgb(52, 48, 48);
    font-weight: 700;
    line-height: 1.5;
  }

}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>