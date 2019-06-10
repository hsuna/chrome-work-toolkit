<template>
    <div id="app">
        <div class="popup">
            <div class="popup-nav">
                <ul>
                    <li :class="{active: navIndex==index}" v-for="(item,index) in nav" :key="index" @click="handlerNavClick(index)">{{item.label}}</li>
                </ul>
            </div>
            <div class="popup-content">
                <component :is="navComponent"></component>
            </div>
        </div>
    </div>
</template>

<script>
import encodeURI from './panel/encodeURI'
import encodeHW from './panel/encodeHW'
import encodeGLB from './panel/encodeGLB'
import formatJSON from './panel/formatJSON'

export default {
    data(){
        return {
            navIndex: -1,
            navComponent: null,
            nav: [
                { label: 'URI编/解码', component:'encodeURI' },
                { label: 'HW解密', component:'encodeHW' },
                { label: 'GLB解密', component:'encodeGLB' },
                { label: '格式化JSON', component:'formatJSON' }
            ]
        }
    },
    created(){
        this.handlerNavClick(0)
    },
    methods: {
        handlerNavClick(index){
            this.navIndex = index;
            this.navComponent = this.nav[index].component
        }
    },
    components: {
        encodeURI,
        encodeHW,
        encodeGLB,
        formatJSON
    },
}
</script>

<style lang="less">
.popup{
    width: 400px;
    height: 500px;
    .popup-nav {
        position: relative;
        padding: 10px 10px 0;
        border-bottom: 1px solid #dadada;
        text-align: left;
        font-size: 14px;
        user-select: none;

        ul{
            white-space: nowrap;

            li{
                display: inline-block;
                padding: 4px 10px ;
                margin-left: -1px;
                border: 1px solid #409eff;
                border-bottom-width: 0;
                border-radius: 4px 4px 0 0;
                background-color: transparent;
                color: #409eff;

                &:hover,
                &.active{
                    color: #fff;
                    border-color: #409eff;
                    background-color: #409eff;
                }
            }
        }
    }

    .popup-body {
        position: relative;
        overflow-y: auto;
        width: 420px;
        height: 340px;
        padding: 15px;
        font-size: 14px;
    }
}
</style>