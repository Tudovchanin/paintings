<script setup>
import { reactive, ref, watch, onBeforeMount, onMounted } from 'vue';
import AppHeader from './components/section-page/header/AppHeader.vue';
import AppFooter from './components/section-page/footer/AppFooter.vue';
import PopUpImg from '@/components/pop-ups/PopUpImg.vue';
import CardProduct from '@/components/cards/CardProduct.vue';
import getCards from '@/services/getCards.js'

const basePath = process.env.VUE_APP_BASE_URL;
const numberPage = ref(1);
let url = `${basePath}db/data_${numberPage.value}.json`

let dataCards = null;
const cards = reactive({});
const cardTitle = ref('');
const loadArray = reactive(Array(Object.keys(cards).length).fill(false));


const handleClickCardBtn = (id, index) => {
  cards[id].inCart = !cards[id].inCart
  window.localStorage.setItem(id, JSON.stringify(cards[id].inCart));

  if (!cards[id].inCart) return
  loadArray[index] = !loadArray[index]

  setTimeout(() => {
    loadArray[index] = false
  }, 2000);
};


const initCards = (dataCards) => {
  for (const key in dataCards) {
    const inCart = JSON.parse(window.localStorage.getItem(key));
    cards[key] = { ...dataCards[key] };
    cards[key].inCart = inCart || false;
  }
};
const searchCard = (searchValue, dataCards) => {

  deleteCards(cards);

  Object.keys(dataCards).forEach(key => {

    if (searchValue.toLowerCase() === dataCards[key].title.toLowerCase()) {

      const inCart = JSON.parse(window.localStorage.getItem(key));
      cards[key] = { ...dataCards[key] };
      cards[key].inCart = inCart || false;
    }
  });

};
const deleteCards = (cards) => {

  Object.keys(cards).forEach(key => {
    delete cards[key]
  });
};


const handleSearch = () => {

  if (cardTitle.value === '') {
    initCards(dataCards);
    return;
  }

  searchCard(cardTitle.value, dataCards)
}

const clickPagination = (index) => {

  numberPage.value = index + 1;
};



const popUpShow = ref(false);
const cardIdPopUp = ref(null);

const handleClickCardImg = (id, index) => {
  console.log('pop-up', 'card-', id);
  cardIdPopUp.value = id;
  popUpShow.value = true;
  document.body.classList.toggle('no-scroll', popUpShow.value);
};

const handleClosePopUp = () => {
  popUpShow.value = false;
  document.body.classList.remove('no-scroll');
}


watch(numberPage, async (newValue) => {

  url = `${basePath}db/data_${newValue}.json`
  deleteCards(cards);
  dataCards = await getCards(url);
  initCards(dataCards);

});

onBeforeMount(async () => {
  dataCards = await getCards(url);
  initCards(dataCards);
});

</script>
<template>
  <div class="wrapper-page">
    <header class="header">
      <div class="width-page y-center">
        <AppHeader v-model="cardTitle" @update:modelValue="handleSearch" />
      </div>

    </header>
    <main class="main">
      <h1 class="main-title width-page y-center">Картины эпохи Возрождения</h1>
      <div class="container-cards width-page y-center">
        <div data-aos="fade-right" :data-aos-delay="100 * index" class="wrapper-card"
          v-for="(card, key, index) in cards" :key="card.id">
          <CardProduct v-bind="card" :load="loadArray[index]" @handle-cart="(id) => handleClickCardBtn(id, index)"
            @handle-pop-up="(id) => handleClickCardImg(id, index)" />
        </div>
      </div>
      <div class="page-cards">
        <button @click="clickPagination(index)" :class="{ 'page-cards__btn--active': numberPage === value }"
          class="page-cards__btn" v-for="(value, index) in 2" :key="index">
          {{ value }}
        </button>
      </div>

      <div data-aos="zoom-in" v-if="popUpShow" @click.self="handleClosePopUp" class="wrapper-pop-up">
        <PopUpImg v-bind="cards[cardIdPopUp]" />
        <button @click="handleClosePopUp" class="wrapper-pop-up__close">
          <img :src="basePath + '/images/close.png'" alt="закрыть pop up" />
        </button>
      </div>
    </main>
    <footer class="footer">
      <div class="footer__content">
        <AppFooter class="footer-nav" />
        <div class="footer__contact">
          <a class="footer__tel" href="tel:+78125555555">+7 (812) 555-55-55</a>
          <p class="footer__address">г. Санкт-Петербург, ул. Ефимова, 3</p>
        </div>
      </div>

    </footer>
  </div>

</template>


<style lang="scss">
.wrapper-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  border-bottom: 1px solid rgb(225, 225, 225);
  margin-bottom: 45px;
}

.main {
  flex-grow: 1;
}

.footer {
  display: flex;
  justify-content: center;
  padding-top: 38px;
  padding-bottom: 40px;
  background-color: rgb(236, 234, 234);

  &__content {
    display: flex;
    justify-content: flex-end;
    gap: 148px;
    max-width: 1350px;
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;

    @include _1400 {
      gap: 60px;
      justify-content: space-between;
    }

    @include _1199 {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

  }

  &__contact {
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
    padding-left: 20px;
    padding-right: 20px;

    @include _639 {
      gap: 40px;
    }


    @include _380 {
      gap: 20px;
    }
  }

  &__address,
  &__tel {
    position: relative;
    color: rgb(85, 85, 85);
    font-size: 14px;
    font-weight: 400;

    @include _380 {
      font-size: 12px;
    }
    &::before {
      content: '';
      position: absolute;
      left: -20px;
      width: 16px;
      height: 16px;
      background-color: red;

    }

    &::before {
      background: url('@/assets/images/tel.svg') no-repeat center;
    }
  }

  &__address {
    &::before {
      background: url('@/assets/images/address.svg') no-repeat center;
      left: -23px;
    }
  }

}

.width-page {
  max-width: 1256px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.y-center {
  margin-left: auto;
  margin-right: auto;
}

.search {
  height: 50px;
  width: 100%;
  font-size: 40px;
}

.main-title {
  color: rgb(52, 48, 48);
  font-size: 24px;
  margin-bottom: 39px;
}

.container-cards {

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;

  @include _1230 {
    max-width: 800px;
  }
}

.wrapper-card {
  max-width: 280px;
  width: 100%;
  border: 1px solid rgb(225, 225, 225);
}

.page-cards {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  &__btn {
    flex-basis: 50%;
    padding: 10px;
    font-size: 20px;
    font-weight: 700;
    transition: transform .5s, background-color .5s, color 1s;

    @include hover-and-pointer {
      cursor: pointer;

      &:hover {
        transform: scale(.95);
        background-color: rgb(0, 0, 0);
        color: #f5deb3;
      }
    }

    &:active {
      transform: scale(.9);
    }

    &--active {
      background: linear-gradient(to right, rgb(56, 46, 43), rgba(46, 36, 32, 0.63));
      box-shadow: 0 0 20px rgba(91, 86, 112, 0.7),
        0 0 30px rgb(193, 180, 177);
      ;
      pointer-events: none;
      color: #f5deb3;
    }
  }
}

.wrapper-pop-up {
  display: grid;
  justify-items: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: $index_pop_up;
  background-color: rgba(0, 0, 0, 0.401);



  &__close {
    position: absolute;
    top: 2%;
    right: 5%;
    width: 60px;
    height: 60px;
    background-color: #ffffff4f;
    cursor: pointer;

    @include hover-and-pointer {
      &:hover {
        transition: transform .5s;
        transform: scale(1.2);
      }

    }
  }
}
</style>