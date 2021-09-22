<template>
  <div class="basic-detail">
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{span:7}"
    :wrapper-col="{span:12}">
      <a-form-model-item label="副标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc" >
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required   prop="category">
        <a-select v-model="form.category" placeholder="请选择商品类别" @change="changeCategory">
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id"
          >
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item"  placeholder="请添加子类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" required prop='tags'>
        <a-select
          mode="tags"
          v-model="form.tags"
          placeholder="今日特价包邮次日达"
          :default-value="['今日特价包邮次日达']"
        >
          <a-select-option value="今日特价包邮次日达">
            今日特价包邮次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item  class="next-btn" :wrapperCol = {span:26}>
        <a-button type="primary"  @click="clickNex">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      // form: {
      //   title: '',
      //   desc: '',
      //   category: '',
      //   c_item: [],
      //   tags: [],
      // },
      // 校验规则
      rules: {},
      // 商品类目列表
      categoryList: [],
      // 子类目列表
      categoryItems: [],
      // 标签列表
      tagsList: [],
    };
  },
  props: ['form'],
  created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    clickNex() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.basic-detail{
  .next-btn{
    text-align: center;
  }
}
</style>
