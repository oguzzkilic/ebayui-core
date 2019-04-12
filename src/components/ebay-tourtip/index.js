const emitAndFire = require('../../common/emit-and-fire');

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),
    getInitialState(input) {
        return Object.assign({}, input, {
            expanded: true
        });
    },
    handleCollapse() {
        this.setState('expanded', false);
        emitAndFire(this, 'tooltip-collapse');
    }
});
