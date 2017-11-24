var mixin = {
    props: {
        htmlAttributes: Object
    },
    computed: {
        _htmlAttributes() {
            return this.htmlAttributes || {};
        },
        htmlClass() {
            return this._htmlAttributes['class'];
        },
        htmlName() {
            return this._htmlAttributes['name'];
        }
    },
    created() {
        this.$nextTick(() => {
            Object.keys(this._htmlAttributes).forEach(eventName => {
                if (eventName.indexOf('@') === 0) {
                    console.debug(`register event ${eventName}`);
                    this.$el.addEventListener(`vue-on${eventName.substring(1).toLowerCase()}`, window[this._htmlAttributes[eventName]], false);
                }
            })
        })
    },
    methods: {
        fireHtmlEvent(name, value) {
            let ev = new Event(`vue-on${name}`);
            ev.value = value;
            this.$el.dispatchEvent(ev);
        }
    }
}
export default mixin;
