import {Dialog} from 'quasar';

function confirm(tit, msg) {
  Dialog.create({
    title: tit,
    message: msg,
    // cancel: true,
    persistent: false,
  })
    .onOk(data => {
      // console.log('>>>> OK, received', data)
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}

export default {
  confirm,
};
