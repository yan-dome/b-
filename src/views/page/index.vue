<template>
    <div class="tongji">
        <Card />
        <Chart />
    </div>
</template>
<script>
import Card from '@/components/card.vue';
import Chart from '@/components/chart.vue';

export default {
  components: {
    Card,
    Chart,
  },
};
</script>
