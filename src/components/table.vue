<template>
  <a-table :columns="columns" :data-source="TableData"
  :pagination="page" @change="changePage">
    <div slot="operation" slot-scope=" text,record">
      <a-button @click="editProduct(record)">编辑</a-button>
      <a-button @click="removeProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
// import api from '@/api/product';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

// const data = [
// ];

export default {
  data() {
    return {
      // data,
      columns,
    };
  },
  // created() {
  //   api.list().then((res) => {
  //     this.data = res.data;
  //   });
  // },
  props: ['data', 'page'],
  computed: {
    TableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      console.log(page);
      this.$emit('change', page);
    },
    editProduct(record) {
      this.$emit('edio', record);
      // this.$router.push({
      //   name: 'Edio',
      //   params: {
      //     id: record.id,
      //   },
      // });
    },
    removeProduct(record) {
      this.$emit('remove', record);
      console.log(record);
      // this.$confirm({
      //   title: '确认删除',
      //   content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗？`}</div>,
      //   okText: '删除',
      //   okType: 'danger',
      //   cancelText: '取消',
      //   onOk() {
      //     console.log('OK');
      //     api.remove({
      //       id: record.id,
      //     }).then((res) => {
      //       console.log(res);
      //     });
      //   },
      //   onCancel() {
      //     console.log('Cancel');
      //   },
      // });
    },
  },
};
</script>
