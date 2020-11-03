<template>
  <div class='triangle'>
      <ul>
        <li v-for="(item, index) in allList" v-bind:key="index" :class="{'textLeft': index %2 !== 1, 'textRight': index %2 === 1} "> 
            <img v-show="index %2 !== 1" src="https://s.xinc818.com/files/kh1lqi1obite1u.jpg" alt="">
            <span>{{item}}</span>
            <img v-show="index %2 === 1" src="https://s.xinc818.com/files/kh1lqiet1efrzu.jpg" alt="">
        </li>
        <!-- <li class="textRight">
            <span>在的呢！</span>
            <img src="https://s.xinc818.com/files/kh1lqiet1efrzu.jpg" alt="">
        </li> -->
      </ul>
      <div class="enter">
          <van-field
            v-model="sms"
            center
            clearable
            style="font-size: 14px;"
            label=""
            placeholder=""
          >
            <template #button>
              <van-button @click="hahaha" size="large" style="width: 60px; font-size:12px" type="primary" block>发送</van-button>
            </template>
          </van-field>
      </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
  data () {
    return {
      sms: '',
      step: 0, 
      allList: [
      ]
    }
  },
  watch: {
      step(v) {
        if (v === 2) {
          setTimeout(() => {
            ImagePreview(['https://s.xinc818.com/files/kh1q3wqlx2a97o.jpg']);
          }, 2500)
        }
      }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.allList.push('回答我几个问题，才可以拿到密码哦 😊, 请问你收到礼物开心吗，回答开心或者不开心')
      }, 1500)
    })
  },
  methods: {
    hahaha() {
      if (this.step === 0) {
        if (this.sms === '开心') {
          this.step += 1;
          this.allList.push(this.sms)
          this.allList.push('好，那回答第二个问题， 会永远记得我的好吗，回答会或者不会')
          this.sms = '';
        } else {
          this.$toast('再想想');
        }
      }

       if (this.step === 1) {
        if (this.sms === '会') {
          this.step += 1;
          this.allList.push(this.sms)
          this.allList.push('好，希望你不要食言，即将弹出密码')
          this.sms = '';
        } else {
          this.$toast('在想想');
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
      .enter {
        position: fixed;
        bottom: 100px;
        width: 100%;
      }
        .triangle{
            background-color: #ebebe9;
            height: 100vh;
        }

        .triangle ul{
            padding: 10px;
        }

        .triangle li{
            padding: 5px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }

        .triangle li img {
           width: 60px; height: 60px;
        }

         .triangle .textLeft img {
           margin-right: 20px;
         }

          .triangle .textRight img {
           margin-left: 20px;
         }

        .triangle .textLeft {
          justify-content: flex-start
        }

         .triangle .textRight {
          justify-content: flex-end
        }

        .triangle li span{
            position: relative;
            border-radius: 7px;
            background-color: #a6e860;
            padding: 16px 20px 18px 20px;
            z-index: 1;
        }

        .triangle .textLeft span{
            background-color: white;
        }
      
        .triangle li.textLeft span:before{
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-right: 8px solid white;
            position: absolute;
            top: 20px;
            left: -14px;
        }
       
        .triangle li.textRight span:after{
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-left: 8px solid #a6e860;
            position: absolute;
            top: 20px;
            right: -14px;
        }

        li{
            list-style: none;
        }
        .textRight{
            text-align: right;
        }
</style>

