<template>
  <nm-container>
    <nm-box page>
      <div class="nm-default">
        <nm-icon name="work" class="nm-size-100" />
        <h1 class="nm-m-20 nm-size-20">欢迎登录{{ title }}~</h1>
        <p>本系统使用开源框架 <a class="nm-link" target="_blank" href="https://github.com/iamoldli/NetModular">NetModular</a> 开发</p>
        <img style="width:100%" src="../../../public/images/motto.png" />
      </div>
    </nm-box>
  </nm-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app/config', { title: s => s.system.title })
  }
}
</script>
<style lang="scss">
.nm-default {
  margin: 100px auto;
  width: 600px;
  height: 400px;
  color: #979797;
  text-align: center;
}
</style>
