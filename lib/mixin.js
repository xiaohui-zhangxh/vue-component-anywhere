var mixin = {
    props: {
        htmlAttributes: Object
    },
    computed: {
        $htmlAttributes() {
            return this.htmlAttributes || {};
        },
        $htmlClass() {
            return this.$htmlAttributes['class'];
        },
        $htmlName() {
            return this.$htmlAttributes['name'];
        }
    },
    created() {
        this.$nextTick(() => {
            Object.keys(this.$htmlAttributes).forEach(eventName => {
                if (eventName.indexOf('@') === 0) {
                    // console.debug(`register event ${eventName}`);
                    let methodName = this.$htmlAttributes[eventName];
                    if (!window[methodName]){
                        console.warn(`method ${methodName} is no defined for event ${eventName}`)
                    }else{
                        this.$el.addEventListener(`vca-on${eventName.substring(1).toLowerCase()}`, window[this.$htmlAttributes[eventName]], false);
                    }
                }
            })
        })
    },
    methods: {
        $fireHTMLEvent(name, value) {
            let ev = new Event(`vca-on${name}`);
            ev.value = value;
            this.$el.dispatchEvent(ev);
        }
    }
}
export default mixin;
