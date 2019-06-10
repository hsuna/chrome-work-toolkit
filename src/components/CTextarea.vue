<template>
    <div class="control-textarea">
        <textarea 
            ref="root"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            @input="handleInput"
            @focus="handleFocus"
        ></textarea>
        <div class="control-options">
            <a v-if="canCopy" class="copy" @click="handlerCopy">复制</a>
            <a v-if="canClear" class="delete" @click="handlerClear">清空</a>
        </div>
    </div>
</template>

<script>
import FN from '@/lib/fn';

export default {
    name: 'c-textarea',
    props: {
        value: String,
        canCopy: {
            type: Boolean,
            default: true,
        },
        canClear: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        readonly: Boolean,
    },
    computed: {
        nativeValue() {
            return this.value === null || this.value === undefined ? '' : String(this.value);
        }
    },
    watch: {
        nativeValue() {
            this.setNativeValue();
        }
    },
    mounted() {
        this.setNativeValue();
    },
    methods: {
        setNativeValue() {
            this.$refs['root'].value = this.nativeValue;
        },
        handlerCopy(){
            FN.copy(this.$refs['root'])
        },
        handlerClear(){
            this.$emit('input', '');
            this.$nextTick(this.setNativeValue);
        },
        handleInput(evt) {
            this.$emit('input', event.target.value);
            this.$nextTick(this.setNativeValue);
        },
        handleFocus(evt) {
            this.$refs['root'].select()
        },
    }
}
</script>


<style lang="less" scoped>
.control-textarea{
    position: relative;

    textarea{
        width: 100%;
        height: 100%;
        padding: 4px;
        line-height: 1.5;
        resize: none;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #dadada;
        border-radius: 4px;
    }

    .control-options{
        position: absolute;
        right: 4px;
        bottom: 2px;
        font-size: 0;

        a{
            display: inline-block;
            padding: 6px 4px;
            font-size: 12px;
            color: #409eff;
            background-color: #fff;
            cursor: pointer;

            &:hover{
                text-decoration: underline;
            }
        }
    }
}
</style>
