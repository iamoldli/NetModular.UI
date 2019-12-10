<template>
  <nm-form-page v-bind="form">
    <el-row>
      <el-col :span="10" :offset="1">
        <el-form-item label="坐标：" prop="point">
          <nm-map-coord-picking v-model="form.model.point" />
        </el-form-item>
        <el-form-item label="允许手动输入坐标：" prop="point">
          <nm-map-coord-picking v-model="form.model.point1" allow-input />
        </el-form-item>
        <el-form-item label="禁用：" prop="point">
          <nm-map-coord-picking v-model="form.model.point1" disabled />
        </el-form-item>
        <el-form-item label="设置精度：" prop="point">
          <nm-map-coord-picking v-model="form.model.point2" :precision="8" />
        </el-form-item>
      </el-col>
    </el-row>
  </nm-form-page>
</template>
<script>
export default {
  data() {
    return {
      form: {
        header: true,
        title: '坐标拾取示例',
        icon: 'add',
        labelWidth: '300px',
        model: {
          point: {
            lng: 116.404,
            lat: 39.915
          },
          point1: null,
          point2: {
            lng: 116.404,
            lat: 39.915
          }
        },
        rules: {},
        action() {
          return new Promise(resolve => {
            resolve()
          })
        }
      }
    }
  }
}
</script>
