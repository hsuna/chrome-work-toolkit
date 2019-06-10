<template>
    <input 
        type="text" 
        class="control-input"
        ref="root"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :value="value"
        @change="handleChange"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
    />
</template>

<script>
export default {
    name: 'c-input',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        disabled: Boolean,
        readonly: Boolean,
    },
    model: {
        props: 'value',
        event: 'update:value'
    },
    methods: {
        handleChange(evt) {
            this.$emit('change', evt)
        },
        handleInput(evt) {
            this.$emit('update:value', evt.target.value)
            this.$emit('input', evt)
        },
        handleFocus(evt) {
            this.$refs['root'].select()
            this.$emit('focus')
        },
        handleBlur(evt) {
            this.$emit('blur')
        },
    }
}
</script>


<style lang="less" scoped>
.control-input{
    padding: 4px;
    line-height: 1.5;
    resize: none;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #dadada;
    border-radius: 4px;
}
</style>
