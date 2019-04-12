const FloatingLabel = require('makeup-floating-label');
const emitAndFire = require('../../common/emit-and-fire');

module.exports = require("marko-widgets").defineComponent({
    template: require("./template.marko"),
    getWidgetConfig(input) {
        return { floatingLabel: input.floatingLabel };
    },
    init(config) {
        this.config = config;
        this.initFloatingLabel();
    },
    onUpdate() {
        this.initFloatingLabel();
    },
    initFloatingLabel() {
        if (this.config.floatingLabel) {
            if (this.floatingLabel) {
                this.floatingLabel.refresh();
            } else if (document.readyState === 'complete') {
                this.floatingLabel = this.el && new FloatingLabel(this.el);
            } else {
                window.addEventListener('load', this.initFloatingLabel.bind(this));
            }
        }
    },
    handleChange: forwardEvent("change"),
    handleInput: forwardEvent("input"),
    handleFocus: forwardEvent("focus"),
    handleBlur: forwardEvent("blur")
});

function forwardEvent(eventName) {
    return function (originalEvent) {
        emitAndFire(this, `textbox-${eventName}`, {
            originalEvent,
            value: originalEvent.target.value
        });
    }
}