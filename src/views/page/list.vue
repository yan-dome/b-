<template>
  <div class="search">
    <!-- 搜索 -->
    <Search @submit="handleSubmit" :data="categoryList" />
    <a-button class="button">
      <router-link :to="{ name: 'Add' }"> 新增商品</router-link>
    </a-button>
    <!-- 表格 -->
    <Table :data="TableData" :page="page" @change="changePage"
    @edio="edioprodect" @remove="ediore" />
  </div>
</template>

<script>
import Search from '@/components/search.vue';
import Table from '@/components/table.vue';
import api from '@/api/product';
import apicategory from '@/api/category';

export default {
  data() {
    return {
      TableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
      // 类目的映射
      categoryObj: {},
    };
  },
  components: {
    Search,
    Table,
  },
  async created() {
    await apicategory.list().then((res) => {
      this.categoryList = res.data;
      this.categoryList.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTabData();
  },
  methods: {
    handleSubmit(form) {
      this.searchForm = form;
      this.getTabData();
    },
    getTabData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          this.TableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
          this.page.total = res.total;
        });
    },
    changePage(page) {
      this.page = page;
      this.getTabData();
    },
    // 点击编辑跳转路由
    edioprodect(record) {
      this.$router.push({
        name: 'Edio',
        params: {
          id: record.id,
        },
      });
    },
    // 确认删除该商品项
    ediore(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗？`}</div>,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.remove({
            id: record.id,
          }).then(() => {
            this.getTabData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  },
};
</script>
<style scoped lang="less">
.search {
  .button {
    position: absolute;
    right: 40px;
    top: 60px;
  }
}
</style>
