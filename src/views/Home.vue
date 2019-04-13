<template>
  <div class="home">
    <div class="address-container">
      <el-form>
        <el-form-item label="地址选择:">
          <common-address :provinces="provinces"></common-address>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
    data () {
      return {
          provinces: {
              proId: 351,
              cityId: 376,
              zoneIds: '380,381'
          }
      }
    },
  components: {
  }
}
</script>
<style lang="scss">
  .address-container {
    width: 500px;
    margin: 0 auto;
  }
</style>
