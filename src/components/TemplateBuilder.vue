<template>
  <div class="tb">
    <!-- Template picker -->
    <label class="tb__label">Template</label>
    <!-- <select class="tb__select" v-model="selectedId">
      <option v-for="t in templates" :key="t.id" :value="t.id">
        {{ t.label }}
      </option>
    </select> -->
	<v-select
	  class=""
	  v-model="selectedId"
	  :items="templates.map(t => ({ text: t.label, value: t.id }))"
	  item-title="text"
	  item-value="value"
	/>

    <!-- Optional description -->
    <p v-if="current?.description" class="tb__desc">{{ current.description }}</p>

    <!-- Dynamic fields -->
    <div v-if="current" class="tb__fields">
      <div
        v-for="f in current.fields"
        :key="f.key"
        class="tb__field"
      >
        <label class="tb__field-label">
          {{ f.label }}
          <span v-if="f.required" aria-hidden="true" class="tb__required">*</span>
        </label>

        <!-- Input control by type -->
        <input
          v-if="!f.type || f.type === 'text'"
          class="tb__input"
          type="text"
          :placeholder="f.placeholder || ''"
          v-model="values[f.key]"
          @blur="touch(f.key)"
        />
        <input
          v-else-if="f.type === 'number'"
          class="tb__input"
          type="number"
          :placeholder="f.placeholder || ''"
          v-model.number="values[f.key]"
          @blur="touch(f.key)"
        />
        <select
          v-else-if="f.type === 'select'"
          class="tb__input"
          v-model="values[f.key]"
          @blur="touch(f.key)"
        >
          <option value="" disabled v-if="!f.required">—</option>
          <option
            v-for="opt in (f.options || [])"
            :key="String(opt.value)"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
		<v-combobox
			v-else-if="f.type === 'activity'"
			class=""
			v-model="values[f.key]"
			:items="props.activityNames"
			item-title="text"
			item-value="value"
			/>
        <input
          v-else-if="f.type === 'checkbox'"
          class="tb__checkbox"
          type="checkbox"
          v-model="values[f.key]"
          @blur="touch(f.key)"
        />
        <input
          v-else-if="f.type === 'date'"
          class="tb__input"
          type="date"
          v-model="values[f.key]"
          @blur="touch(f.key)"
        />
        <input
          v-else
          class="tb__input"
          type="text"
          :placeholder="f.placeholder || ''"
          v-model="values[f.key]"
          @blur="touch(f.key)"
        />

        <!-- Validation messages -->
        <p v-if="touched[f.key] && fieldError(f)" class="tb__error">
          {{ fieldError(f) }}
        </p>

        <!-- Tiny hint -->
        <p v-if="f.hint" class="tb__hint">{{ f.hint }}</p>
      </div>
    </div>

    <!-- Preview / Output -->
    <div v-if="current" class="tb__preview">
      <div class="tb__preview-head">
        <strong>Preview</strong>
        <!-- <div class="tb__actions">
          <button class="tb__btn" type="button" @click="copy()">Copy</button>
        </div> -->
      </div>

      <!-- Choose how to render (plain or code) -->
      <pre v-if="current.render === 'code'" class="tb__code"><code>{{ output }}</code></pre>
      <div v-else class="tb__box">{{ output }}</div>

      <p v-if="!isComplete" class="tb__incomplete">
        Fill all required fields to finalize the output.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref } from 'vue'

type FieldOption = { label: string; value: string | number | boolean }
type Field = {
  key: string
  label: string
  type?: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'activity'
  placeholder?: string
  required?: boolean
  pattern?: string | RegExp // optional validation
  options?: FieldOption[]   // for select
  hint?: string
}

type TemplateDef = {
  id: string
  label: string
  description?: string
  format: string               // uses {{fieldKey}} placeholders
  render?: 'text' | 'code'     // preview style
  escapeForRegex?: boolean     // escape user input as regex literals if true
  fields: Field[]
}

const props = defineProps<{
  templates: TemplateDef[]
  activityNames: string[]
  modelValue?: string
  initialTemplateId?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', payload: { templateId: string; values: Record<string, any>; output: string, complete: boolean }): void
}>()

// Selected template id
const selectedId = ref<string>(props.initialTemplateId ?? props.templates?.[0]?.id ?? '')

const current = computed<TemplateDef | undefined>(() =>
  props.templates.find(t => t.id === selectedId.value)
)

// Form state
const values = reactive<Record<string, any>>({})
const touched = reactive<Record<string, boolean>>({})

// Reset values when template changes
watch(current, (tpl) => {
  for (const k of Object.keys(values)) delete values[k]
  for (const k of Object.keys(touched)) delete touched[k]
  if (!tpl) return
  for (const f of tpl.fields) {
    // sensible defaults
    values[f.key] = f.type === 'checkbox' ? false : ''
  }
}, { immediate: true })

function touch(key: string) {
  touched[key] = true
}

function escapeForRegex(literal: string): string {
  // escape characters with special meaning in regex
  return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function interpolate(template: string, dict: Record<string, any>, { regexSafe = false } = {}) {
  return template.replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, key) => {
    const raw = dict?.[key] ?? ''
    const str = raw == null ? '' : String(raw)
    return regexSafe ? escapeForRegex(str) : str
  })
}

const isComplete = computed(() => {
  if (!current.value) return false
  return current.value.fields.every(f => {
    if (!f.required) return true
    const v = values[f.key]
    if (f.type === 'checkbox') return v === true
    return v !== '' && v !== null && v !== undefined
  })
})

function fieldError(f: Field): string | null {
  const v = values[f.key]
  if (f.required) {
    if (f.type === 'checkbox' && v !== true) return 'This field is required.'
    if (f.type !== 'checkbox' && (v === '' || v === null || v === undefined)) return 'This field is required.'
  }
  if (v && f.pattern) {
    const re = typeof f.pattern === 'string' ? new RegExp(f.pattern) : f.pattern
    if (!re.test(String(v))) return 'Invalid value.'
  }
  return null
}

const output = computed(() => {
  if (!current.value) return ''
  const str = interpolate(current.value.format, values, {
    regexSafe: !!current.value.escapeForRegex
  })
  return str
})

// keep parent in sync
watch(output, (val) => {
  if (isComplete.value){
	emit('update:modelValue', val)
  } else {
	emit('update:modelValue', undefined)
  }
  emit('change', { templateId: selectedId.value, values: { ...values }, output: val, complete: isComplete.value })
}, { immediate: true })

async function copy() {
  try {
    await navigator.clipboard.writeText(output.value)
  } catch {
    // noop
  }
}
</script>

<style scoped>
.tb { display: grid; gap: 1rem; max-width: 720px; }
.tb__label { font-weight: 600; }
.tb__select, .tb__input { width: 100%; padding: .6rem .7rem; border: 1px solid #ddd; border-radius: .5rem; }
.tb__checkbox { transform: scale(1.1); }
.tb__desc { margin: 0; color: #555; }
.tb__fields { display: grid; gap: .8rem; }
.tb__field { display: grid; gap: .35rem; }
.tb__field-label { font-size: .95rem; font-weight: 500; }
.tb__required { color: #c62828; margin-left: .25rem; }
.tb__error { color: #c62828; font-size: .85rem; margin: 0; }
.tb__hint { color: #666; font-size: .85rem; margin: 0; }
.tb__preview { border: 1px solid #eee; border-radius: .75rem; padding: .9rem; display: grid; gap: .6rem; background-color: #eee; }
.tb__preview-head { display: flex; align-items: center; justify-content: space-between; }
.tb__actions { display: flex; gap: .5rem; }
.tb__btn { border: 1px solid #ddd; background: #fafafa; padding: .4rem .6rem; border-radius: .5rem; cursor: pointer; }
.tb__btn:hover { background: #f0f0f0; }
.tb__box { background: #fafafa; padding: .7rem; border-radius: .5rem; word-break: break-all; }
.tb__code { background: #0b0c0e; color: #e7e7e7; padding: .75rem; border-radius: .5rem; overflow-x: auto; }
.tb__incomplete { color: #7a7a7a; font-size: .9rem; margin: 0; }
</style>
