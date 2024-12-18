import { vMaska } from 'maska';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
    app.directive('maska', vMaska);
});
