<template>
    <d2-container
            type="card"
            class="page">

    </d2-container>
</template>

<script>
    import {stockInfo} from '@api/zhx.invest'

    export default {
        mixins: [
            stockInfo
        ],
        // 第一次进入或从其他组件对应路由进入时触发
        beforeRouteEnter(to, from, next) {
            const id = to.params.id
            if (id) {
                stockInfo(id).then(res => {
                    alert(res.baseInfo.name)
                }).catch(err => {
                    console.log('err', err)
                })
            } else {
                next(new Error('未指定ID'))
            }
        },
        // 在同一组件对应的多个路由间切换时触发
        beforeRouteUpdate(to, from, next) {
            const id = to.params.id
            if (id) {
                stockInfo(id).then(res => {

                }).catch(err => {
                    console.log('err', err)
                })
            } else {
                next(new Error('未指定ID'))
            }
        }
    }
</script>

<style lang="scss">
    .page {
        .page--form {
            max-width: 460px;
        }
    }
</style>

