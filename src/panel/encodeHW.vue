<template>
    <div class="encode-hw">
        <div class="box">
            <div class="form-group">
                <label class="control-label">密文：</label>
                <c-input v-model="encodeTxt" @input="handlerBtnClick"/>
            </div>
            <div class="form-group">
                <label class="control-label">Key/Ts：</label>
                <c-input v-model="encodeKey" @input="handlerBtnClick"/>
            </div>
            <div class="form-group">
                <label class="control-label">类型：</label>
                <label class="control-label"><input name="type" type="radio" v-model="type" value="1" @change="handlerBtnClick"/>request(请求)</label>
                <label class="control-label"><input name="type" type="radio" v-model="type" value="2" @change="handlerBtnClick"/>return(返回)</label>
            </div>
            <div class="form-group">
                <c-textarea v-model="decodeTxt" />
            </div>
        </div>
    </div>
</template>

<script>
import FN from '@/lib/fn';
import { requestDecrypt, returnDecrypt } from '@/lib/fuse.auth'

import CInput from '@/components/CInput';
import CTextarea from '@/components/CTextarea';

export default {
    data(){
        return {
            type: 1,
            encodeTxt: '',
            decodeTxt: '',
            encodeKey: '',
        }
    },
    methods: {
        handlerBtnClick(){
            if(this.encodeTxt){
                try{
                    let data={};
                    if(/\{[^{]*("ts" ?:)[^}]*\}/.test(this.encodeTxt)){
                        data = JSON.parse(/\{[^{]*("ts" ?:)[^}]*\}/.exec(this.encodeTxt)[0])
                    }else if(/ts=/.test(this.encodeTxt)){
                        data = FN.query(this.encodeTxt)
                    }else {
                        data.ts = this.encodeKey
                        data.p = data.d = this.encodeTxt
                    }

                    const { p, d, ts } = data;
                    if((p || d) && ts){
                        let json = {};
                        if(1 == this.type){
                            json = requestDecrypt((p || d), String(ts)).d
                        }else{
                            json = returnDecrypt((p || d), String(ts)).d
                        }
                        this.decodeTxt = JSON.stringify(JSON.parse(json), null, "\t");
                    }
                }catch(e){
                    this.decodeTxt = e.message
                }
            }
        }
    },
    components: {
        CInput,
        CTextarea
    }
}
</script>

<style lang="less">
.encode-hw{
    box-sizing: border-box;

    .box{
        padding: 10px;
    }

    .form-group{
        position: relative;
        display: flex;
        margin-bottom: 10px;
        font-size: 12px;

        .control-label{
            line-height: 28px;
            vertical-align: middle;
        }

        .control-input,
        .control-textarea {
            flex: 1;
        }

        .control-textarea{
            height: 200px;
        }

        input[type="radio"]{
            margin-left: 10px;
            vertical-align: middle;
        }
    }
}
</style>