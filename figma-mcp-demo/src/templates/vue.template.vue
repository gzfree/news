<template>
  <div 
    :class="['{{COMPONENT_NAME}}', $attrs.class]"
    {{#STYLE_PROPS}}
    :style="{
      {{#STYLE_ITEMS}}
      '{{STYLE_NAME}}': {{STYLE_VALUE}},
      {{/STYLE_ITEMS}}
    }"
    {{/STYLE_PROPS}}
  >
    {{COMPONENT_CONTENT}}
  </div>
</template>

<script>
/**
 * {{COMPONENT_NAME}} 组件
 * 
 * @description {{COMPONENT_DESCRIPTION}}
 */
export default {
  name: '{{COMPONENT_NAME}}',
  
  props: {
    {{#PROPS}}
    /**
     * {{PROP_DESCRIPTION}}
     */
    {{PROP_NAME}}: {
      type: {{PROP_TYPE}},
      {{#PROP_DEFAULT}}
      default: {{PROP_DEFAULT}},
      {{/PROP_DEFAULT}}
      {{#PROP_REQUIRED}}
      required: true,
      {{/PROP_REQUIRED}}
    },
    {{/PROPS}}
  },
  
  setup(props) {
    // 组件逻辑
    return {
      // 暴露给模板的变量
    }
  }
}
</script>

<style scoped>
.{{COMPONENT_NAME}} {
  {{#CSS_PROPS}}
  {{CSS_NAME}}: {{CSS_VALUE}};
  {{/CSS_PROPS}}
}
</style> 