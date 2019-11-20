<template>
  <nm-container>
    <nm-split v-model="split">
      <template v-slot:left>
        <nm-box page>
          <nm-flex direction="row" fix-mode="left" height="500px" fix="150px">
            <template v-slot:left>
              <div class="page nm-bg-success">
                <p class="nm-text-whrite">这里宽度是固定的</p>
              </div>
            </template>
            <template v-slot:right>
              <div class="page nm-bg-warning">
                <p class="nm-text-whrite">
                  这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的
                </p>
              </div>
            </template>
          </nm-flex>
        </nm-box>
      </template>
      <template v-slot:right>
        <nm-split v-model="split1" mode="vertical">
          <template v-slot:top>
            <nm-box page no-scrollbar>
              <nm-flex fix-mode="top" fix="150px">
                <template v-slot:top>
                  <div class="page nm-bg-success">
                    <p class="nm-text-whrite">这里宽度是固定的</p>
                  </div>
                </template>
                <template v-slot:bottom>
                  <div class="page nm-bg-warning">
                    <p class="nm-text-whrite">
                      这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的，这里宽度是弹性的
                    </p>
                  </div>
                </template>
              </nm-flex>
            </nm-box>
          </template>
          <template v-slot:bottom>
            <nm-box page />
          </template>
        </nm-split>
      </template>
    </nm-split>
  </nm-container>
</template>
<script>
export default {
  data() {
    return {
      split: 0.5,
      split1: 0.5
    }
  }
}
</script>
