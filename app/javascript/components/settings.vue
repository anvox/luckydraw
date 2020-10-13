<template lang="pug">
#id-ace-settings-modal.my-1.my-lg-2.modal.modal-nb.ace-aside.aside-right.aside-offset.aside-below-nav(data-backdrop="false", tabindex="-1", role="dialog", aria-hidden="true", ref="settingsModal")
  .modal-dialog(role="document")
    .modal-content.w-auto.flex-grow-1.pb-1px.radius-0.radius-l-2.border-y-2.border-l-1.brc-default-m3.bgc-white-tp1.shadow
      .modal-header.p-0.radius-0.mx-3
        h4.modal-title.text-primary-d1.text-140.pt-2.pl-1 Draw Settings
        button.close.m-0.mr-n2(type="button", data-dismiss="modal", aria-label="Close")
          i.fa.fa-times.text-70(aria-hidden="true")
      .modal-body.mx-md-2(data-ace-scroll='{"smooth": true, "lock": true}')
        form(autocomplete="off")
          h5.text-purple-d1 Candidates
          div
            .d-none.bgc-secondary-l1.radius-1.px-1.mb-3.mt-1.text-center
              .btn-group.btn-group-toggle.align-self-end.flex-wrap.justify-content-center.w-75.mx-auto.align-items-center.my-2.flex-equal-sm(data-toggle="buttons")
            textarea(style="width: 100%;", v-model="candidateText")
    .aside-header.align-self-start.mt-1.mt-lg-5.text-right.d-style
      button.btn.btn-orange.btn-lg.shadow-sm.pl-2.radius-l-2.f-n-hover.py-1.py-md-2(type="button", data-toggle="modal", data-target="#id-ace-settings-modal")
        i.fa.fa-cog.text-110.ml-1
</template>

<script type="text/javascript">
import Aside from '../ace/js/src/aside'
import * as CSV from 'csv-string';

export default {
  data() {
    return {
      candidateText: ""
    }
  },
  watch: {
    candidateText(currentText, _) {
      this.$emit('update:modelValue', CSV.parse(currentText))
    }
  }
}
</script>
