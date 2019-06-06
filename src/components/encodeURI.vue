<template>
    <div class="encode-uri">
        <div class="form-control">
            <textarea ref="encodeElem" class="textarea-left " placeholder="请输入URI编码" v-model="encodeTxt"></textarea>
            <div class="options">
                <a class="copy" @click="handlerCopyByName('encodeElem')">复制</a>
                <a class="delete" @click="encodeTxt=''">清空</a>
            </div>
        </div>
        <div class="form-control">
            <textarea ref="decodeElem" class="textarea-right" placeholder="请输入URI解码" v-model="decodeTxt"></textarea>
            <div class="options">
                <a class="copy" @click="handlerCopyByName('decodeElem')">复制</a>
                <a class="delete" @click="decodeTxt=''">清空</a>
            </div>
        </div>
        <div class="btn-group">
            <button class="btn" type="button" @click="handlerBtnClick">URI编/解码</button>
            <label><input type="checkbox" v-model="checked"/>Component</label>
        </div>
    </div>
</template>

<script>
import FN from '@/lib/fn';

export default {
    data(){
        return {
            checked: true,
            encodeTxt: '',
            decodeTxt: ''
        }
    },
    methods: {
        handlerCopyByName(name){
            FN.copy(this.$refs[name])
        },
        handlerBtnClick(){
            if(this.encodeTxt){
                if(this.checked){
                    this.decodeTxt = encodeURIComponent(this.encodeTxt)
                }else{
                    this.decodeTxt = encodeURI(this.encodeTxt)
                }
            }else if(this.decodeTxt){
                if(this.checked){
                    this.encodeTxt = decodeURIComponent(this.decodeTxt)
                }else{
                    this.encodeTxt = decodeURI(this.decodeTxt)
                }
            }
        }
    },
}
</script>

<style lang="less">
.encode-uri{
    padding: 10px;
    box-sizing: border-box;

    .form-control{
        position: relative;
        margin-bottom: 10px;

        .options{
            position: absolute;
            right: 4px;
            bottom: 10px;
            font-size: 0;

            a{
                padding: 4px;
                font-size: 12px;
                color: #409eff;
                cursor: pointer;

                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }

    textarea{
        width: 100%;
        height: 180px;
        padding: 4px;
        line-height: 1.5;
        resize: none;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #dadada;
        border-radius: 4px;
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