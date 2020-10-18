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
      var data = CSV.parse(currentText)
      this.$emit('update:modelValue', data)
    }
  },
  mounted() {
    this.candidateText = "test+0@gmail.com,http://gravatar.com/avatar/7e59cae542c747865ac85637c84480e3.png?d=wavatar,5\n\
test+1@gmail.com,http://gravatar.com/avatar/f3ba7957f56cf8ef3357b433c34d9b49.png?d=wavatar,8\n\
test+2@gmail.com,http://gravatar.com/avatar/f184d469ab7f85db44e33cf1d616cbc6.png?d=wavatar,8\n\
test+3@gmail.com,http://gravatar.com/avatar/0529966d244884560ffead5ac2de71b0.png?d=wavatar,9\n\
test+4@gmail.com,http://gravatar.com/avatar/aee1732f2fc3e36d62a1a5fd1a8667d4.png?d=wavatar,4\n\
test+5@gmail.com,http://gravatar.com/avatar/031455305f79c8d5e98a787c5d17370f.png?d=wavatar,1\n\
test+6@gmail.com,http://gravatar.com/avatar/a979c9c941719fcbb68fc86fbe238158.png?d=wavatar,2\n\
test+7@gmail.com,http://gravatar.com/avatar/01478d80ca6f20b46f30ac9fafeffa6a.png?d=wavatar,1\n\
test+8@gmail.com,http://gravatar.com/avatar/f61a81b270077d0cad3818c3c28f176d.png?d=wavatar,9\n\
test+9@gmail.com,http://gravatar.com/avatar/c8b54d6fdc99f6a05ea7343df0d751b9.png?d=wavatar,5\n\
test+10@gmail.com,http://gravatar.com/avatar/0baf592338f4256491807786f21dee2b.png?d=wavatar,4\n\
test+11@gmail.com,http://gravatar.com/avatar/d1c129cf91c8be521dd3257ae53dd6cf.png?d=wavatar,3\n\
test+12@gmail.com,http://gravatar.com/avatar/f31d04de7d28ea7c4dc85df08e7574c6.png?d=wavatar,6\n\
test+13@gmail.com,http://gravatar.com/avatar/2727061a4c565705e11997df98682664.png?d=wavatar,5\n\
test+14@gmail.com,http://gravatar.com/avatar/651622f00eb66e7205a31e8a238c27b8.png?d=wavatar,2\n\
test+15@gmail.com,http://gravatar.com/avatar/4e2546717f6fc826a30f93373d13eb14.png?d=wavatar,0\n\
test+16@gmail.com,http://gravatar.com/avatar/84a3f5fe5ea00e1de388bf6dcd4d7687.png?d=wavatar,3\n\
test+17@gmail.com,http://gravatar.com/avatar/a54914c525b6c72e5fc1af33526b270e.png?d=wavatar,0\n\
test+18@gmail.com,http://gravatar.com/avatar/25e7603fa8af87ba3ec3facc9a962cfc.png?d=wavatar,6\n\
test+19@gmail.com,http://gravatar.com/avatar/1cf7de33215f6a354aa6734569c9186c.png?d=wavatar,9"

  }
}
</script>
