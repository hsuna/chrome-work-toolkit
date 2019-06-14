<template>
    <div class="format-base64">
       <div class="form-group">
            <c-textarea placeholder="请输入" v-model="encodeTxt" @input="handlerEncodeInput"/>
        </div>
        <div class="form-group">
            <c-textarea placeholder="请输入" v-model="decodeTxt" @input="handlerDecodeInput"/>
        </div>
        <!-- <div class="btn-group">
            <label><input type="checkbox" v-model="checked"/></label>
        </div> -->
    </div>
</template>

<script>
import CTextarea from '@/components/CTextarea';

export default {
    data(){
        return {
            //checked: true,
            encodeTxt: '',
            decodeTxt: ''
        }
    },
    methods: {
        handlerEncodeInput(){
            try{
                this.decodeTxt = Buffer.from(this.encodeTxt, 'base64').toString()
            } catch(e){
                this.decodeTxt = e.message
            }
        },
        handlerDecodeInput(){
            try{
                this.encodeTxt = Buffer.from(this.decodeTxt).toString('base64')
            } catch(e){
                this.encodeTxt = e.message
            }
        }
    },
    components: {
        CTextarea
    }
}
</script>

<style lang="less">
.format-base64{
    padding: 10px;
    box-sizing: border-box;

    .form-group{
        margin-bottom: 10px;
    }

    .control-textarea{
        height: 200px;
    }
    
    label{
        margin-left: 12px;
        font-size: 12px;

        [type="checkbox"]{
            margin-right: 4px;
            vertical-align: middle;
        }
    }
}
</style>