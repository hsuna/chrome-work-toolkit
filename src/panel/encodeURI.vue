<template>
    <div class="encode-uri">
        <div class="form-group">
            <c-textarea placeholder="请输入" v-model="encodeTxt" @input="handlerEncodeInput"/>
        </div>
        <div class="form-group">
            <c-textarea placeholder="请输入" v-model="decodeTxt" @input="handlerDecodeInput"/>
        </div>
        <div class="btn-group">
            <label><input type="checkbox" v-model="checked"/>Component</label>
        </div>
    </div>
</template>

<script>
import CTextarea from '@/components/CTextarea';

export default {
    data(){
        return {
            checked: true,
            encodeTxt: '',
            decodeTxt: ''
        }
    },
    methods: {
        handlerEncodeInput(){
            try{
                if(this.checked){
                    this.decodeTxt = encodeURIComponent(this.encodeTxt)
                }else{
                    this.decodeTxt = encodeURI(this.encodeTxt)
                }
            } catch(e){
                this.decodeTxt = e.message
            }
        },
        handlerDecodeInput(){
            try{
                if(this.checked){
                    this.encodeTxt = decodeURIComponent(this.decodeTxt)
                }else{
                    this.encodeTxt = decodeURI(this.decodeTxt)
                }
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
.encode-uri{
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