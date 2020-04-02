<template>
  <nm-container>
    <nm-box page>
      <div class="nm-error-403">
        <div class="nm-error-403-number">
          <div>4</div>
          <div>0</div>
          <div>3</div>
        </div>
        <p class="nm-m-10 nm-size-60">ERROR !</p>
        <p class="nm-m-20">亲！您无权访问该页面哦~</p>
        <p class="nm-text-center"><nm-button type="text" text="《 带您回家" @click="$router.push('/')" /> | <nm-button type="text" text="原路返回 》" class="nm-m-l-0" @click="$router.go(-1)" /></p>
      </div>
    </nm-box>
  </nm-container>
</template>
<style lang="scss">
.nm-error-403 {
  margin: 100px auto;
  width: 600px;
  height: 400px;
  color: #979797;
  text-align: center;
  &-number {
    div {
      position: relative;
      display: inline-block;
      margin: 5px;
      width: 90px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      font-size: 80px;
      border: 1px solid #cccccc;
      box-sizing: border-box;

      &::after {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        width: 96px;
        height: 126px;
        border: 1px solid #cccccc;
        box-sizing: border-box;
      }
    }
  }
}
</style>
