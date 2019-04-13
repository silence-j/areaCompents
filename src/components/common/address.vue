<template>
    <div class="container">
        <el-input placeholder="请选择省市区" @focus="showName = true" class="show-box" v-model="citysValue"></el-input>
        <div v-if="showName" class="city-container">
            <ul>
                <li v-for="(item, index) in allProvinceies" class="province" @click="changeActive(item)" :class="item.isActive ? 'isActive' : ''" :key="index">{{ item.name }}
                    <i :class="item.isActive ? 'isActive' : ''" class="icon-style el-icon-arrow-right"></i>
                </li>
            </ul>
            <ul>
                <li class="province" @click="changeCity(cityItem)" v-for="cityItem in allCities" :class="cityItem.isActive ? 'isActive' : ''" :key="cityItem.id">{{ cityItem.name }}
                    <i :class="cityItem.isActive ? 'isActive' : ''" class="icon-style el-icon-arrow-right"></i>
                </li>
            </ul>
            <ul>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" size="medium" class="all-Checked" @change="hanldChecked">全选</el-checkbox>
                <el-checkbox-group @change="changeArea" v-model="areaIds">
                    <el-checkbox v-for="zoneItem in allAreas" :label="zoneItem.id" :key="zoneItem.id">{{ zoneItem.name }}</el-checkbox>
                </el-checkbox-group>
            </ul>
            <div class="btn-operation">
                <el-button size="small" @click="showName = false" type="">取消</el-button>
                <el-button size="small" @click="submit" type="primary">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { addressData } from '@/assets/js/address'
    import { cloneDeep } from 'lodash'
    import { addressJson } from '@/assets/js/address'
    export default {
        name: 'copyArea',
        props: {
            provinces: {
                type: Object
            }
        },
        data () {
            return {
                checkAll: false,
                isIndeterminate: true,
                showName: false,
                citysValue: '',
                provincesId: '',
                cityIds: '',
                areaIds: [],
                allProvinceies: cloneDeep(addressJson).filter(x => x.level === '1').map(item => Object.assign({}, item, { isActive: false })),
                allCities: [],
                allAreas: []
            }
        },
        mounted() {
            if (this.provinces) {
                this.getValue()
            }
        },
        methods: {
            getValue () {
                this.provincesId = this.provinces.proId
                this.allProvinceies.forEach(res => {
                    if (res.id + '' === this.provincesId + '') res.isActive = true
                })
                this.cityIds = this.provinces.cityId
                this.areaIds = this.provinces.zoneIds.split(',')
                let xx = addressData.find(x => x.id + '' === this.provincesId + '')
                this.allCities = xx.children.map(sub => Object.assign({}, sub, {isActive: sub.id + '' === this.cityIds + ''}))
                let yy = this.allCities.find(x => x.id + '' === this.cityIds + '')
                this.allAreas = yy.children.map(sub => Object.assign({}, sub, {isActive: false}))
                this.submit()
            },
            changeActive (item) {
                this.allProvinceies.forEach(res => {
                    res.isActive = false
                })
                item.isActive = true
                this.provincesId = item.id
                let areaItem = addressData.find(x => x.id + '' === this.provincesId + '')
                this.allCities = areaItem.children.map(sub => Object.assign({}, sub, {isActive: false}))
                this.allAreas = []
                this.isIndeterminate = false
                this.checkAll = false
            },
            changeCity (item) {
                this.allCities.forEach(res => {
                    res.isActive = false
                })
                this.areaIds = []
                this.isIndeterminate = false
                this.checkAll = false
                item.isActive = true
                this.cityIds = item.id
                let areaItem = this.allCities.find(x => x.id === this.cityIds)
                this.allAreas = areaItem.children.map(sub => Object.assign({}, sub, {isActive: false}))
            },
            hanldChecked (value) {
                if (value) {
                    let ids = []
                    this.allAreas.forEach(res => {
                        ids.push(res.id)
                    })
                    this.areaIds = ids
                } else {
                    this.areaIds = []
                }
                this.isIndeterminate = false;
            },
            changeArea (value) {
                let checkedCount = value.length
                this.checkAll = checkedCount === this.allAreas.length
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.allAreas.length
            },
            submit () {
                let str = ''
                let a = this.allProvinceies.findIndex(x => x.id + '' === this.provincesId + '')
                str = this.allProvinceies[a].name
                let b = this.allCities.findIndex(x => x.id + '' === this.cityIds + '')
                str = str + this.allCities[b].name
                this.allAreas.forEach(item => {
                    let d = this.areaIds.findIndex(x => x + '' === item.id + '')
                    if (d !== -1) {
                        str = str + item.name
                    }
                })
                this.citysValue = str
                this.showName = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        font-size: 14px;
        position: relative;
        .city-container{
            position: absolute;
            top: 72px;
            left: 0;
            white-space: nowrap;
            background: #fff;
            margin: 5px 0;
            z-index: 2;
            border: 1px solid #e4e7ed;
            border-radius: 2px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
        }
    }
    ul {
        display: inline-block;
        min-width: 148px;
        padding-left: 0;
        height: 276px;
        overflow: hidden;
        line-height: 30px;
        overflow-y: auto;
        li {
            list-style: none;
            padding: 0 10px;
            cursor: pointer;
            &:hover{
                background: #f5f7fa;
            }
        }
        .province{
            position: relative;
            text-align: left;
            .icon-style {
                position: absolute;
                right: 10px;
                line-height: 30px;
            }
        }
        .isActive {
            color: #409eff;
        }
        .all-Checked{
            padding: 0 10px;
        }
        .el-checkbox{
            padding: 0 10px;
            display: block;
            text-align: left;
        }
        &/deep/.el-checkbox__label{
            font-size: 14px;
        }
    }
    .btn-operation{
        text-align: center;
        margin-bottom: 15px;
    }
</style>