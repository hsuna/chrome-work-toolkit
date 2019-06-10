<template>
    <div class="encode-glb">
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
        <div class="box">
            <h4 class="box-header">GLB</h4>
            <div class="form-group">
                <label class="control-label">密钥：</label>
                <c-input v-model="encodeGlbKey" @input="handlerGlbCreate"/>
            </div>
            <div class="form-group">
                <label class="control-label">rd/content：</label>
                <c-input v-model="encodeGlbTxt" @input="handlerGlbEncode"/>
            </div>
            <div class="form-group">
                <label class="control-label">encmask：</label>
                <c-input v-model="encodeGlbEncmask" @input="handlerGlbEncode"/>
                <label class="control-label"><input name="glb-type" type="radio" v-model="encodeGlbType" value="1" @change="handlerGlbEncode"/>公钥</label>
                <label class="control-label"><input name="glb-type" type="radio" v-model="encodeGlbType" value="2" @change="handlerGlbEncode"/>私钥</label>
            </div>
            <div class="form-group">
                <c-textarea v-model="decodeGlbTxt" />
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
const GLB_TMP_KEY = 'GLB_TMP_KEY'

export default {
    data(){
        return {
            rsa: null,
            glb: null,

            encodeAesTxt: '',
            encodeAesKey: '',
            decodeAesTxt: '',

            encodeRsaTxt: '',
            encodeRsaKey: window.localStorage.getItem(RSA_TMP_KEY) || '',
            encodeRsaType: 1,
            decodeRsaTxt: '',
            
            encodeGlbTxt: '',
            encodeGlbEncmask: '',
            encodeGlbKey: window.localStorage.getItem(GLB_TMP_KEY) || '',
            encodeGlbType: 1,
            decodeGlbTxt: '',
        }
    },
    created(){
        if(this.encodeRsaKey) this.rsa = new RSA(this.encodeRsaKey);
        if(this.encodeGlbKey) this.glb = new RSA(this.encodeGlbKey);
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
        handlerGlbCreate(evt){
            this.glb = new RSA(evt.target.value)
            window.localStorage.setItem(GLB_TMP_KEY, evt.target.value)
        },
        handlerGlbEncode(){
            if(this.encodeGlbTxt && this.encodeGlbKey){
                try{
                    let data = {};
                    if(/"encmask" ?:/.test(this.encodeGlbTxt)){
                        data = JSON.parse(this.encodeGlbTxt)
                    }else if(/encmask=/.test(this.encodeGlbTxt)){
                        data = FN.query(this.encodeGlbTxt)
                    }else if(this.encodeGlbEncmask){
                        data.encmask = decodeURIComponent(this.encodeGlbEncmask);
                        data.rd = data.content= decodeURIComponent(this.encodeGlbTxt);
                    }
                    if((data.rd || data.content) && data.encmask){
                        const RES_KEY = this.glb.decrypt(data.encmask, 1==this.encodeGlbType ? RSA.PUBLIC : RSA.PRIAVET)
                        const json = aes.decrypt(data.rd || data.content, RES_KEY)
                        this.decodeGlbTxt = JSON.stringify(JSON.parse(json), null, "\t");
                    }
                }catch(e){
                    this.decodeGlbTxt = e.message;
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
.encode-glb{
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