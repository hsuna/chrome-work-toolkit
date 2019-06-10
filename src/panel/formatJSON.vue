<template>
    <div class="format-json">
        <div class="form-group">
            <c-textarea placeholder="请输入" v-model="inputTxt" @input="handlerFormatInput"/>
        </div>
        <div class="form-group">
            <c-textarea placeholder="请输入" v-model="formatTxt" />
        </div>
        <div class="btn-group">
            <label><input type="checkbox" v-model="checked"/>制表符分隔</label>
        </div>
    </div>
</template>

<script>
import CTextarea from '@/components/CTextarea';

export default {
    data(){
        return {
            checked: true,
            inputTxt: '',
            formatTxt: '',
        }
    },
    methods: {
        handlerFormatInput(){
            try{
                let format = JSON.parse(this.inputTxt)
                this.formatTxt =  JSON.stringify(format, null, this.checked?'\t':4)
            } catch(e){
                this.formatTxt = e.message
            }
        },
    },
    components: {
        CTextarea
    }
}
</script>

<style lang="less">
.format-json{
    padding: 10px;
    box-sizing: border-box;

    .form-group{
        margin-bottom: 10px;
    }

    .control-textarea{
        height: 160px;
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