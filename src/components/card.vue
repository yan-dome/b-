<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="数控报告" :bordered="false">
          <p>总数据库</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="访问量" :bordered="false">
          <p>用户访问量</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="成交量" :bordered="false">
          <p>订单成交量</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
