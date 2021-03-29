<template>
    <div class="encode-Sdk">
        <div class="box">
            <h4 class="box-header">SDK</h4>
            <div class="form-group">
                <label class="control-label">密钥：</label>
                <c-input v-model="encodeSdkKey" @input="handlerSdkCreate"/>
            </div>
            <div class="form-group">
                <label class="control-label">密文：</label>
                <c-input v-model="encodeSdkTxt" @input="handlerSdkEncode"/>
            </div>
            <div class="form-group">
                <label class="control-label">encmask：</label>
                <c-input v-model="encodeSdkEncmask" @input="handlerSdkEncode"/>
            </div>
            <div class="form-group">
                <c-textarea v-model="decodeSdkTxt" />
            </div>
        </div>
        <div class="box">
            <h4 class="box-header">AES</h4>
            <div class="form-group">
                <label class="control-label">密文：</label>
                <c-input v-model="encodeAesTxt" @input="handlerAesEncode"/>
            </div>
            <div class="form-group">
                <label class="control-label">密钥：</label>
                <c-input v-model="encodeAesKey" @input="handlerAesEncode"/>
            </div>
            <div class="form-group">
                <c-textarea v-model="decodeAesTxt" />
            </div>
        </div>
        <div class="box">
            <h4 class="box-header">RSA</h4>
            <div class="form-group">
                <label class="control-label">密文：</label>
                <c-input v-model="encodeRsaTxt" @input="handlerRSAEncode"/>
            </div>
            <div class="form-group">
                <label class="control-label">密钥：</label>
                <c-input v-model="encodeRsaKey" @input="handlerRSACreate"/>
                <label class="control-label"><input name="rsa-type" type="radio" v-model="encodeRsaType" value="1" @change="handlerRSAEncode"/>公钥</label>
                <label class="control-label"><input name="rsa-type" type="radio" v-model="encodeRsaType" value="2" @change="handlerRSAEncode"/>私钥</label>
            </div>
            <div class="form-group">
                <c-textarea v-model="decodeRsaTxt" />
            </div>
        </div>
    </div>
</template>

<script>
import FN from '@/lib/fn';
import aes from '@/lib/aes'
import RSA from '@/lib/rsa'

import CInput from '@/components/CInput';
import CTextarea from '@/components/CTextarea';

const RSA_TMP_KEY = 'RSA_TMP_KEY'
const Sdk_TMP_KEY = 'Sdk_TMP_KEY'

export default {
    data(){
        return {
            rsa: null,
            Sdk: null,

            encodeAesTxt: '',
            encodeAesKey: '',
            decodeAesTxt: '',

            encodeRsaTxt: '',
            encodeRsaKey: window.localStorage.getItem(RSA_TMP_KEY) || '',
            encodeRsaType: 1,
            decodeRsaTxt: '',
            
            encodeSdkTxt: '',
            encodeSdkEncmask: 'd,ts',
            encodeSdkKey: window.localStorage.getItem(Sdk_TMP_KEY) || '',
            decodeSdkTxt: '',
        }
    },
    created(){
        if(this.encodeRsaKey) this.rsa = new RSA(this.encodeRsaKey);
        if(this.encodeSdkKey) this.sdk = new RSA(this.encodeSdkKey);
    },
    methods: {
        handlerAesEncode(){
            if(this.encodeAesTxt && this.encodeAesKey){
                try{
                    const data = JSON.parse(aes.decrypt(decodeURIComponent(this.encodeAesTxt), this.encodeAesKey))
                    this.decodeAesTxt = JSON.stringify(data, null, "\t");
                }catch(e){
                    this.decodeAesTxt = e.message;
                }
            }
        },
        handlerRSACreate(evt){
            this.rsa = new RSA(evt.target.value)
            window.localStorage.setItem(RSA_TMP_KEY, evt.target.value)
        },
        handlerRSAEncode(){
             if(this.encodeRsaTxt && this.encodeRsaKey){
                try{
                    this.decodeRsaTxt = this.rsa.decrypt(decodeURIComponent(this.encodeRsaTxt), 1==this.encodeRsaType ? RSA.PUBLIC : RSA.PRIAVET);
                }catch(e){
                    this.decodeRsaTxt = e.message;
                }
            }
        },
        handlerSdkCreate(evt){
            this.sdk = new RSA(evt.target.value)
            window.localStorage.setItem(Sdk_TMP_KEY, evt.target.value)
        },
        handlerSdkEncode(){
            if(this.encodeSdkTxt && this.encodeSdkKey){
                try{
                    let data={};
                    let [d, ts] = this.encodeSdkEncmask.split(',')
                    if(new RegExp(`\{[^{]*("${ts}" ?:)[^}]*\}`).test(this.encodeSdkTxt)){
                        data = JSON.parse(new RegExp(`\{[^{]*("${ts}" ?:)[^}]*\}`).exec(this.encodeSdkTxt)[0])
                    }
                    const RES_KEY = this.sdk.decrypt(data[ts]);
                    this.decodeSdkTxt = JSON.stringify(JSON.parse(aes.decrypt(data[d], RES_KEY)), null, "\t");
                }catch(e){
                     this.decodeSdkTxt = e.message;
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
.encode-Sdk{
    box-sizing: border-box;

    .box{
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    h4{
        padding: 4px 8px;
        border-bottom: 1px solid #dadada;
        margin-bottom: 10px;
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

        .control-input {
            flex: 1;
        }

        input[type="radio"]{
            margin-left: 10px;
            vertical-align: middle;
        }

        .control-textarea{
            width: 100%;
            height: 120px;
        }
    }
}
</style>