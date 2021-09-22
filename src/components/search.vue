<template>
  <div class="search">
    <a-form-model
      layout="inline"
      :model="searchFrom"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="搜索关键字">
        <a-input v-model="searchFrom.searchWord" placeholder="查询关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品列表">
        <a-select
          allowClear
          show-search
          placeholder="商品列表"
          v-model="searchFrom.category"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option v-for="c in data" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchFrom: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  created() {},
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchFrom);
    },
    handleChange(val) {
      // 切换类目触发
      console.log(val);
      this.searchFrom.category = val;
    },
  },
};
</script>
<style scoped lang='less'>
.search {
  margin: 10px 30px;
}
</style>
