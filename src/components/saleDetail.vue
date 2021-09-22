<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off" required>
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册 " prop="images">
        <a-upload
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传图片</div>
          </div>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{ span: 24 }" class="over-btn">
        <a-button type="default" @click="clickprev">上一步</a-button>
        <a-button type="primary" @click="over">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      // form: {
      //   price: 0,
      //   price_off: 0,
      //   unit: '',
      //   inventory: 0,
      //   images: [],
      // },
      // 校验规则
      rules: {},
      // 显示的图片
      fileList: [],
      loading: false,
      previewVisible: false,
      previewImage: '',
    };
  },
  props: ['form'],
  created() {
    // 如果有图片则显示图片
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        // 保存一下 准备删除的Url
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    clickprev() {
      this.$emit('prev');
    },
    over() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },
};
</script>
<style  lang="less" scoped>
.sale-detail {
  .over-btn {
    button {
      margin: 20px;
    }
  }
}
</style>
