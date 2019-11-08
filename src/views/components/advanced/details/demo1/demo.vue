<template>
  <nm-box page header no-padding title="产品详情" icon="detail" fullscreen>
    <nm-details v-bind="details"></nm-details>
  </nm-box>
</template>
<script>
export default {
  data() {
    return {
      details: {
        action() {
          return new Promise(resolve => {
            resolve({
              id: 1,
              title: '三星Galaxy Node 10',
              price: 6999,
              store: 98989,
              des: `三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy
         Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10
         三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10
         三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10
         三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10
         三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10三星Galaxy Node 10`
            })
          })
        },
        options: [
          [
            {
              label: '编号',
              prop: 'id'
            },
            {
              label: '产品名称',
              prop: 'title'
            }
          ],
          [
            {
              label: '价格',
              prop: 'price'
            },
            {
              label: '库存',
              prop: 'store'
            }
          ],
          [
            {
              label: '介绍',
              prop: 'des'
            }
          ]
        ]
      }
    }
  }
}
</script>
