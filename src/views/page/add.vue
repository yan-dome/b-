<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-step">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicDetail v-if="current === 0" @next="next" :form="form" />
      <SaleDetail
        v-else-if="current === 1"
        @next="next"
        @prev="prev"
        :form="form"
      />
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDetail.vue';
import Api from '@/api/product';

export default {
  data() {
    return {
      form: {
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
      },
      current: 0,
      steps: [
        {
          title: '填写基本商品信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  components: {
    BasicDetail,
    SaleDetail,
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
    // 如果有Id说明是编辑的表单 读取详情
      console.log(id);
      Api.detail(id).then((res) => {
        console.log(res);
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        // 提交数据
        if (this.$route.params.id) {
          Api.edio(this.form).then(() => {
            this.$message.success('修改成功');
            this.$router.push({
              name: 'List',
            });
          });
        } else {
          Api.add(this.form).then(() => {
            this.$message.success('新增成功');
            this.$router.push({
              name: 'List',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style  lang="less" scoped>
.product-detail {
  .steps-action {
    margin-top: 24px;
  }
  .product-step {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>
